import React from 'react';
import {Button} from 'react-bootstrap';
import {API, Auth} from 'aws-amplify';
import chart from "./chart";
import './chart.css';
//import { Link } from "react-router-dom";

export default class FeelingLucky extends React.Component{
   constructor(props) {
       super(props);
       this.state = {
           order : "lucky",
           corr_list: [],
           corr_selected: 0,
           corr_values: {}
       }
   };

  
   async componentDidMount() {
    if (!this.props.isAuthenticated) {
        return;
    }
    this.next_corr(0)
  }

  get_corr_list(idToken, order) {
    let path = "/corr-list";
    let myInit = {
        headers: { Authorization: idToken },
        queryStringParameters: {  
            order: order
        }
    }
    return API.get("oddball", path, myInit);
  }

  get_corr_values(idToken, source_id1, source_id2) {
    let path = "/corr-values";
    let myInit = {
        headers: { Authorization: idToken },
        queryStringParameters: {  
            source_id1: source_id1,
            source_id2: source_id2
        }
    }
    return API.get("oddball", path, myInit);
  }

  next_corr = async (index) => {
      try {
        let sessionObject = await Auth.currentSession();
        let idToken = sessionObject.idToken.jwtToken;
        //list already loaded?
        let corr_list= this.state.corr_list;
        if (corr_list.length===0) {
            corr_list= await this.get_corr_list(idToken, this.state.order);
        }
        //load next correlation
        if (index===corr_list.length) index = 0;
        if (index<0) index = corr_list.length-1;
        const corr_values = await this.get_corr_values(idToken, corr_list[index][0], corr_list[index][1]);
        this.setState({
            corr_list: corr_list,
            corr_selected: index,
            corr_values: corr_values
        });
        chart(document.getElementById('chart'),this.state.corr_values)
      } catch (e) {
        console.log(e);
      }
  }

  render(){
      if (typeof this.state.corr_list === 'undefined' || 
            this.state.corr_list.length === 0  || 
            typeof this.state.corr_values.datasets === 'undefined' )
           return(<h2>...lädt...</h2>)
       else
           return(
            <div className="container mt-4 h-100">
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <h5 className="card-header">{this.state.corr_values.title}</h5>
                            <div className="card-body">
                                <div className="card-title">Korrelation: {this.state.corr_values.coeff}</div>
                                <div className="chart-container"  style={{height:'300px'}}>
                                    <canvas id="chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                            <Button variant="outline-info" size="sm" type="button" onClick={()=>this.next_corr(this.state.corr_selected-1)}>Zurück</Button>
                            <Button variant="outline-info" size="sm" type="button" onClick={()=>this.next_corr(this.state.corr_selected+1)}>Vor</Button>
                    </div>
                </div>
            </div>
           )
           //<h2>{this.state.corr_values.source1.title}</h2>
   }
}
import React from 'react';
import {Button} from 'react-bootstrap';
import {API, Auth} from 'aws-amplify';
//import { Link } from "react-router-dom";

export default class AllSourcesList extends React.Component{
   constructor(props) {
       super(props);
       this.state = {
           periodslist: [],
           selectedperiod: "",
           sourceslist: []
       }
   };

   async componentDidMount() {
    if (!this.props.isAuthenticated) {
        return;
    }
    try {
        let sessionObject = await Auth.currentSession();
        let idToken = sessionObject.idToken.jwtToken;
        //let userid = sessionObject.idToken.payload.sub;
        const periodslist = await this.get_periods(idToken);
        //const sourceslist = await this.sources('Jahr',idToken);
        this.setState({ periodslist: JSON.parse(periodslist.body) });
    } catch (e) {
        alert(e);
    }
  }

  get_periods(idToken) {
    let path = "/allperiods";
    let myInit = {
        headers: { Authorization: idToken }
    }
    return API.get("oddball", path, myInit);
  }

   handleListe = async (index) => {
    try {
      let periodslist = this.state.periodslist;
      let sessionObject = await Auth.currentSession();
      let idToken = sessionObject.idToken.jwtToken;
      const sourceslist = await this.get_sources(periodslist[index],idToken);
      this.setState({ sourceslist: JSON.parse(sourceslist.body) });
      this.setState({ selectedperiod: periodslist[index] });
      //this.props.history.push(path);
    } catch (e) {
      alert(e);
    }
  }

   get_sources(period,idToken) {
       let path = "/allsources?period="+period;
       let myInit = {
           headers: { Authorization: idToken }
       }
       return API.get("oddball", path, myInit);
   }

   handleDetails = async (index) => {
    try {
      
      //this.props.history.push(path);
    } catch (e) {
      alert(e);
    }
  }

   render(){
      if (typeof this.state.periodslist === 'undefined' || this.state.periodslist.length === 0)
           return(<h2>Keine Quellen zum Anzeigen.</h2>)
       else
           return(
              <div>
               <div className="col-md-6">
               <table style={{"marginTop":"2%"}} className="table table-hover">
                   <thead>
                       <tr>
                           <th scope="col">#</th>
                           {/* <th scope="col">Last modified</th> */}
                           <th scope="col">Periode</th>
                           <th scope="col">Options</th>
                       </tr>
                   </thead>
                   <tbody>
                           {
                           this.state.periodslist.map((period, index) => {
                           return(
                               <tr key={index}>
                                       <td>{index+1}</td>
                                       <td>{period}</td>
                                       <td>
                                               <Button variant="outline-info" size="sm"
                                                   type="button"
                                                   onClick={()=>this.handleListe(index)}
                                                   >Liste
                                               </Button>
                                       </td>
                               </tr>
                           )})
                           }
                       </tbody>

                </table>
                </div>
                { (this.state.selectedperiod !== "") && 
                  <div className="col-md-6">
                  <h2>{this.state.selectedperiod}</h2>
                  <table style={{"marginTop":"2%"}} className="table table-hover">
                      <thead>
                          <tr>
                              <th scope="col">#</th>
                              {/* <th scope="col">Last modified</th> */}
                              <th scope="col">Titel</th>
                              <th scope="col">Datenstand</th>
                              <th scope="col">Options</th>
                          </tr>
                      </thead>
                      <tbody>
                              {
                              this.state.sourceslist.map((source, index) => {
                              return(
                                  <tr key={index}>
                                          <td>{index+1}</td>
                                          {/* <td>{jot.lastmodified}</td> */}
                                          <td>{source.title}</td>
                                          <td>{source.datenstand}</td>
                                          <td>
                                                  <Button variant="outline-info" size="sm"
                                                      type="button"
                                                      onClick={()=>this.handleDetails(index)}
                                                      >Details
                                                  </Button>
                                          </td>
                                  </tr>
                              )})
                              }
                          </tbody>
                  </table>
                  </div>
                  }
                </div>
           )
   }
}
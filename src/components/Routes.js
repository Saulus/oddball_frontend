import React from "react";
import AllSourcesList from './AllSourcesList';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';
import FeelingLucky from './FeelingLucky';
import { Route, Switch } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import UnAuthorizedRoute from "./UnAuthorizedRoute";


export default (cprops) =>
<Switch>

  <UnAuthorizedRoute path="/login" exact component={Login} cprops={cprops}/>
  <UnAuthorizedRoute path="/signup" exact component={Signup} cprops={cprops}/>
 
  <AuthorizedRoute exact path="/lucky" component={FeelingLucky} cprops={cprops}/>
  <AuthorizedRoute exact path="/allsources" component={AllSourcesList} cprops={cprops}/>
  <AuthorizedRoute exact path="/" component={FeelingLucky} cprops={cprops}/>
 
  <Route component={NotFound} />
</Switch>;

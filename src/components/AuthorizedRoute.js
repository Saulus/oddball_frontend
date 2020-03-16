import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AuthorizedRoute = ({ component: Component, cprops, ...rest }) => {
   // Add your own authentication on the below line.
 return (
   <Route {...rest} render={props =>
       cprops.isAuthenticated ? <Component {...props} {...cprops} /> : <Redirect to="/login" />}
   />
 )
}

export default AuthorizedRoute
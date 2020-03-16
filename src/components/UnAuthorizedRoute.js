import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const UnAuthorizedRoute = ({ component: Component, cprops, ...rest }) => {
   // Add your own authentication on the below line.
 return (
   <Route {...rest} render={props =>
       !cprops.isAuthenticated ? <Component {...props} {...cprops} /> : <Redirect to="/" />}
   />
 )
}

export default UnAuthorizedRoute
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../config/auth"
import PropTypes from 'prop-types'
export const RedirectIfAuth = ({children}) =>{
  return isAuthenticated() ? <Navigate to={'/dashboard'}/>:children
}

RedirectIfAuth.propTypes = {
  children:PropTypes.node.isRequired
}

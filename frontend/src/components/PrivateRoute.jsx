
import PropTypes from 'prop-types'
import { isAuthenticated } from '../config/auth'
import { Navigate } from 'react-router-dom'
export const PrivateRoute = ({children}) =>{
  return isAuthenticated()  ? children : <Navigate to={'/signin'}/>
}

PrivateRoute.propTypes = {
  children:PropTypes.node.isRequired
}

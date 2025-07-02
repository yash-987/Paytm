import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../config/auth"

export const RedirectHome = ()=>{
  return isAuthenticated() ? <Navigate to={'/dashboard'}/>:<Navigate to={'/signin'}/>

}

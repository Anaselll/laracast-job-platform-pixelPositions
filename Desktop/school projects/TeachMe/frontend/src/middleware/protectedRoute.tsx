import {  useContext } from "react"
import {AuthContext} from '../context/AuthContext'
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}){
    const {user}=useContext(AuthContext)
    console.log(user)
    if(!user){
        return <Navigate to="/login" />
    }
    return children
}
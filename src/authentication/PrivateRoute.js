import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthValue } from "../contexts/AuthContext"


export default function PrivateRoute(   ) {
    const { currentUser } = useAuthValue()
  
    return <>
      { currentUser?.emailVerified ? <Outlet /> : <Navigate to="/login" /> }
    </>
  
}
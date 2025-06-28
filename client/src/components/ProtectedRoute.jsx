import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../context/SessionContext';

const ProtectedRoute = () => {
  const {isLoggedIn, loading} = useSession();
  console.log("The logged in: ", isLoggedIn);
  if(loading) {
    return <div>Cargando...</div>; // You can replace this with a loading spinner or similar
  }
  return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoute
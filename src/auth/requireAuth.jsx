/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const token = localStorage.getItem("refresh_token");

    return (
        token ?
            <Outlet />
            :
            <Navigate to="/dashboard" />
    )
}

export default RequireAuth
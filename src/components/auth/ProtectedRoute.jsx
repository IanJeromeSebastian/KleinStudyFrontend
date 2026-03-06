/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AppLayout from '../layout/AppLayout';

const ProtectedRoute = () => {
    const isAuthenticated = true
    const loading = false

    if (loading){
        return <div>loadin...</div>
    }

    return isAuthenticated?(
        <AppLayout>
            <Outlet/>
        </AppLayout>
    ) : (
        <Navigate to="/login"/>
    );
};

export default ProtectedRoute

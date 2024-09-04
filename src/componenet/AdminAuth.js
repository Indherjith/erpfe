import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminAuth = ({children}) => {
    let adminauth = localStorage.getItem('adminauth');
    if(adminauth == 'true'){
        return children
    }
    else{
        return <Navigate to="/"/>;
    }
}

export default AdminAuth
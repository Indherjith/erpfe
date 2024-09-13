import React from 'react'
import { Navigate } from 'react-router-dom';

const EmployeeAuth = ({children}) => {
    let employeeauth = localStorage.getItem('employeeauth');
    if(employeeauth == 'true'){
        return children
    }
    else{
        return <Navigate to="/" />;
    }
}

export default EmployeeAuth
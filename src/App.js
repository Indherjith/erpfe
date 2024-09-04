import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './componenet/employee';
import Login from './componenet/login'; 
import Dashboard from './componenet/Dashboard';
import Billing from './componenet/billing';
import HomeAdmin from './componenet/homeadmin';
import HomeEmployee from './componenet/HomeEmployee';
import admin from './componenet/admin';
import Outputstock from './componenet/Outputstock'
import Inputstock from './componenet/Stock'
import Navbar from './componenet/Navbar'
import Home from './componenet/Home';
import EmployeeBilling from './componenet/employeebilling';
import EmployeeOutput from './componenet/employeoutput';
import AdminInput from './componenet/AdminInput'
import AdminAuth from './componenet/AdminAuth';
import EmployeeAuth from './componenet/EmployeeAuth';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/homeemployee' element={<EmployeeAuth><HomeEmployee/></EmployeeAuth>}></Route>
            <Route path='/homeadmin' element={<AdminAuth><HomeAdmin/></AdminAuth>}/>
            <Route path='/adminbilling' element={<AdminAuth><Billing/></AdminAuth>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/adminoutput' element={<AdminAuth><Outputstock/></AdminAuth>}/>
            <Route path='/navbar' element={<Navbar/>}/>
            <Route path='/input' element={<AdminAuth><Inputstock/></AdminAuth>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/employeoutput' element={<EmployeeAuth><EmployeeOutput/></EmployeeAuth>}/>
            <Route path='/employebilling' element={<EmployeeAuth><EmployeeBilling/></EmployeeAuth>}/>
            <Route path='/admininput' element={<AdminAuth><AdminInput/></AdminAuth>}/>
            </Routes>
        </Router>
    );
}

export default App;

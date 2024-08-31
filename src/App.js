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

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/homeemployee' element={<HomeEmployee/>}></Route>
            <Route path='/homeadmin' element={<HomeAdmin/>}/>
            <Route path='/adminbilling' element={<Billing/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/adminoutput' element={<Outputstock/>}/>
            <Route path='/navbar' element={<Navbar/>}/>
            <Route path='/input' element={<Inputstock/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/employeoutput' element={<EmployeeOutput/>}/>
            <Route path='/employebilling' element={<EmployeeBilling/>}/>
            <Route path='/admininput' element={<AdminInput/>}/>
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
import ListAllStudents from './Components/MainPage.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Components/MainPage.css";
import ListDepartments from "./Components/ListDepartments";
import Sidebar from "./Components/Sidebar";



function App()
{
  return (
      <div>
        <Router>
          <Sidebar/>
          <div className='container'>
            <Routes>
              <Route  exact path="/" element={<ListAllStudents/>}> </Route>
              <Route  exact path="/students" element={<ListAllStudents/>}> </Route>
              <Route exact path={"/departments"} element={<ListDepartments/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;
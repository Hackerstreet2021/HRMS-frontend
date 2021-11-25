import React from 'react';
import './App.css';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';

import Showemployee from './components/Showemployee';
import HeaderComponent from './components/HeaderComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ListQuestionsComponent from './components/ListQuestionsComponent';
import CreateQuestionComponent from './components/CreateQuestionComponent';
import Assessment from './components/Assessment';
import {useAuth0} from '@auth0/auth0-react';


function App(){

  const {

    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  }=useAuth0();

    return(

            <div>
              <Router>    
                                 
                        <HeaderComponent />



{/*                       
                          <li>
                            <button onClick={loginWithPopup}>Login</button>
                          </li>
                          <li>
                          <button onClick={logout}>logout</button>

                          </li> */}
                         
                        <h3>user is {isAuthenticated?"use is logged in":"user is not logged in"}</h3>
                        {
                          isAuthenticated && (
                          <pre style={{textAlign:'start'}}>       
                             {JSON.stringify(user,null,2)}
                          </pre>)
                        }









                         <div className="row m-0">
                             <div className="col-md-2 mt-2">
                             <nav className="list-group">
                            <Link to="" className="btn  list-group-item list-group-item-action list-group-item-dark ">
                            <i class="fa fa-user" aria-hidden="true"></i> Admin</Link> 
                            <Link to="/employee" className="btn list-group-item list-group-item-action ">
                            Employee</Link>
                            <Link to="/questions" className="btn list-group-item list-group-item-action ">Question</Link>
                            <Link to="assessment" className="btn list-group-item list-group-item-action ">Start Accessment</Link>
                            </nav>
                             </div> 
                             <div className="col-md-10">

                             <div className="container">
                        <Switch>  
                        
                             
                            <Route path="/questions" component={ListQuestionsComponent}></Route>
                            <Route path="/add-question/:id" component={CreateQuestionComponent}></Route> 
 
                            <Route path="/employee" exact component={Showemployee} ></Route>
                            <Route path="/add-employee" component={CreateEmployeeComponent}></Route>
                            <Route path="/update-employee/:id" component={UpdateEmployeeComponent}></Route> 

                            <Route path="/assessment" exact component={Assessment} ></Route>

                        </Switch>  
                        
                        </div>

                             </div>
                           
                        </div>
                        
                     
               </Router>
                   
            </div>
    );
}

export default App;
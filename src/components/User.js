import React, { useState, useEffect } from "react";

import QuizService from "../services/QuizService";

import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import Assessment from "./Assessment";
// let user=''
const User=(props)=>{

    const [username, setUsername] = useState('');

    
    useEffect(()=>{
         
    },[])
      




    // QuizCall(username){

    //     QuizService.QuizAns().then(
    //         (response)=>{
    //                 console.log(response);
    //                 console.log(response.data);
    //                 setUser(response.data);
    //         },
    //         (error)=>{
    //                 console.log(error);
    //         });

    // }

    const onChangeHandler= (setUsername,event)=>{setUsername(event.target.value)
        // console.log(username);
        // user=username
        return(
        <Assessment user={props.username}/>)
    }

    
    return(

        <div>
           


            <div className="col-md-6 offset-3 mt-5" >
            
        {/* <form> */}


            <div class="form-group">
                <label class="username">Enter Username</label>
                <input type="text" class="form-control" onChange={onChangeHandler.bind(this,setUsername)} id="username" aria-describedby="emailHelp" placeholder="Enter User Name"  name="username"/>
            </div>



            {/* <button type="submit" className="btn btn-primary" >Start Test</button> */}

          
          

        {/* </form> */}
        <Link to={{pathname:'/assessment',state:username}} className="btn btn-primary " >Start Test</Link> 

        </div>

        </div>
    )
    
   
}

export default User;
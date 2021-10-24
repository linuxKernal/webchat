import React, { useRef, useState } from 'react'
import {useHistory} from 'react-router-dom'
import '../css/loginCss.css'
import {db} from '../config'
import loginimage from '../images/logo512.png'


function Login() {
    console.log("return");
    const [butn_name, setbutn_name] = useState("Login")
    const username = useRef()
    const passwd = useRef()
    const history = useHistory()
    const authFunc = (e)=>{
        setbutn_name("Loading ...")
        e.preventDefault()
        db.collection("/users").doc(username.current.value).get().then(item=>{
            if(item.exists){
                if(passwd.current.value=== item.data().passwd){
                history.push({
                pathname:"/chat",
                state:{
                  islogin:true,
                  username:username.current.value
                }
             })
            }else{
                setbutn_name("Login")
                history.push({
                    pathname:"/login",
                    state:{
                      msg:"worng password try again"
                     }
                 })
            }
            }
            else{
                setbutn_name("Login")
                history.push({
                    pathname:"/login",
                    state:{
                      msg:"username does not valid"
                     }
                 })
            }
        }).catch(error=>{
            console.log(error);
        })
        
    }
    return (
        <form onSubmit={authFunc}>
        <div className="login">
            <div className="login-image">
                <img src={loginimage} alt="login page" />
            </div>
            <div className="login-input">
                <h2>Login Page</h2>
                <hr />

                <div className="login-flex">
                    
                 <div className="login-1">
                     <label htmlFor="username">Username</label><br />
                     <input type="text" id="username" ref={username} name="username" required/>
                 </div>
                 <div className="login-2">
                 <label htmlFor="passwd">Password</label><br />
                 <input type="text" id="passwd" ref={passwd} name="passwd" required />
                 </div>
                 <div className="login-butn">
                     <button value="Login" >{butn_name}</button>
                 </div>
                
                 </div>
                 <div className="login-info">
                     <hr />
                     <p>
                         i not have an account ? <a href="/signup">signup</a>
                     </p>
                 </div>
                 {(history.location.state!== undefined)?<p className="msg">{history.location.state.msg}</p>:null}
            </div>
            
        </div>
        </form>
    )
}

export {Login as default }

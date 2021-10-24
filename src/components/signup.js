import React, { useEffect,useState } from 'react'
import {useHistory} from 'react-router-dom'
import {db} from '../config'
import '../css/signupCss.css'
function Signup() {
    const history = useHistory()
    const [showMsg, setshowMsg] = useState(false)
    let usernameIsThere = []
    const userData = (e)=>{
        e.preventDefault()
        let username = e.target.username.value
        let passwd = e.target.passwd.value
        let name = e.target.name.value
        let email = e.target.email.value
        let about = "i am using webchat"
        let status = "offline"
        let image = "https://firebasestorage.googleapis.com/v0/b/web-chat-a9638.appspot.com/o/staticUserImage%2FuserImage.png?alt=media&token=44b8fc6f-10e6-4897-8c57-5b063c6ddc08"
        if(usernameIsThere.find(name=>username===name)=== username){
            setshowMsg(true)
        }else{
            db.collection("/users").doc(username).set({
                username:username,passwd:passwd,name:name,email:email,about:about,profile:image,status:status
            })
            
            alert("successfully reqistered")
            history.push("/login")

        }
        
    }
    db.collection("/users").get().then(name=>{
        name.forEach(item=>{
            usernameIsThere.push(item.id)
        })
    })
    const authPassword = (e) =>{
        let pass1 = document.getElementById('passwd');
        let pass2 = document.getElementById('checkPasswd');
        const butn = document.querySelector(".signup-div-butn button");
        if(pass1.value!==pass2.value){
            pass1.style.backgroundColor="rgb(245, 171, 111)";
            pass2.style.backgroundColor="rgb(245, 171, 111)";
            butn.disabled = true;

        }else{
            pass1.style.backgroundColor="white";
            pass2.style.backgroundColor="white";
            butn.disabled = false;
        }
    }
    useEffect(() => {
        document.getElementById("checkPasswd").addEventListener('input',authPassword)
    }, [])
    return (
        <div className="signupDiv">
            <h2>signup page</h2>
            <form onSubmit={userData}>
            <div className="signupInputDiv">
                <div className="signupInputs">
                    <label htmlFor="name">Name</label>
                    <br/>
                    <input type="text" id="name" required />
                </div>
                <div className="signupInputs">
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input type="text" id="username" required />
                </div>
                <div className="signupInputs">
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="email" required />
                </div>
                <div className="signupInputs">
                    <label htmlFor="passwd">password</label>
                    <br/>
                    <input type="text" id="passwd" required />
                </div>
                <div className="signupInputs">
                    <label htmlFor="checkPasswd">confrom password</label>
                    <br/>
                    <input type="text" id="checkPasswd" required />
                </div>
                <div className="signup-div-butn">
                    <button>
                        Submit
                    </button>
                </div>
                {showMsg?<p className="userMsg">username is  unavailable</p>:""}
            </div>
            </form>
        </div>
    )
}

export default Signup

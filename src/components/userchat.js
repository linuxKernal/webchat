import React,{ useState,useEffect, useRef } from 'react'
import '../css/chatcss.css'
import firebase from 'firebase'
import {useHistory} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

import pro2 from '../images/pro2.jpg'
import pro3 from '../images/pro3.jpg'
import { db } from '../config'
function Chat() {
    const [currentUser,setcurrentUser] = useState({})
    const [isimg, setisimg] = useState(false)
    const [save_value, setsave_value] = useState("save")
    const img_url = useRef()
    const temp_name = useRef()
    const temp_email = useRef()
    const temp_about = useRef()
    const temp_username = useRef()
    const temp_time = useRef()

    const [tempImage, settempImage] = useState(pro2)
    let today = new Date()
    const [teams, setteams] = useState([])
    let Time = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+"|"+today.toLocaleString('en-US', { hour12:true,hour:"numeric",minute:'2-digit'})
    const history = useHistory()
    let count = 0;
    const textMsg = useRef('')
    useEffect( () => {
        let temp = currentUser;
        window.onbeforeunload = ()=>{
            console.log("+++++++++++++++");
            console.log("when: ",temp)
            db.collection('users').doc(temp.username).update({
                status:"offline",
                lastseen:Time
            })
            window.onbeforeunload = null;
        }
        return ()=>{
            db.collection('users').doc(temp.username).update({
                status:"offline",
                lastseen:Time
            })
        }
    },[currentUser])
    
    // useEffect(() => {
    //     db.collection('testdb').doc("hey google").update({
    //         chat: firebase.firestore.FieldValue.arrayUnion({
    //            name:"hey",
    //            hi:"hello"
    //         })
    //     })
    // }, [])
    const [currentMsg, setcurrentMsg] = useState('')
    
    const [indexData, setindexData] = useState({
        name:"WebChat community",
        profile:pro3
    })
    
    const [chatData, setchatData] = useState([])
    const updateTeams = ()=>{
        const temp =[];
        db.collection('messages').get().then(item=>{
            item.forEach(element=>{
                temp.push(element.id)
            })
        })
        setteams(temp);
    }
    const [messages, setmessages] = useState([])
    const NewMessages = ()=>{
        console.log("request for new messages");
        let tempMsg = []
        db.collection("messages").get().then(item=>{
            item.forEach(element=>{
                tempMsg.push({team:element.id,chat:element.data().chat})
                count+=element.data().chat.length;
            })
        })
        setmessages(tempMsg)
        
    }
    const checkForMessages = ()=>{
        console.log("search for meaasge ...");
        let tempCount = 0;
        db.collection("messages").get().then(item=>{
            item.forEach(element=>{
                tempCount += element.data().chat.length;
            })
        })
        if(tempCount!==count){
            NewMessages();
            count = tempCount;
            tempCount = 0;
        }

    }
    useEffect(()=>{
        // let theTime = setInterval(checkForMessages,2000)
        // return () => clearInterval(theTime)
        NewMessages()
        checkForMessages()
        
        
    },[])
    useEffect(() => {
            if(currentUser.username!==undefined){
                setTimeout(()=>{
                    db.collection('users').doc(currentUser.username).update({
                        status:"online"
                    })
                },2000)
          
        }
            
        
    }, [currentUser])
    let one = document.getElementsByClassName("userDiv")
    const [yourTurn, setyourTurn] = useState('')
    useEffect(() => {
       console.log("binding the event and div");
        let one = document.getElementsByClassName("userDiv")
        for(let i=0;i<one.length;i++){
        one[i].addEventListener('click',(e)=>{
            setcurrentMsg(one[i].children[1].children[0].innerHTML)
            if(yourTurn!==''){
                yourTurn.classList.remove('sideLine')
            }
            one[i].classList.add("sideLine")
            textMsg.current.value = ''
            setyourTurn(one[i])
        })
    }
    }, [one.length,yourTurn])
    useEffect(() => {
        console.log("set header func");
        if(currentMsg!==''){
        let image;
        chatData.forEach(item=>{
            if(item.username===currentMsg){
                image=item.profile
            }
        })
        setindexData({
            name:currentMsg,
            profile:image
        })
    }
    },[currentMsg])
    const Temp = (props)=>{
        return (
            <div style={props.whichSide}>
                <span className={props.class}>
                <h5>
                    {props.name}
                </h5>
                <h3>
                    {props.text}
                </h3>
                <h6>{props.time}</h6>
                </span>
            </div>
        )
    }
    
    const Message = ()=>{
        return  messages.map((item)=>{
            let list1;
            if(item.team === currentMsg+"_"+currentUser.username || item.team === currentUser.username+"_"+currentMsg){
                list1 = item.chat.map(element=>{
                    let list2;
                    if(element.name === currentUser.name){
                        list2= <Temp text={element.msg} class="myside" time={element.time.split('|')[1].replaceAll(':','. ')} key={Math.floor(Math.random()*1000)+100}  whichSide={{float:"left",width:"30vw"}} name="you" />
                    }else{
                        list2= <Temp text={element.msg} class="otherside" time={element.time.split('|')[1].replaceAll(':','.')} key={Math.floor(Math.random()*100)}   whichSide={{float:"right",width:"30vw",display:"flex",justifyContent:"flex-end"}} name={currentMsg}/>
                    }
                    return list2
                })
            }
            return list1;
           
        })
    }
    let data= history.location.state;
    useEffect(()=>{
        console.log("check for online current user");
        if(data!== undefined){
        db.collection("users").doc(data.username).get().then(item=>{
            if(item.exists){
                setcurrentUser(item.data())
            }
        })
}

    },[data])
    useEffect(()=>{
        console.log("set all users");
        db.collection("users").get().then(info=>{
        let dataCenter = [];
        if(info){
            info.forEach(item=>{
            if(item.data().username!==currentUser.username && currentUser.username!== undefined){
                dataCenter.push(item.data())
            }
             
         })
         setchatData(dataCenter)
        }
     })   
    },[currentUser])
    let isthere = false;
    const sendMsg = (e)=>{
        teams.forEach(item=>{
            let createTeam = [currentMsg,currentUser.username].sort().join("_")
            if(teams.find(e=>e===createTeam)===createTeam){
                isthere = true;
            }
        })
        if(isthere){
            let createTeam = [currentMsg,currentUser.username].sort().join("_")
            db.collection('messages').doc(createTeam).update({
                chat:firebase.firestore.FieldValue.arrayUnion({
                    name:currentUser.name,
                    msg:textMsg.current.value,
                    time:Time
                })
            })
            
        }else{
            let createTeam = [currentMsg,currentUser.username].sort().join("_")
            db.collection('messages').doc(createTeam).set({
                chat:[
                    {
                        name:currentUser.name,
                        msg:textMsg.current.value,
                        time: Time
                    }
                ]
            })
        }
        updateTeams()
        textMsg.current.value = ''
    }
    let temp = document.getElementById("userInfo");
    useEffect(() => {
        let temp = document.getElementById("userInfo");
        temp.style.display = "none";
    }, [])
    const dispAlertBox =(e)=>{
        setsave_value("save")
        if(temp.style.display==="none"){
            temp.style.display = "block"
            settempImage(currentUser.profile);
            temp_name.current.value = currentUser.name;
            temp_email.current.value = currentUser.email;
            temp_about.current.value = currentUser.about;
            temp_username.current.value = currentUser.username;
            temp_time.current.value = currentUser.lastseen.split('|')[1];

        }else{
            temp.style.display = "none"
        }
        
    }
    const dispFocus = (e)=>{
        console.log(e);
    }
    let file1 = document.createElement('input');
    file1.setAttribute('type','file');
    const askFile = (e)=>{
        file1.click();
    }
file1.onchange = (e)=>{
    settempImage(URL.createObjectURL(e.target.files[0]));
    img_url.current = file1.files[0];
    setisimg(true)
}
    const save_data = async (e)=>{
        setsave_value("saving...")
        let Name = temp_name.current.value;
        let Email = temp_email.current.value;
        let About = temp_about.current.value;
        if(isimg){
        let storageRef = firebase.storage().ref();
        let childRef = storageRef.child("/images/"+img_url.current.name)
        await childRef.put(img_url.current)
        let tmep_url= await childRef.getDownloadURL();
        db.collection('users').doc(currentUser.username).update({
            profile:tmep_url
        })
        }
        setisimg(false)
        db.collection('users').doc(currentUser.username).update({
            name:Name,
            email:Email,
            about:About
        }).then( e=>{
            db.collection("users").doc(data.username).get().then(item=>{
                if(item.exists){
                    setcurrentUser(item.data())
                }
            })
            temp.style.display = "none";
            alert("successfully saved");
        }).catch(err=>{
            alert("error found try again");
        });
    }
    const user_logout = (e)=>{
        history.push("/login")
    }
    return (
        (history.location.state!== undefined)?
        <>
        <div className="userInfo" id="userInfo">
            <div className="infoTemp">
            <h2 className="userInfoTitle">Dashboard</h2>
            <button onClick={dispAlertBox}>
                X
            </button>
            </div>
            <div className = "userInfoContent">
            <div className="profile">
                <div className="profileDiv">
                <img src={tempImage} ref={img_url} alt="userprofile" />
                <button onClick={askFile}>
                    Edit
                </button>
                
                </div>
            </div>
            <div className="userData">

                <div className="userField">
                <label htmlFor="name" >name</label>
                <input type="text" id="name" ref={temp_name} className="inputBox" spellCheck={false}  onFocus={dispFocus} />
                </div>

                <div className="userField">
                <label htmlFor="username" >username</label>
                <input type="text" id="username" ref={temp_username} className="inputBox" spellCheck={false} readOnly />
                </div>

                <div className="userField">
                <label htmlFor="email">email</label>
                <input type="text" id="email" ref={temp_email} className="inputBox" spellCheck={false}  />
                </div>

                <div className="userField">
                <label htmlFor="about" >about</label>
                <input type="text" id="about" ref={temp_about} className="inputBox" spellCheck={false}  />
                </div>

                <div className="userField">
                <label htmlFor="lastseen" >lastseen</label>
                <input type="text" id="lastseen" ref={temp_time} className="inputBox" spellCheck={false} readOnly />
                </div>
                <button className="save-butn" onClick={save_data}>
                    {save_value}
                </button>
            </div>
            </div>
        </div>
        <div className="masterDiv">
            <div className="userListDiv">
            <div className="searchDiv">
                <div className="currentUser" onClick={dispAlertBox}>
                    <img src={currentUser.profile} alt={"hi"} />
                    <div className="currentDiv">
                    <p>
                        {currentUser.name}
                    </p>
                    <p>
                        {currentUser.about}
                    </p>
                    </div>
                </div>
                <input  type="text" placeholder="Search" id="searchBox" />
            </div>
           {chatData.map((element,index) => {
               return (<div className="userDiv" key={index} id={index}>
                    <img src={element.profile} alt={element.name} />
                    <div className="usernameDiv" > 
                        <p className="ptag1">
                       {element.username}
                        </p>
                        <p className="ptag2">
                        {element.status}
                        </p>
                    </div>
                    <p className="timeDiv">
                            {element.lastseen.split("|")[1]}
                    </p>
                </div>)
            })}
            </div>
            <div className="chatDiv">
                <div className="userHeader">
                    <img src={indexData.profile} alt="hello world" />
                    <p className="indexTitle">
                        {indexData.name}
                    </p>
                    <div className="logOutButn">
                        <button onClick={user_logout}>
                            Logout  
                        </button>
                    </div>
                </div>
                <div className="container-chat">
                   {(currentMsg!=='')?<>
                            <div className="container-fluid">
                                <Message />
                            </div>
                            
                    </>:<div className="startMsg">
                    <p> 
                    welcome webchat user
                    </p>
                    <p>
                        click your friends to chat
                        </p>
                    </div>}
                    
                </div>
               { currentMsg!=='' && <div className="chatinput">
                                    <input type="text" placeholder="Message" ref={textMsg} />
                                    <input type="button" onClick={sendMsg} value="Send" />
                        </div>}
            </div>
            
        </div></>:<Redirect to="/login" />
    )
        
    
}

export default Chat

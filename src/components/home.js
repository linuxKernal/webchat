import '../css/homeCss.css'
import React, { useEffect,useState } from 'react'
import SubContent from './subContent'
import {db} from '../config'
function Home() {
    const [welcomeTitle, setwelcomeTitle] = useState();
    const [subTitle, setsubTitle] = useState();
    const loginButn = (e)=>{
        let classname=e.target.className;
        if(classname==='butn1'){
            window.location.href="/login"
        }else{
            window.location.href="/signup"

        }
    }
    useEffect(() => {
       db.collection('websiteData').doc('webData').get().then(info=>{
           let value1 = info.data();
           setwelcomeTitle(value1.welcomeTitle);
           setsubTitle(value1.subTitle);
       }).catch((error)=>{
        console.log("error found",error);
       })
        
    }, [])
    return (
        <>
        <div className="container-div">
            <h2 className="div-title">
                {welcomeTitle}
            </h2>
            <p className="div-p">
                {subTitle}
            </p>
            <div className="div-butn">
                <button className="butn1" onClick={loginButn}>
                    login
                </button>
                <button className="butn2" onClick={loginButn}>
                    Register
                </button>
            </div>
        </div>
        <SubContent />
</>
    )
}

export default Home



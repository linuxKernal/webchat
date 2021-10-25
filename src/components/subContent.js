import React, { useEffect, useState } from 'react'
import {db} from '../config'


function SubContent() {
    const [developersData, setdevelopersData] = useState([])
    useEffect(() => {
        db.collection('developers').get().then(data=>{
            let obj = [];
            data.forEach(item=>{
                obj.push(item.data())
            })
            if(obj.length >0){

                setdevelopersData(obj);
            }
        })
    }, [])
    return(
        <div className="image-div">
            {developersData.map((data,index)=>{
                return(
                    <div className="imgDiv" key={index}>
                        <div className="theImage">
                        <img src={data.imageUrl} alt="images"  />
                        </div>
                        <p className="div-name">
                            {data.name}
                        </p>
                        <p className="div-post">
                            {data.post}
                        </p>
                        <p className="about-div">
                            {data.about}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default SubContent

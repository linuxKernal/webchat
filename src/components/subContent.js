import React, { useEffect, useState } from 'react'
import {db} from '../config'
import image1 from '../images/city.jpg'
import image2 from '../images/theme.jpg'
import image3 from '../images/winter.jpg'

function SubContent() {
    const [developersData, setdevelopersData] = useState([
        {
            name:'ram sakthi',
            post:'admin',
            imageUrl:image1,
            about:"he was the best developerand he done more projectssuccessfully"
        },
        {
            name:'vijay kumar',
            post:'engineer',
            imageUrl:image2,
            about:"he was the best developerand he done more projectssuccessfully"
        },
        {
            name:'sanker',
            post:'database admin',
            imageUrl:image3 ,
            about:"he was the best developerand he done more projectssuccessfully"
        }
    ])
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

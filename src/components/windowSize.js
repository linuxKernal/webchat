import React,{useState,useEffect} from 'react'

function WindowSize() {
    const [size, setsize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize',()=>{
            setsize(window.innerWidth)
        })
    }, [])
    return <h2>{size}</h2>
}

export default WindowSize

import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {

const [displayData,setDisplayData] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:4000/`, {})
        .then(res => {
            const data = res.data
            console.log(data);
            setDisplayData(data);

        })
        .catch((error) => {
            console.log(error)
        })
    },[])


    let mapped ='';


useEffect(()=>{
console.log(displayData,'displayData');

},[displayData]);



if(displayData.length > 0){

mapped = displayData.map(e=>{
    return(
        <div className='grid-container'>
        <div className='grid-item'>{e.name}</div>
        <div className='grid-item'>{e.age}</div>
        <div className='grid-item'>{e.country}</div>
        <div style={{'wordBreak':'break-word'}} className='grid-item'>{e.email}</div>
        <div className='grid-item'><img src={e.profile_pic}/></div>
        </div>
    )

})

}
    return (
        <div>
<h1>list</h1>
<div className='grid-container'>
<div className="grid-item">name</div>
<div className="grid-item">age</div>
<div className="grid-item">country</div>
<div className="grid-item">email</div>
<div className="grid-item">profile pic</div>
</div>

<div class="container">
{
mapped

}

</div>

        </div>
        

    )
}

export default List

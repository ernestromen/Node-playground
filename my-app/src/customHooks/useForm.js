import { useState } from 'react';
const UseForm =()=> {

    const [formData, setFormData] = useState({
        name:'',
        age:'',
        country:'',
        email:'',
        profile_pic:''
      });

   

    const handlechange = (e)=>{
        e.preventDefault();
      
        const {name,value} = e.target;
       
        setFormData(state=>({...state,[name]:value}));
        
      
      }
      return [formData,handlechange];

}

export default UseForm

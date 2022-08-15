import { useState } from 'react';
const UseValidate = ()=> {

    const [errors,setErrors] = useState({
        name:'',
        age:'',
        country:'',
        email:'',
        profile_pic:''
      });

    const validate = (values) =>{
        
        if(!values.name){
          setErrors(state=>({...state,'name':'name is required'}));
        }else{
          setErrors(state=>({...state,'name':''}));
        }
        
        if(!values.age){
          setErrors(state=>({...state,'age':'age is required'}));
        }else{
          setErrors(state=>({...state,'age':''}));
        }
        
        
        if(!values.country){
          setErrors(state=>({...state,'country':'country is required'}));
        }else{
          setErrors(state=>({...state,'country':''}));
        }

        if(!values.email){
          setErrors(state=>({...state,'email':'email is required'}));
        }else{
          setErrors(state=>({...state,'email':''}));
        }


        if(!values.profile_pic){
          setErrors(state=>({...state,'profile_pic':'profile_pic is required'}));
        }else{
          setErrors(state=>({...state,'profile_pic':''}));
        }

        
        }

        return [validate,errors,setErrors];
}

export default UseValidate

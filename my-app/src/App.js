import { useEffect, useState } from 'react';
import './App.css';
import UseForm from './customHooks/useForm';
import UseValidate from './customHooks/useValidate';
import axios from 'axios';
import Header from './header/header';

const App = () => {

const [formData,handlechange] = UseForm();
const [validate,errors] = UseValidate();
const [isSubmit,setIsSubmit] = useState(false);
const [fetchedData,setFetchedData] = useState({
name:'',
age:'',
country:'',
email:'',
profile_pic:''

});
const[networkOkMsg,setNetworkOkMsg ] = useState(false);
const[networkErrorMsg,setNetworkErrorMsg ] = useState(false);
const [deleteMessageOk , setDeleteMessageOk] = useState(false);
const [deleteMessageError , setDeleteMessageError] = useState(false);

const handleSubmit = (e)=>{
  e.preventDefault();
  setIsSubmit(true);
  validate(formData);

}

useEffect(()=>{

if(Object.values(errors).join('').length === 0 && isSubmit){
  
let url = 'http://localhost:4000/';

// axios({
//   method: "post",
//   url: url,
//   data: JSON.stringify(formData),
//   // headers: { "Content-Type": "application/json" },
// })
// .then(function (response) {
//   //handle success
//   console.log(response);
// })
// .catch(function (response) {
//   //handle error
//   console.log(response);
// })
// .then(function(res){
// console.log(res,'res');
// });

axios.post(url,formData)
  .then(function (response) {
    // handle success

    if(response.statusText === 'OK'){
      setNetworkOkMsg(true);
      setNetworkErrorMsg(false);

    }else{
      setNetworkErrorMsg(true);
      setNetworkOkMsg(false);
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error,'error');
  })




}
},[errors,isSubmit]);



useEffect(()=>{

  axios.get('https://randomuser.me/api/')
    .then(function (response) {
      // handle success
      let results = response['data']['results'][0];
      setFetchedData(state=>({
        ...state,name:results.name.first,
                age:results.dob.age,
                country:results.location.country,
                email:results.email,
                profile_pic:results.picture.medium
              }));
    })
    .catch(function (error) {
      // handle error
      console.log(error,'error');
    })
  },[]);


useEffect(()=>{

        let name = fetchedData.name;
        document.querySelector('#name').value = name;

        let age = fetchedData.age;
        document.querySelector('#age').value = age;

        let country = fetchedData.country;
        document.querySelector('#country').value = country;

        let email = fetchedData.email;
        document.querySelector('#email').value = email;

        let profile_pic = fetchedData.profile_pic;
        document.querySelector('#profile_pic').value = profile_pic;
},[fetchedData])



const addUser = () =>{

  axios.post('http://localhost:4000/',fetchedData,
    )
      .then(function (response) {
        // handle success
        if(response.statusText === 'OK'){
          setNetworkOkMsg(true);
          setNetworkErrorMsg(false);
    
        }else{
          setNetworkErrorMsg(true);
          setNetworkOkMsg(false);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error,'error');
      }).then(function(){
        window.location.reload(true);  

      });
      //Reload page
}




const deleteAllUsers = () =>{

  axios.delete('http://localhost:4000/')
    .then(function (response) {
      // handle success
      if(response.statusText === 'OK'){
        setDeleteMessageOk(true);
        setDeleteMessageError(false);
   
  
      }else{
        setDeleteMessageError(true);
        setDeleteMessageOk(false);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error,'error');
    })


}



//Hide networks messages after 2 seconds in ui
useEffect(()=>{
setTimeout(() => {
      setNetworkOkMsg(false);
      setNetworkErrorMsg(false);
      setDeleteMessageOk(false);
      setDeleteMessageError(false);
}, 3000);


},[networkOkMsg,networkErrorMsg,deleteMessageOk,deleteMessageError])

  return (
    <div className="App">
<Header/>
      {networkOkMsg ? <h1 style={{'border':'1px solid black','width':'30%','margin':'auto','backgroundColor':'green','color':'white','marginTop':'10px','paddingBottom':'5px'}}>Post request successful</h1>:''}
      {networkErrorMsg ? <h1 style={{'border':'1px solid black','width':'30%','margin':'auto','backgroundColor':'red','color':'white','marginTop':'10px','paddingBottom':'5px'}}>Post request unsuccessful</h1>:''}
      {deleteMessageOk ? <h1 style={{'border':'1px solid black','width':'30%','margin':'auto','backgroundColor':'green','color':'white','marginTop':'10px','paddingBottom':'5px'}}>delete action was successful</h1>:''}
      {deleteMessageError ? <h1 style={{'border':'1px solid black','width':'30%','margin':'auto','backgroundColor':'red','color':'white','marginTop':'10px','paddingBottom':'5px'}}>delete action was unsuccessful</h1>:''}
      <form action="/addUser" onSubmit={handleSubmit}>
        <label>name</label><br/>
      <input
      onChange={handlechange}
      type="text"
      name="name"
      /><br/>
      {errors.name ? <div><span style={{'color':'red'}}>{errors.name}</span><br/></div>:''}

      <label>age</label><br/>
      <input
      onChange={handlechange}
      name="age" type="text"/><br/>
      {errors.age ? <div><span style={{'color':'red'}}>{errors.age}</span><br/></div>:''}

      <label>country</label><br/>
      <input
      onChange={handlechange}
      name="country"
      type="text"/><br/>
      {errors.country ? <div><span  style={{'color':'red'}}>{errors.country}</span><br/></div>:''}
      
      <label>email</label><br/>
      <input
      onChange={handlechange}
      type="text"
      name="email"
      /><br/>
      {errors.email ? <div><span style={{'color':'red'}}>{errors.email}</span><br/></div>:''}

      <label>profile picture</label><br/>
      <input
      onChange={handlechange}
      type="text"
      name="profile_pic"
      /><br/>
      {errors.profile_pic ? <div><span style={{'color':'red'}}>{errors.profile_pic}</span><br/></div>:''}

      <input style={{'marginTop':'30px'}} type="submit" value="submit form"/>
      </form>


<input id="name" type="hidden" />
<input id="age" type="hidden" />
<input id ="country" type="hidden" />
<input id ="email" type="hidden" />
<input id ="profile_pic" type="hidden"/>


<input onClick={addUser} style={{'marginTop':'30px'}} type="button" value="Add user to list from api"/><br/>
<input onClick = {deleteAllUsers} style={{'marginTop':'30px'}} type="submit" value="Delete all users"/>

   </div>
  );

}




export default App;

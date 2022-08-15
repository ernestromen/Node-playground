const {User} = require('../models/User');


  class userController{
    
    store(data){
         new User().storeUserData(data);
     }

    show(res){
      new User().showUserData(res);
    }

    delete(){
      new User().deleteAllUserData();

    }
  }
  
 


module.exports ={
userController
}
const mysql = require('mysql');


class DB{

  constructor(){
    this.con().connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
 }

    con(){
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nodetest"
          });
     }   
}


class User extends DB{


    storeUserData(data){
              let name = data.name;
              let age = data.age;
              let country = data.country;
              let email = data.email;
              let profile_pic = data.profile_pic;
              let sql = `INSERT INTO users (name, age,country,email,profile_pic) VALUES ('${name}', '${age}','${country}','${email}','${profile_pic}')`;

              this.con().query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
    }

   
    
    showUserData(res){ 

        let sql = "SELECT * FROM users";
        this.con().query(sql, function (err, result) {
          if (err) throw (err);

       res.end(JSON.stringify(result),function(err){
      });

        })
        .then(results=>results);

      }


      deleteAllUserData(){
        let sql = "TRUNCATE users;";

        this.con().query(sql, function (err, result) {
          if (err) throw err;
          console.log("all users were deleted");
        });
      }
}





module.exports ={
    User
    }
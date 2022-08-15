const http = require('http');
const hostname = '127.0.0.1';
const port = 4000;
const fs = require('fs');
const {userController} = require('./controllers/userController');

const server = http.createServer((req, res) => {

try {

  // res.sendStatus(200);


 // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', '*');


 // Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 // Request headers you wish to allow
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 
 res.setHeader('Access-Control-Allow-Credentials', true);


  res.statusCode = 200;


  if(req.method === 'POST' ){
    let data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end', function(){
    new userController().store(JSON.parse(data));
    });

    }else if(req.method ==='GET' &&req.url === '/'){
        new userController().show(res);
    }else if(req.method ==='DELETE'){
    new userController().delete();
    }

    res.end();

}catch(error){

  //Error logger
  fs.appendFile('errorLog.txt', Object.getOwnPropertyDescriptor(error,"stack").value + '\n'+'\n', (err) => {
    if(err) {
        throw err;
    }
    console.log("Error log is updated.");
    });


}


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});






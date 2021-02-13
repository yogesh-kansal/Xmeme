const experess =require('express');
const cors =require('cors');
const app =experess();
// :8081 for rest API server at http
// :8080 for swagger 
// :3000 for REACT client 
const whitelist =[process.env.FRONTEND_URL||'http://localhost:3000','http://localhost:8080','http://localhost:8081'];
var corsOptionsdelegates = (req,callback) => {
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin'))!= -1) {
        corsOptions={origin:true};
        callback(null,corsOptions);
    }
    else {
        corsOptions= {origin:false};
        var error = new Error("Provided origin is not secured for communication!!!");
        error.status=403;
        callback(error,corsOptions);
        //return next(error);
    }


};

exports.cors = cors();
exports.corsWithOptions =cors(corsOptionsdelegates);




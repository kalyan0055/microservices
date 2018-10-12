 
const Express = require('express');
const SenecaWeb = require('seneca-web');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const glob = require("glob");
const path = require("path");
var http = require('http');
const Router = Express.Router;
const context = new Router();

const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

glob.sync( './usermodel.js' ).forEach( function( file ) {
  require( path.resolve( file ));
 });
app.use(context);

var db = mongoose.connect("mongodb://127.0.0.1:27017/swagger-demo",function(err){
  if(err){
    console.log("mongodb not connected");
  }
  console.log("mongo Connected",db);
  
})

const senecaWebConfig = {
	context,
	adapter: require('seneca-web-adapter-express'), // eslint-disable-line
	options: { parseBody: false },
};



app.get('/health', (req, res) => {
	res.json({ success: true });
});

 
const seneca = require('seneca')()
			.use(SenecaWeb, senecaWebConfig)
      .use('api')
      .use('users')
      .client({ type: 'tcp', pin: 'role:sample', port: 10205,host:'127.0.0.1' })
      .client({ type: 'tcp', pin: 'role:users', port: 10206,host:'127.0.0.1' });
	
 
const act = Promise.promisifyAll(seneca.act, { context: seneca });

app.get('/', (req, res) => {
	res.send('index page');
});
 

 
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, world! [helloworld sample]');
}).listen(process.env.PORT);
// const server = require('http').createServer(app);
// var port = process.env.port;  
// console.log(port);

// server.listen(process.env.PORT);
// app.listen(process.env.PORT);
// "use strict";

// var  express = require('express');
// var  app = express();
// var   BodyParser = require('body-parser');
// var  formidable = require('express-formidable');
// var web = require('seneca-web');
// var multer  = require('multer');
// var cors = require("cors");
// // const seneca = require('seneca')({ log: 'silent' });
// app.use(formidable());
// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({extended:true}));
// app.use(cors());
 
// let config = {
//   context: app,
//   adapter: require('seneca-web-adapter-express')
// };
 
// const seneca = require('seneca')()
// 			.use(web, config)
// 			.use('api')
// 			.use('users')
// 			.client({ type: 'tcp', pin: 'role:color', port: 10205,host:'192.168.0.118' })
// 			.client({ type: 'tcp', pin: 'role:users', port: 10206,host:'192.168.0.118' });

 
// seneca.ready(() => {
//   app.listen(4001, () => {
//     console.log('listening on port 4000');
//   });
// });
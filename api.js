let questions=[{
	question:'BharatKhande is also called as?',
	options:[{A:'India',B:'SriLanka',C:'Pakistan',D:'Bhutan',E:'None Of these'}],
	sel_answer:'',
	Actual_answer:'A'
}]

 
var mongoose = require('mongoose'),
	dbUsers = mongoose.model('users')
function api(options) {
	this.add('role:api,path:sample', test);

	// function test(msg,respond){
	// 	const validCommands = {
	// 		desc: 'desc',
	// 		process: 'process'
	// 	};
	// 	const command = msg.args.params.cmd;
	// 	console.log(command,'ttttttttttttt');
	// 	console.log(respond,'RRRRRRRRRRRR');
	// 	this.act('role:color', function(err,respond){
	// 		  if(err) return {error:err,data:respond};
	// 		return  respond ;
	// 	});
	// }

	function test(msg, done){
		console.log('functi');
		
		dbUsers.find({},function(err,data){
			if(err){
				done({err:err})
			}else{
			  return done({'tests':data})
				// res.writeHead(200, {'Content-Type': 'text/plain'});
    
			}
		})
		// done(null, {foo: 'bar'});
	}

	this.add('role:api,path:csv', function (msg, respond) {
		const validCommands = {
			list: 'list',
		};

		const command = msg.args.params.cmd;
		this.act('role:csv', { cmd: validCommands[command] }, respond);
	});

	this.add('role:api,path:es', function (msg, respond) {
		const validCommands = {
			desc: 'desc',
			sync: 'sync',
			search: 'search'
		};

		const command = msg.args.params.cmd;
		const actionMsg = { cmd: validCommands[command] };

		if (command === 'search') {
			actionMsg.query = msg.args.params.query;
		}

		this.act('role:es', actionMsg, respond);
	});

	this.add('role:api,path:tmstocsv', function (msg, respond) {
		const validCommands = {
			info: 'info',
			run: 'run',
			cancel: 'cancel',
			active: 'active',
		};

		const command = msg.args.params.cmd;
		this.act('role:tmstocsv', { cmd: validCommands[command] }, respond);
	});

	this.add('role:api,path:images', function (msg, respond) {
		const validCommands = {
			info: 'info',
			tile: 'tile',
			upload: 'upload',
			raw: 'raw',
			resize: 'resize',
			cancel: 'cancel'
		};

		const command = msg.args.params.cmd;
		this.act('role:images', { cmd: validCommands[command] }, respond);
	});

	this.add('init:api', function (msg, respond) {
		console.log(' is it comign');
		this.act('role:web', { routes: {
			prefix: '/api',
			pin: 'role:api,path:*',
	  // this is where we add the route to the microservice\

	  
			map: {
				sample: { GET: true, suffix: '/:cmd' },
				csv: { GET: true, suffix: '/:cmd' },
				es: { GET: true, suffix: '/:cmd' },
				tmstocsv: { GET: true, suffix: '/:cmd' },
				images: { GET: true, suffix: '/:cmd' },
			},
		} }, respond);
	});

 
}

module.exports = api;
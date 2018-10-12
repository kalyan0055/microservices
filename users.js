
let tot_users = [
    { id: 1, name: 'Rambabu' },
    { id: 2, name: 'Sridhar' },
    { id: 3, name: 'Srikanth' },
    { id: 4, name: 'Suresh' },
    { id: 5, name: 'Kishore' },
    { id: 6, name: 'Hari' },
    { id: 7, name: 'Govind' }
]

var mongoose = require("mongoose"),
    dbUsers= mongoose.model('users');
function users(options) {
    this.add('role:users,path:userslist', test);
    function test(arg, done) {
        let id = arg.args.params.cmd;
        done(null, tot_users);
    }

    this.add('role:users,path:UserbyId', getUserbyId);

    function getUserbyId(args, done) {
        let id = null;
        id = args.args.params.cmd;
        let finUser = null;
        console.log(id, tot_users);

        finUser = tot_users.filter(item => item.id == id);
        done(null, { finUser });
    }

    this.add('role:users,path:addUser', addUser);

    function addUser(msg, done) {
        let d = msg.args.body;
        tot_users.push(d);
        let data = new dbUsers(d);
        data.save(function (err) {
            if(err){
                done({error:err})
            }else{
                done({saved:data})
            }
        })
        
        done(null, { TotUsers: tot_users })
    }



    // this.add('role:users,path:es', function (msg, respond) {
    //     const validCommands = {
    //         desc: 'desc',
    //         sync: 'sync',
    //         search: 'search'
    //     };

    //     const command = msg.args.params.cmd;
    //     const actionMsg = { cmd: validCommands[command] };

    //     if (command === 'search') {
    //         actionMsg.query = msg.args.params.query;
    //     }

    //     this.act('role:es', actionMsg, respond);
    // });

    // this.add('role:users,path:tmstocsv', function (msg, respond) {
    //     const validCommands = {
    //         info: 'info',
    //         run: 'run',
    //         cancel: 'cancel',
    //         active: 'active',
    //     };

    //     const command = msg.args.params.cmd;
    //     this.act('role:tmstocsv', { cmd: validCommands[command] }, respond);
    // });

    // this.add('role:users,path:images', function (msg, respond) {
    //     const validCommands = {
    //         info: 'info',
    //         tile: 'tile',
    //         upload: 'upload',
    //         raw: 'raw',
    //         resize: 'resize',
    //         cancel: 'cancel'
    //     };

    //     const command = msg.args.params.cmd;
    //     this.act('role:images', { cmd: validCommands[command] }, respond);
    // });

    this.add('init:users', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/users',
                pin: 'role:users,path:*',
                // this is where we add the route to the microservice
                map: {
                    userslist: { GET: true },
                    UserbyId: { GET: true, suffix: '/:cmd' },
                    addUser: { POST: true },
                    es: { GET: true, suffix: '/:cmd' },
                    tmstocsv: { GET: true, suffix: '/:cmd' },
                    images: { GET: true, suffix: '/:cmd' },
                },
            }
        }, respond);
    });


}

module.exports = users;
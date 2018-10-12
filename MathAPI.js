module.exports = function MathAPI(options) {

    // valid operations list
    var valid_ops = {sum: 'sum', product: 'product'};

    this.add('role:api,path:calculate', function (msg, respond) {
        // talking to the microservice
        this.act('role:math', {
            cmd: valid_ops[msg.operation],
            left: msg.left,
            right: msg.right
        }, respond);
    });

    // plugin initialization
    this.add('init:MathAPI', function (msg, respond) {
        // http://localhost:3000/api/calculate/sum?left=2&right=3
        //                       ^      ^       ^   ^-------^
        //                  prefix action operation arguments
        this.act('role:web', {
            use: {
                prefix: '/api',
                pin: 'role:api,path:*',
                map: {
                    calculate: {GET: true, suffix: '/:operation'}
                }
            }
        }, respond);
    });
};
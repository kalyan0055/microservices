module.exports = function MathPlugin(options) {
    this.add('role:math,cmd:sum', sum);
    this.add('role:math,cmd:product', product);

    // middleware for 'role:math,*' pins, that prepares values and calls actions themselves
    this.wrap('role:math', function (msg, respond) {
        msg.left = Number(msg.left).valueOf();
        msg.right = Number(msg.right).valueOf();

        // execute previously matched action
        this.prior(msg, respond);
    });

    function sum(msg, respond) {
        respond(null, {answer: msg.left + msg.right});
    }

    function product(msg, respond) {
        respond(null, {answer: msg.left * msg.right});
    }
};
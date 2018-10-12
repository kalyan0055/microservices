require('seneca')()
    .use('MathPlugin') // equal to .use(require('./MathPlugin'))
    .listen({
        type: 'tcp', // communicate via TCP
        pin: 'role:math' // listen only this pin pattern
    });
var amqp = require('amqplib/callback_api');


export const sendemail = (email)=>{
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'fundo';
        var msg = ` you loggined with this email: ${email} in fundoo app`;

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        //process.exit(0);
    }, 500);
});
}
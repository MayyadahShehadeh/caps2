'use strict';

// const events = require('../GlobalEventPool');
// require('./driver');

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const capsSystem = io.of('/caps'); //localhost:3000/caps
let date = new Date().toString();
const uuid = require("uuid").v4

let msgQueue = {
    msgs: {

    }
}

capsSystem.on('connection', (socket) => {

    console.log('CONNECTED to the caps system ', socket.id);


    socket.on('pickup', payload => {
        // send it to Driver
        const id = uuid();
        msgQueue.msgs[id] = {payload}
        socket.emit('added',payload); //from the vendor
        console.log("after add msgQueue :::: ", msgQueue.msgs);

        console.log('EVENT', {
            event: 'pickup',
            time: date,
            payload: payload
        })
        capsSystem.emit('order', {id: id, payload: msgQueue.msgs[id]}); 
    })

    socket.on('received', order => {
        console.log("received on queue will remove it ...")
        // the driver confirmed receiving , so will remove from queue
        delete msgQueue.msgs[order.id];
        console.log("after delete msgQueue ", msgQueue.msgs);
      })

    socket.on('in-transit', (payload) => {
        console.log('EVENT', {
            event: 'in-transit',
            time: date,
            payload: payload
        });
        // capsSystem.emit('driverInTransit', payload);
        // capsSystem.emit('vendorThanksDeliveried', payload);


    });

    socket.on('get_all', ()=> {
        console.log("get_all : driver wants to get all orders ")
        Object.keys(msgQueue.msgs).forEach(id=> {
            socket.emit('order',  {id: id, payload: msgQueue.msgs[id] })
        });
      });

    socket.on('delivered', (payload) => {
        // send it to Vendor
        console.log('EVENT', {
            event: 'delivered',
            time: date,
            payload: payload
        }
        , '------------------------');
        capsSystem.emit('vendorThanksDeliveried',payload)

    })
});



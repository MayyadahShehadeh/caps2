'use strict';

// const events = require('../GlobalEventPool');
// require('./driver');

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const capsSystem = io.of('/caps'); //localhost:3000/caps


let date = new Date().toString();


// namespace / segment
capsSystem.on('connection', (socket) => {

    console.log('CONNECTED to the caps system ', socket.id);


    socket.on('pickup', payload => {
    console.log('EVENT', {
        event: 'pickup',
        time: date,
        payload: payload
    }
    );
    capsSystem.emit('driverPickedup', payload);
    })


    socket.on('in-transit', (payload) => {
        console.log('EVENT', {
            event: 'in-transit',
            time: date,
            payload: payload
        });
        capsSystem.emit('driverInTransit', payload);
        capsSystem.emit('vendorThanksDeliveried', payload);

        
    });


    socket.on('delivered', (payload) => {

        console.log('EVENT', {
            event: 'delivered',
            time: date,
            payload: payload
            
        }
        , '------------------------');
        
    })
    });

    

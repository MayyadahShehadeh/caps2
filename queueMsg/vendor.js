'use strict';


// const events = require('../GlobalEventPool');
const { faker } = require('@faker-js/faker');

const io = require('socket.io-client');
const host ='http://localhost:3000/caps';
const capsConnection = io.connect(host);

// require('./caps');


setInterval(() => {
    let vendorObject = {
        store: "1-206-flowers",
        orderId: faker.string.uuid(),
        customer: faker.person.fullName(),
        address: faker.location.streetAddress()
    }
    capsConnection.emit('pickup', { vendorObject });

}, 5000);

capsConnection.on('added',payload=>{
    console.log('thank you for adding to queue ', payload)
  }) 

capsConnection.on('vendorThanksDeliveried', (payload) => {

    console.log(` VENDOR: Thank you for delivering ${payload.id}`);
    // capsConnection.emit('delivered', payload);
})

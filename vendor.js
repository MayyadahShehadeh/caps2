'use strict';


const events = require('./GlobalEventPool');
const { faker } = require('@faker-js/faker');

require('./main');

setInterval(()=>{
    let vendorObject =  {
        store: "1-206-flowers",
        orderId: faker.string.uuid(),
        customer: faker.person.fullName(),
        address: faker.location.streetAddress()
    }
    events.emit('pickup',{vendorObject});

},5000);

events.on('vendordelivered', (payload)=>{

    console.log(` VENDOR: Thank you for delivering ${payload.vendorObject.orderId}`);
    events.emit('delivered',payload );
})

module.exports=events;
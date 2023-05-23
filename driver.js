'use strict';

const events = require('./GlobalEventPool');


require('./main');
require('./vendor');

events.on('driverPickedup' , (payload)=>{
    setTimeout(()=>{
    
        console.log(`DRIVER: picked up ${payload.vendorObject.orderId}`);
        events.emit('in-transit',payload );
    },1000);
    

})

events.on('driverDelivery' , (payload)=>{
    setTimeout(()=>{
        console.log(`DRIVER: delivered up  ${payload.vendorObject.orderId}`);
        events.emit('vendordelivered',payload );
    
    },3000);

})




module.exports=events;
import { cheapestShipment } from './InventoryAllocator'

// change the values below and check the output using cmd: npm start
console.log(
    cheapestShipment(
        { apple: 10 },
        [{
            name: "owd", inventory: { apple: 5 }
        },
        {
            name: "dm", inventory: { apple: 5 }
        }]
    )
);
import { Warehouse } from "./Model/Warehouse";
import { Inventory, Shipment } from "./types";

/**
 * To calculate cheapestShipment and return shipments.
 * @param order order placed by customer
 * @param initialWarehouses list of warehouses with their name and inventory
 */
export function cheapestShipment(order: Inventory, initialWarehouses: Warehouse[]) : Shipment[]{
    // results array containing shipments from different inventory
    let shipments: Shipment[] = [];       

    // lets create a deep copy of warehouses
    let warehouses: Warehouse[] = JSON.parse(JSON.stringify(initialWarehouses));
    
    //check if any single inventory can ship entire order
    for(let warehouse of warehouses){
        let entireOrderAvailable:boolean = true;
        // iterating over each item in order to check in the inventory
        for(let item in order){
            if(!warehouse.inventory[item] || warehouse.inventory[item] < order[item]){
                entireOrderAvailable = false;
                break;
            }
        }
        if(entireOrderAvailable){
            let shipment: Shipment = {
                [warehouse.name] : order
            }
            shipments.push(shipment);
            return shipments;
        }
    }

    // Getting the shipment from different stores
    for(let warehouse of warehouses){
        let shipment:Shipment = {};
        let itemList: Inventory = {};
        for(let item in order){
            if(warehouse.inventory[item]){
                itemList[item] = Math.min(warehouse.inventory[item], order[item]);
                if(warehouse.inventory[item] >= order[item]){
                    warehouse.inventory[item] -= order[item];
                    order[item] = 0;
                }else{
                    order[item] -= warehouse.inventory[item]
                    warehouse.inventory[item] = 0;
                }
            }
        }
        if(Object.keys(itemList).length !== 0){
            shipment[warehouse.name] = itemList;
            shipments.push(shipment);
        }
    }
    
    // To check if the order is incomplete.
    for(let item in order){
        if(order[item]){
            return [];
        }
    }

    //change inventory of initial Warehouse
    initialWarehouses = warehouses;

    return shipments;
}


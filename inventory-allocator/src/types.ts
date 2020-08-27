export type Inventory = {
    [key: string]: number;
}

export type Shipment = {
    [name: string]: Inventory
}
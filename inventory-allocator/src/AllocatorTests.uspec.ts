import { cheapestShipment } from "./InventoryAllocator";

describe("Inventory Allocator", () => {

    it("should create one shipment where inventory is exactly matching", () => {
        expect(cheapestShipment({ apple: 1 }, [{ name: "owd", inventory: { apple: 1 } }]))
            .toEqual([{ owd: { apple: 1 } }]);
    });

    it("should create one shipment where inventory is more than needed", () => {
        expect(cheapestShipment({ apple: 3 }, [{ name: "owd", inventory: { apple: 10 } }]))
            .toEqual([{ owd: { apple: 3 } }]);
    });

    it("should create no shipments when there is not enough inventory", () => {
        expect(cheapestShipment({ apple: 1 }, [{ name: "owd", inventory: { apple: 0 } }]))
            .toEqual([]);
    });

    it("should be able to split a single item across warehouses", () => {
        expect(cheapestShipment({ apple: 10 }, [{
            name: "owd", inventory: { apple: 5 }
        },
        {
            name: "dm", inventory: { apple: 5 }
        }]))
            .toEqual([{ owd: { apple: 5 } }, { dm: { apple: 5 } }]);
    });

    it("should be able to get any item from all available warehouses", () => {
        expect(cheapestShipment({ apple: 10 },
            [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 5 } }]))
            .toEqual([ { owd: { apple: 5 } }, { dm: { apple: 5 } }]);
    });

    it("should be able to split two items across warehouses", () => {
        expect(cheapestShipment({ apple: 5, banana: 5 }, [{
            name: "owd", inventory: { apple: 5 }
        }, {
            name: "dm", inventory: { banana: 5 },
        }]))
            .toEqual([ { owd: { apple: 5 } }, { dm: { banana: 5 } }]);
    });

    it("should fail to allocate if even one item is missing in inventory", () => {
        expect(cheapestShipment({ apple: 5, banana: 5, orange: 5 },
            [{ name: "owd", inventory: { apple: 5, orange: 2 } },
            { name: "dm", inventory: { banana: 5, orange: 2 } }]))
            .toEqual([]);
    });

});
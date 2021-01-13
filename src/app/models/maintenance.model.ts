import { Deserializable } from "./deserializable.model";

export class Maintenance implements Deserializable {

    id: number;
    deviceID: string;
    name: String;
    price: number;
    timestampStart: number;
    timestampEnd: number;
    kmStart: number;
    kmEnd: number;
    oilFilterChanged: number;
    fuelFilterChanged: number;
    airFilterChanged: number;
    maintenance_Type: string;
    vehicleModel: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
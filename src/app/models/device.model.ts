import { Deserializable } from "./deserializable.model";

export class Device implements Deserializable {

    accountID: String;
    activity_time: any;
    deviceID: String;
    distanceKM: number;
    fuelLevel: number;
    heading: number;
    latitude: number;
    longitude: number;
    odometerKM: number;
    simPhoneNumber: String;
    speedKPH: number;
    timestamp: bigint;
    vehicleModel: String;
    address:string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
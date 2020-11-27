import { Deserializable } from "./deserializable.model";

export class SpeedReport implements Deserializable {
    activity_time: any;
    deviceID: String;
    distanceKM: number;
    heading: number;
    latitude: number;
    longitude: number;
    speedKPH: number;
    timestamp: bigint;
    vehicleModel: String;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
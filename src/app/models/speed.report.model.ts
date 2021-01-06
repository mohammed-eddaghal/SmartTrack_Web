import { Deserializable } from "./deserializable.model";

export class SpeedReport implements Deserializable {
    activity_time: any;
    deviceID: String;
    distanceKM: number;
    heading: number;
    latitude: number;
    longitude: number;
    speedKPH: number;
    timestamp: number;
    // vehicleModel: String;

    deserialize(input: any) {
        const date = new Date(input.timestamp * 1000);
        input.timestamp = this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
        Object.assign(this, input);
        return this;
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}
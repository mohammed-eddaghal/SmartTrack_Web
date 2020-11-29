import { Deserializable } from "./deserializable.model";

export class AllSummaryReport implements Deserializable {

    distance: number;
    odometerEnd: number;
    odometerStart: number;
    deviceID: String;
    parkingTimes: number;
    runningTime: number;
    speedAvg: number;
    speedMax: number;
    stops: number;
    vehicleModel: String;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
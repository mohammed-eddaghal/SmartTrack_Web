import { Deserializable } from "./deserializable.model";

export class Alarm implements Deserializable {
    alarmID: AlarmID;
    maxSpeed: number;
    startUp: boolean;
    battery: boolean;
    disconnect: boolean;
    bonnet: boolean;
    towing: boolean;
    crash: boolean;
    driver: boolean;
    minTemp: number;
    maxTemp: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class AlarmID implements Deserializable {
    accountID: string;
    userID: string;
    deviceID: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
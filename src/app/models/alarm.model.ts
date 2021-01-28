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

    constructor() {
        this.startUp = false;
        this.battery = false;
        this.disconnect = false;
        this.bonnet = false;
        this.towing = false;
        this.crash = false;
        this.driver = false;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class AlarmID implements Deserializable {
    accountID: string;
    userID: string;
    deviceID: string;

    constructor(accountID, userID, deviceID) {
        this.accountID = accountID;
        this.userID = userID;
        this.deviceID = deviceID;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
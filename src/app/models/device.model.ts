import { DatePipe, formatDate } from "@angular/common";
import { Deserializable } from "./deserializable.model";

export class Device implements Deserializable {

    accountID: String;
    private _activity_time: any;
    deviceID: String;
    distanceKM: number;
    fuelLevel: number;
    heading: number;
    latitude: number;
    longitude: number;
    odometerKM: number;
    simPhoneNumber: String;
    speedKPH: number;
    timestamp: number;
    vehicleModel: String;
    address: string;
    private _status: number; // -2: unkown, -1: late, 0: parking, 1:running

    get activity_time() {
        if (this._activity_time != null) {
            if (this._activity_time == '+24h') return this._activity_time;
            else if (this._activity_time.match('^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$')) {
                return this._activity_time;
            }
            else {
                var t = new Date(1970, 0, 1); // Epoch
                t.setSeconds(this._activity_time);
                return t.getDay ,'/', t.getMonth, '/', t.getFullYear, ' ', t.getHours, ':' , t.getMinutes, ':', t.getSeconds
            }
        }
        return '';
    }

    get status() {
        if (this._activity_time != null) {
            if (this._activity_time == '+24h') return -1;
            else if (this._activity_time.match('^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$')) {
                return 0;
            }
            else {
                return 1;
            }
        }
        return -2;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
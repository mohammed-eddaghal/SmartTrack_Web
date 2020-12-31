import { HttpClient } from "@angular/common/http";
import { Deserializable } from "./deserializable.model";

export class EventData implements Deserializable {
    accountID: String;
    activity_time: String;
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
    private _address: string = "";
    private _status: number; // -2: unkown, -1: late, 0: parking, 1:running

    constructor(private http?: HttpClient) {
        this.http = http;
    };

    get address() : string{
        /*this.http?.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-34.44076&lon=-58.70521')
        .subscribe(
            (response) => this._address = response['display_name'] ?? '',
            (error) => this._address = ''
        );*/
        return this._address;
    }

    get status() {
        if (this.activity_time != null) {
            if (this.activity_time == '+24h') return -1;
            else if (this.activity_time.match('^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$')) {
                return 0;
            }
            else {
                return 1;
            }
        }
        return -2;
    }

    icon() {
        if (this.activity_time != null) {
            var activityTime = this.activity_time.split(',')[1];
            if (activityTime == 'late') {
                return "../../assets/status/r_marker_blue.png";
            } else if (activityTime == 'parked') {
                return "../../assets/status/marker_blue_parking.png";
            } else {
                if (this.speedKPH < 3) {
                    return "../../assets/status/stop_small.png";
                } else if (this.speedKPH < 60) {
                    if (this.heading == 0)
                        return "../../assets/status/marker_green.png";
                    else if (this.heading < 90)
                        return "../../assets/status/marker_green_ne.png";
                    else if (this.heading == 90)
                        return "../../assets/status/marker_green_e.png";
                    else if (this.heading < 180)
                        return "../../assets/status/marker_green_se.png";
                    else if (this.heading == 180)
                        return "../../assets/status/marker_green_s.png";
                    else if (this.heading < 270)
                        return "../../assets/status/marker_green_sw.png";
                    else if (this.heading == 270)
                        return "../../assets/status/marker_green_w.png";
                    else if (this.heading < 360)
                        return "../../assets/status/marker_green_nw.png";
                    else
                        return "../../assets/status/marker_green_n.png";
                } else if (this.speedKPH < 100) {
                    if (this.heading == 0)
                        return "../../assets/status/marker_grey.png";
                    else if (this.heading < 90)
                        return "../../assets/status/marker_grey_ne.png";
                    else if (this.heading == 90)
                        return "../../assets/status/marker_grey_e.png";
                    else if (this.heading < 180)
                        return "../../assets/status/marker_grey_se.png";
                    else if (this.heading == 180)
                        return "../../assets/status/marker_grey_s.png";
                    else if (this.heading < 270)
                        return "../../assets/status/marker_grey_sw.png";
                    else if (this.heading == 270)
                        return "../../assets/status/marker_grey_w.png";
                    else if (this.heading < 360)
                        return "../../assets/status/marker_grey_nw.png";
                    else
                        return "../../assets/status/marker_grey_n.png";
                } else {
                    if (this.heading == 0)
                        return "../../assets/status/marker_yellow.png";
                    else if (this.heading < 90)
                        return "../../assets/status/marker_yellow_ne.png";
                    else if (this.heading == 90)
                        return "../../assets/status/marker_yellow_e.png";
                    else if (this.heading < 180)
                        return "../../assets/status/marker_yellow_se.png";
                    else if (this.heading == 180)
                        return "../../assets/status/marker_yellow_s.png";
                    else if (this.heading < 270)
                        return "../../assets/status/marker_yellow_sw.png";
                    else if (this.heading == 270)
                        return "../../assets/status/marker_yellow_w.png";
                    else if (this.heading < 360)
                        return "../../assets/status/marker_yellow_nw.png";
                    else
                        return "../../assets/status/marker_yellow_n.png";
                }
            }
        }
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
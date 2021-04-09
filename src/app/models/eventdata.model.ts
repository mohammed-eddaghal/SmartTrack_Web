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
    rssi: number;
    simPhoneNumber: String;
    speedKPH: number;
    timestamp: number;
    vehicleModel: String;
    address: String;
    private _status: number; // -2: unkown, -1: late, 0: parking, 1:running
    
    getSignalString() {
        if(this.rssi != null) {
            switch(this.rssi) {
                case 0 : return 'Très faible';
                case 1 : return 'Faible';
                case 2 : return 'Moyen';
                case 3 : return 'Moyen';
                case 4 : return 'Bon';
                case 5 : return 'Très bon';
            }
        } else {
            return 'Pas d\'information';
        }
    }
    
    getSignalIconPath() {
        if(this.rssi != null) {
            switch(this.rssi * 3) {
                case 0 : return '../../assets/signal/signal-'+ this.rssi * 3 + '.png';
                case 3 : return '../../assets/signal/signal-'+ this.rssi * 3 + '.png';
                case 6 : return '../../assets/signal/signal-'+ this.rssi * 3 + '.png';
                case 9 : return '../../assets/signal/signal-'+ this.rssi * 3 + '.png';
                case 12 : return '../../assets/signal/signal-'+ this.rssi * 3 + '.png';
                case 15 : return '../../assets/signal/signal-'+ 12 + '.png';
            }
        } else {
            return '';
        }
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

    icon(option?) {
        if (option != null && option == "History") {
            if (this.speedKPH == 0) {
                return "../../assets/status/stop_small.png";
            } else if (this.speedKPH <= 67) {
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
            } else if (this.speedKPH <= 127) {
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
        } else {
            if (this.activity_time != null) {
                var activityTime = this.activity_time.split(',')[1];
                if (activityTime == 'late') {
                    return "../../assets/status/r_marker_blue.png";
                } if (activityTime == 'disconnected') {
                    return "../../assets/status/disconnected.png";
                } else if (activityTime == 'parked') {
                    return "../../assets/status/marker_blue_parking.png";
                } else {
                    if (this.speedKPH == 0) {
                        return "../../assets/status/stop_small.png";
                    } else if (this.speedKPH <= 67) {
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
                    } else if (this.speedKPH <= 127) {
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
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
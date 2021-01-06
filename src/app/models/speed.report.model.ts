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

    icon() {
        if (this.activity_time != null) {
            var activityTime = this.activity_time.split(',')[1];
            if (activityTime == 'late') {
                return "../../assets/status/r_marker_blue.png";
            } if (activityTime == 'disconnected') {
                return "../../assets/status/disconnected.png";
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
        const date = new Date(input.timestamp * 1000);
        // input.timestamp = date.getDay() + "-" + this.addZero(date.getMonth() + 1) + " " + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
        input.timestamp = date.toUTCString();
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
export class Etat {
  private _latitude?: Number;
  private _vehicleModel?: String;
  private _timestamp: Number;
  private _longitude?: number;
  private _heading?: any;
  private _simPhoneNumber?: string;
  private _accountID?: String;
  private _distanceKM?: any;
  private _speedKPH?: Number;
  private _deviceID?: String;
  private _activity_time?: any;
  private _adress?: String;

  public get latitude() {
    return this._latitude;
  }

  public get vehicleModel() {
    return this._vehicleModel;
  }

  public get timestamp() {
    return this._timestamp;
  }

  public get longitude() {
    return this._longitude;
  }

  public get heading() {
    return this._heading;
  }

  public get simPhoneNumber() {
    return this._simPhoneNumber;
  }

  public get accountID() {
    return this._accountID;
  }

  public get distanceKM() {
    return this._distanceKM;
  }

  public get speedKPH() {
    return this._speedKPH;
  }

  public get activity_time() {
    return this._activity_time;
  }

  public get deviceID() {
    return this._deviceID;
  }

  public get adress() {
    return this._adress;
  }

  public get iconPath() {
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
    return "../../assets/status/disconnected.png";
  }
}
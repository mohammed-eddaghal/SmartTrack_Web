export class Etat{
    private _latitude?:Number;
    private _vehicleModel?:String;
    private _timestamp:Number;
    private _longitude?:number;
    private _heading?:any;
    private _simPhoneNumber?:string;
    private _accountID?:String;
    private _distanceKM?:any;
    private _speedKPH?:Number;
    private _deviceID?:String;
    private _activity_time?:any;
    private _adresse?:String;
    private _etatLogo:String;
    
    public get latitude(){
        return this._latitude;
    }

    public get vehicleModel(){
        return this._vehicleModel;
    }

    public get timestamp(){
        return this._timestamp;
    }

    public get longitude(){
        return this._longitude;
    }

    public get heading(){
        return this._heading;
    }

    public get simPhoneNumber(){
        return this._simPhoneNumber;
    }
    
    public get accountID(){
        return this._accountID;
    }

    public get distanceKM(){
        return this._distanceKM;
    }

    public get speedKPH(){
        return this._speedKPH;
    }

    public get activity_time(){
        return this._activity_time;
    }

    public get deviceID(){
        return this._deviceID;
    }

    public get adresse(){
        return this._adresse;
    }

    public get etatLogo(){
        return this._etatLogo;

        /*if (typeof (this.activity_time) === 'string') {
            if (this.activity_time === '+24h') {
              return "../assets/status/r_marker_blue.png"
              return 1;
            } else {
              this.etatLogo="../assets/status/marker_blue_parking.png"
              return 0;
            }
          }
          if(speed<3)
            this.etatLogo="../assets/status/stop_small.png";
          else if(speed<60){
            if(heading==0)
              this.etatLogo="../assets/status/marker_green.png";
            else if(heading<90)
              this.etatLogo="../assets/status/marker_green_ne.png";
            else if(heading==90)
              this.etatLogo="../assets/status/marker_green_e.png";
            else if(heading<180)
              this.etatLogo="../assets/status/marker_green_se.png";
            else if(heading==180)
              this.etatLogo="../assets/status/marker_green_s.png";
            else if(heading<270)
              this.etatLogo="../assets/status/marker_green_sw.png";
            else if(heading==270)
              this.etatLogo="../assets/status/marker_green_w.png";
            else if(heading<360)
              this.etatLogo="../assets/status/marker_green_nw.png";
            else
              this.etatLogo="../assets/status/marker_green_n.png";
          }else if(speed<100){
            if(heading==0)
              this.etatLogo="../assets/status/marker_grey.png";
            else if(heading<90)
              this.etatLogo="../assets/status/marker_grey_ne.png";
            else if(heading==90)
              this.etatLogo="../assets/status/marker_grey_e.png";
            else if(heading<180)
              this.etatLogo="../assets/status/marker_grey_se.png";
            else if(heading==180)
              this.etatLogo="../assets/status/marker_grey_s.png";
            else if(heading<270)
              this.etatLogo="../assets/status/marker_grey_sw.png";
            else if(heading==270)
              this.etatLogo="../assets/status/marker_grey_w.png";
            else if(heading<360)
              this.etatLogo="../assets/status/marker_grey_nw.png";
            else
              this.etatLogo="../assets/status/marker_grey_n.png";
          }else{
            if(heading==0)
              this.etatLogo="../assets/status/marker_yellow.png";
            else if(heading<90)
              this.etatLogo="../assets/status/marker_yellow_ne.png";
            else if(heading==90)
              this.etatLogo="../assets/status/marker_yellow_e.png";
            else if(heading<180)
              this.etatLogo="../assets/status/marker_yellow_se.png";
            else if(heading==180)
              this.etatLogo="../assets/status/marker_yellow_s.png";
            else if(heading<270)
              this.etatLogo="../assets/status/marker_yellow_sw.png";
            else if(heading==270)
              this.etatLogo="../assets/status/marker_yellow_w.png";
            else if(heading<360)
              this.etatLogo="../assets/status/marker_yellow_nw.png";
            else
              this.etatLogo="../assets/status/marker_yellow_n.png";
          }
          return -1;
        }*/
    }

    

}
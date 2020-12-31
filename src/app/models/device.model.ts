import { Deserializable } from "./deserializable.model";

export class Device implements Deserializable {
    private deviceID: DeviceID;
    private equipmentType: String;
    private equipmentStatus: String;
    private vehicleModel: String;
    private vehicleID: String;
    private licenseExpire: number;
    private driverID: String;
    private driverStatus: number;
    private uniqueID: String;
    private serialNumber: String;
    private simPhoneNumber: String;
    private imeiNumber: String;
    private odometerOffsetKM: number;
    private engineHoursOffset: number;
    private isActive: number;
    private displayName: String;
    private description: String;
    private lastUpdateTime: number;
    private creationTime: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export interface DeviceID {
    deviceID: string;
    accountID: string;
}
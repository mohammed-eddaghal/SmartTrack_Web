import { Deserializable } from "./deserializable.model";

export class Device implements Deserializable {
    deviceID: DeviceID;
    equipmentType: String;
    equipmentStatus: String;
    vehicleModel: String;
    vehicleID: String;
    licenseExpire: number;
    driverID: String;
    driverStatus: number;
    uniqueID: String;
    serialNumber: String;
    simPhoneNumber: String;
    imeiNumber: String;
    odometerOffsetKM: number;
    engineHoursOffset: number;
    isActive: number;
    displayName: String;
    description: String;
    lastUpdateTime: number;
    creationTime: number;
    remainingTime: number;
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export interface DeviceID {
    deviceID: string;
    accountID: string;
}
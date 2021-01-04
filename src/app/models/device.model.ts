import { Deserializable } from "./deserializable.model";

export class Device implements Deserializable {
    deviceID: DeviceID;
    equipmentType: string;
    equipmentStatus: string;
    vehicleModel: string;
    vehicleID: string;
    licenseExpire: any;
    driverID: string;
    driverStatus: number;
    uniqueID: string;
    serialNumber: string;
    simPhoneNumber: string;
    imeiNumber: string;
    odometerOffsetKM: number;
    engineHoursOffset: number;
    isActive: number;
    displayName: string;
    description: string;
    lastUpdateTime: number;
    creationTime: number;
    remainingTime: number;
    licenseExpireTimestamp: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export interface DeviceID {
    deviceID: string;
    accountID: string;
}
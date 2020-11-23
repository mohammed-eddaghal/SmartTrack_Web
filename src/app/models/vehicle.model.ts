import { Deserializable } from "./deserializable.model";

export class Vehicle implements Deserializable {

    deviceID: String;
    vehicleModel: String;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
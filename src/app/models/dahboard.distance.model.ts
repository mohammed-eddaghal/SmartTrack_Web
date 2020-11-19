import { Deserializable } from "./deserializable.model";

export class DashboardDistance implements Deserializable {

    vehicleModel:String;
    distance: number;
    running_time: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
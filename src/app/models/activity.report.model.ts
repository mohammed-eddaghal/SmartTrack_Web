import { Deserializable } from "./deserializable.model";

export class ActivityReport implements Deserializable {

    distanceKM: number;
    maxOdo: number;
    minOdo: number;
    startTime: number;
    endTime: number;
    avgSpeed: number;
    maxSpeed: number;
    status: number;
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
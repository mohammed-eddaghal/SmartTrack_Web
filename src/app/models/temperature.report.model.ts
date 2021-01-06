import { Deserializable } from "./deserializable.model";

export class TemperatureReport implements Deserializable {
    timestamp: number;
    engineTemp: number;

    deserialize(input: any) {
        const date = new Date(input.timestamp * 1000);
        // input.timestamp = date.getDay() + "-" + this.addZero(date.getMonth() + 1) + " " + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
        input.timestamp = date.toUTCString();
        Object.assign(this, input);
        return this;
    }
}
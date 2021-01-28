import { Deserializable } from "./deserializable.model";

export class Notification implements Deserializable {

    deviceID: string;
    timestamp: number;
    type: string;
    message: string;
    vehicleModel: string;

    getType() {
        switch (this.type) {
            case 'SP': return 'Vitesse dépassée';
            case 'SU': return 'Démarrage du véhicule';
            case 'BA': return 'Batterie GPS déchargée';
            case 'DI': return 'GPS débranché';
            case 'BO': return 'Capot ouvert';
            case 'TO': return 'Towing';
            case 'CR': return 'Choc';
            case 'DR': return 'Chauffeur changé';
            case 'TMIN': return 'Température minimale atteinte';
            case 'TMAX': return 'Température maximale atteinte';
        }
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
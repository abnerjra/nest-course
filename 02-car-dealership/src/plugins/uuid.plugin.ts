import { v4 as uuid } from "uuid";

export class UuidPlugin {

    static generateUuid() {
        return uuid();
    }
}
import {
  v4 as uuid,
  validate as isUUID
} from "uuid";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UuidAdapter {
  generateUUID(): string {
    return uuid();
  }

  validateUuid(uuid: string): boolean {
    return isUUID(uuid)
  }
}
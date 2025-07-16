import { Injectable } from "@nestjs/common";

import { hashSync, compareSync } from "bcrypt";

@Injectable()
export class BcryptAdapter {
  createHash = (password: string): string => {
    return hashSync(password, 12);
  }

  verifyHash = (password: string, hashedPassword: string): boolean => {
    return compareSync(password, hashedPassword);
  }
}
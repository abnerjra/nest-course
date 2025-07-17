import { UuidAdapter } from "src/common/adapters/uuid.adapter";

const uuidAdapter = new UuidAdapter();

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/').at(1);

  const fileName = `${uuidAdapter.generateUUID()}.${fileExtension}`;

  callback(null, fileName);
}
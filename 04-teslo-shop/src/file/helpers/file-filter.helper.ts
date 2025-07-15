export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/').at(1);
  const validExtensions = ['jpg', 'jpeg', 'png', 'pneg'];

  if (validExtensions.includes(fileExtension!)) {
    return callback(null, true);
  }


  callback(null, false);
}
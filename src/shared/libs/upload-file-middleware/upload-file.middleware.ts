import { Request, Response, NextFunction } from 'express';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const multer = require('multer');
const { extension } = require('mime-types');
import * as crypto from 'node:crypto';
import { IUploadFileMiddleware } from './upload-file.middleware.interface.js';

export class UploadFileMiddleware implements IUploadFileMiddleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string
  ) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    const storage = multer.diskStorage({
      destination: this.uploadDirectory,
      /* eslint-disable @typescript-eslint/no-explicit-any */
      filename: (_req: any, file: { mimetype: any; }, cb: (arg0: null, arg1: string) => void) => {
        console.log('>>');
        const fileExtension = extension(file.mimetype);
        console.log('>>', fileExtension);
        const fileName = crypto.randomUUID();
        cb(null, `${fileName}.${fileExtension}`);
      }
    });
    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);
    console.log(this, request);

    return uploadSingleFileMiddleware(request, response, next);
  }
}

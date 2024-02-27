import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the DB server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database',
    format: 'port',
    env: 'DB_PORT',
    default: null
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'MONGO_INITDB_ROOT_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: 'String',
    env: 'MONGO_INITDB_ROOT_PASSWORD',
    default: null,
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: null,
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory to upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  JWT_SECRET: {
    doc: 'JWT secret',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
});

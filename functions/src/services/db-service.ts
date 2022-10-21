import { JsonDB, Config } from 'node-json-db';

export const DB = new JsonDB(new Config("file-db", true, false, '/'));
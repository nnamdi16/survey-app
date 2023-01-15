import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
export const rootMongooseTestModule = () =>
  MongooseModule.forRootAsync({
    useFactory: async (options: MongooseModuleOptions = {}) => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeMongodConnection = async () => {
  if (mongod) await mongod.stop();
};

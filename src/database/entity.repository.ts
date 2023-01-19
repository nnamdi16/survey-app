import {
  FilterQuery,
  HydratedDocument,
  Model,
  ProjectionFields,
} from 'mongoose';
import { GenericMatch } from 'src/util/interface/genericMatch.interface';

export abstract class EntityRepository<
  T extends HydratedDocument<GenericMatch>,
> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: GenericMatch) {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: ProjectionFields<T>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
        __v: 0,
      })
      .exec();
  }
}

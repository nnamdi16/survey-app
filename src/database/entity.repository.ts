import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { GenericMatch } from 'src/util/util';

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
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }
}

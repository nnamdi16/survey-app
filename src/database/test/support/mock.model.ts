export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }
  constructorSpy(_createEntityData: T): void {}

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOne(): Promise<T> {
    return this.entityStub;
  }
}

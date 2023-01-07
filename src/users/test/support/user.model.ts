import { MockModel } from '../../../database/test/__mocks__/mock.model';
import { User } from 'src/users/entities/user.entity';
import { createUserEntityStub } from '../stubs/user.stubs';

export class UserModel extends MockModel<User> {
  protected entityStub = { ...createUserEntityStub() };
}

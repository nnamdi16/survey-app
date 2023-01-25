import { MockModel } from 'src/database/__mocks__/support/mock.model';
import { User } from 'src/users/entities/user.entity';
import { userStub } from '../stubs/user.stubs';

export class UserModel extends MockModel<User> {
  protected entityStub = { ...(userStub() as User) };
}

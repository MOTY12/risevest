import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models/users.model';
import cilent from '@/database';


const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = UserModel.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { id: UserModel.length + 1, ...userData, password: hashedPassword };

    return createUserData;
  }

  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {

    const sql = 'SELECT * FROM users WHERE email = $1';
    const findUser = await cilent.query(sql, [userData.email]);
    if (!findUser.rows[0]) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.rows[0].password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = createToken(findUser.rows[0]);
    const cookie = createCookie(tokenData);
    console.log(cookie)
    return { cookie, findUser: findUser.rows[0] };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = UserModel.find(user => user.email === userData.email && user.password === userData.password);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}

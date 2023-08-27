import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models/users.model';
import cilent from '@/database';


@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {

    const sql = 'SELECT * FROM users';
    const users = await cilent.query(sql);
    
    return users.rows;
  }

  // public async findUserById(userId: number): Promise<User> {
  //   const findUser: User = UserModel.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   return findUser;
  // }

  public async createUser(userData: User): Promise<User> {
    //check if user already exists
    const sqlCheck = 'SELECT * FROM users WHERE email = $1';
    const checkUser = await cilent.query(sqlCheck, [userData.email]);

      if (checkUser.rows[0]) throw new HttpException(409, `User with email ${userData.email} already exists`);

      const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const createUserData = await cilent.query(sql, [userData.username, userData.email, hashedPassword]);
      return createUserData.rows[0];
  }

  // public async updateUser(userId: number, userData: User): Promise<User[]> {
  //   const findUser: User = UserModel.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   const updateUserData: User[] = UserModel.map((user: User) => {
  //     if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
  //     return user;
  //   });

  //   return updateUserData;
  // }

  // public async deleteUser(userId: number): Promise<User[]> {
  //   const findUser: User = UserModel.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const deleteUserData: User[] = UserModel.filter(user => user.id !== findUser.id);
  //   return deleteUserData;
  // }
}

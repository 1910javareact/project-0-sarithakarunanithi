import { User } from '../models/user';
import { daoGetUserById, daoGetUsernameAndPassword, daoUpdateUser, daoGetAllUser } from '../repositories/user-dao';

// return all user
export async function getAllUser(): Promise<User[]> {
    try {
        return await daoGetAllUser();
    } catch (e) {
        throw e;
    }
}
// user by id
export async function getUserById(id: number): Promise<User> {
    //console.log(id);
    try {
        return await daoGetUserById(id);
    } catch (e) {
        throw e;
    }
}
// user by username & password
export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
        return await daoGetUsernameAndPassword(username, password);
    } catch (e) {
        throw e;
    }
}
// update user
export async function getUpdateUser(req: User) {
    try {
        const user = await daoGetUserById(req.userId);
        for (const key in req) {
            if (req[key] !== undefined && user.hasOwnProperty(key)) {
                user[key] = req[key];
            }
        }
        await daoUpdateUser(user);
        return user;
    } catch (e) {
        throw e;
    }
}
import { User } from '../models/user';
import { daoGetAllUsers, daoGetUserById, daoGetUsernameAndPassword, daoUpdateUser } from '../repositories/user-dao';


export async function getAllUsers(): Promise<User[]> {
    try {
         return await daoGetAllUsers();
     } catch (e) {
         throw e;
     }
}

export function getUserById(id: number): Promise<User> {
    console.log('Service: You are searching for ' + id);
    return daoGetUserById(id);
}

export function getUserByUsernameAndPassword(username: string, password: string) {
     // have to finish the functionality
    return daoGetUsernameAndPassword(username, password);
}

export async function getUpdateUser(req:User){
    let user = await daoGetUserById(req.userId)
    for(let key in req){
        if(req[key] !== undefined && user.hasOwnProperty(key)){

        }
    }
    return await daoUpdateUser(user);
}
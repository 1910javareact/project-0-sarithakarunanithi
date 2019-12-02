import { User } from '../models/user';
import { daoGetUserById, daoGetUsernameAndPassword, daoUpdateUser, daoGetAllUser } from '../repositories/user-dao';

// return all user
export async function getAllUser(): Promise<User []> {
    try {
         return await daoGetAllUser();
     } catch (e) {
         throw e;
     }
}
//return user by id
export async function getUserById(id: number): Promise<User> {
    //console.log('Service: You are searching for ' + id);
   try{
      return await daoGetUserById(id);
   }catch (e){
       throw e
   }
}
// return user by username & password
export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
   try{
      return await daoGetUsernameAndPassword(username, password);
   }catch(e){
       throw e
   }
}
//return updated user
export async function getUpdateUser(req:User){
    let user = await daoGetUserById(req.userId)
    for(let key in req){
        if(req[key] !== undefined && user.hasOwnProperty(key)){

        }
    }
    return await daoUpdateUser(user);
}
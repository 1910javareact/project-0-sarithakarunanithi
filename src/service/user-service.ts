import { User } from "../models/user";
import { daoGetAllUsers, daoGetUserById, daoGetUsernameAndPassword } from "../repositories/user-dao";



export function getAllUsers(): User[] {
    // have to finish the functionality

    return daoGetAllUsers()
}

// export function saveOneUser(u:User){
//     return daoSaveOneUser(u)
// }

export function getUserById(id: number): User {
    console.log("Service: You are searching for " + id);
    return daoGetUserById(id)
}

export function getUserByUsernameAndPassword(username: string, password: string) {
     // have to finish the functionality
    return daoGetUsernameAndPassword(username, password)
}
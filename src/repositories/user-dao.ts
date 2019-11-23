import { User } from "../models/user";
import { users } from "../database";
// import { getUserById } from "../service/user-service";

// make a function to call all user
export function daoGetAllUsers(): User[] {
    return users
}

// save 1 user
// export function daoSaveOneUser(u:User){
//     u.userId = userId
//     id++
//     users.push(u)
//     return true   
// }



// get user id
export function daoGetUserById(id: number) {
    for (let u of users) {
        if (u.userId === id) {
            return u
        }
    }
    throw {
        status: 404,
        message: 'This user does not exist'
    }
}

// Get username & password
export function daoGetUsernameAndPassword(username: string, password: string) {
    for (let u of users) {
        if (username === u.username && password === u.password) {
            return u;
        }
    }
    throw {
        status: 401,
        message: 'Bad Credentials'
    }
}

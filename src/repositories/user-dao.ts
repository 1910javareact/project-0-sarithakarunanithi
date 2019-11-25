import { User } from '../models/user';
import { users } from '../database';
import { PoolClient } from 'pg';
//import { getUserById } from '../service/user-service';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConverter } from '../util/Userdto-to-user';


// make a function to call all user
export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('');  //have to write q
        if(result.rowCount === 0){
            throw "No user in the Database"
        }else{
            return multiUserDTOConverter(result.rows);
        }
        
    } catch (e) {
        if(e === 'No user in the Database'){
            throw{
                status: 400,
                message: 'No user in the database'
            }

        }else{
            throw {
             status: 500,
             message: 'Internal server Error'
        }
        }
    } finally {
        client && client.release();
    }
}

// save 1 user

// get user id
export async function daoGetUserById(userId: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(''); // write q
        if (result.rowCount === 0) {
            throw 'No such User'  
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if ( e === 'No such User') {
            throw{
                status: 404,
                message: 'No such User'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client && client.release()
    }
}

// Get username & password
export async function daoGetUsernameAndPassword(username: string, password: string): Promise<User> {    
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(''); // write q
        if (result.rowCount === 0) {
            throw 'bad credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'bad credentials') {
            throw {
                status: 401,
                message: 'Invalid'
            }
        }else{
                throw{
                    status: 500,
                    message: 'Internal Server Error'
                };
            }

    } finally {
        client && client.release();
    }
}
// update user
export function daoUpdateUser(newUser: User){
    for(let u of users){
        if(u.userId === newUser.userId){
            u.newUser;
            return users;
        }
    }
    throw{
        status:404,
        message: 'User not found'
    }
}


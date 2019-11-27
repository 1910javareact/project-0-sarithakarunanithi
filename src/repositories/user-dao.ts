import { User } from '../models/user';
//import { users } from '../database';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConverter } from '../util/Userdto-to-user';


// make a async function to call all users

export async function daoGetAllUsers(): Promise<User[]> {   // Promise is an obj
    let client: PoolClient;                //create a var of Pool client to interact with DB
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles');   //have to write q
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

// get user id
export async function daoGetUserById(userId: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles WHERE user_id = $1'); 
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
     const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles WHERE username = $1 AND password = $2;',
                                          [username, password]); // write q 
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

// // Update user
// export async function daoUpdateUser(user: User):Promise<User>{
    
//     let client: PoolClient
   
//     try {
//         await client.query('BEGIN');
        
//         await client.query('UPDATE project0.users SET username = $1, password = $2, firstname = $3, lastname = $4, email = $5 where user_id = $6',
//                             [user.username, user.password, user.firstName, user.lastName, user.email, user.userId]);
//         //  await client.query('UPDATE project0.user_roles SET role_id = $1 WHERE user_id = $2',
//           //                 [user.role.roleId, user.userId]);
       
      


//         await client.query('COMMIT');
        
//         let result = await client.query('SELECT * FROM project0.users NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles WHERE user_id = $1',
//                                         [user.userId]);
//         if (result.rowCount === 0) {
//             throw 'User does not exist';
//         }
//         else {
//             return userDTOtoUser(result.rows);
//         }
//     }   
//     catch(e){
//         await client.query('ROLLBACK')

//         throw{
//             status: 500,
//             message: 'Internal Server Error'
//         }
//     }
//     finally{
//         client && client.release()
//     }
// }


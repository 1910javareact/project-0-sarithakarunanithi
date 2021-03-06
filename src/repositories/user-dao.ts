import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOUser } from '../util/Userdto-to-user';



// make a async function to call all users
export async function daoGetAllUser(): Promise<User[]> {   // Promise is an obj
    let client: PoolClient;                // Pool client to interact with DB
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles ORDER BY user_id');
        // console.log(result.rows);

        if (result.rowCount === 0) {
            throw 'No users in database';
        } else {
            return multiUserDTOUser(result.rows);
        }
    } catch (e) {
        if (e === 'No users in database') {
            throw {
                status: 400,
                message: 'No users in database'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
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
        // console.log(userId);

        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles WHERE user_id = $1', [userId]);
        // console.log(result.rows);

        if (result.rowCount === 0) {
            throw 'No such User';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'No such User') {
            throw {
                status: 404,
                message: 'No such User'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// Get username & password
export async function daoGetUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles WHERE username = $1 AND password = $2;',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'Bad Credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'Bad Credentials') {
            throw {
                status: 401,
                message: 'Invalid'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }

    } finally {
        client && client.release();
    }
}
// update user
export async function daoUpdateUser(newUser: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('update project0_reimbursement.users SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5 WHERE user_id = $6',
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId]);
        client.query('COMMIT');
        return daoGetUserById(newUser.userId);
    } catch (e) {
        // console.log(e);
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

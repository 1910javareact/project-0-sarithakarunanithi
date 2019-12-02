import { Reimbursement } from "../models/reimbursement ";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multiReimbursementDTOConvertor } from "../util/reimbursementdto-to-reimbursement";


// Get all Reimbursement
export async function daoGetAllReimbursement(): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement');
        return multiReimbursementDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

// By status id
export async function daoGetReimbursementsByStatusId(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement where reimbursement.status_id = $1 ORDER BY reimbursement.date_submitted desc', [statusId]);
        // console.log(result.rows);

        if (result.rowCount === 0) {
            throw 'No reimbursements with that status';
        } else {
            return multiReimbursementDTOConvertor(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements with that status') {
            throw {
                status: 404,
                message: 'No reimbursements with that status'
            };
        } else {
            throw {
                status: 500,
                Message: 'Something went wrong, try again'
            };
        }

    } finally {
        client.release();
    }
}

// By user id
export async function daoGetReimbursementsByUserId(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
       
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE author = $1 ORDER BY date_submitted DESC', [userId]);
      
       // console.log(result.rows);
       
       if (result.rowCount === 0) {
            throw 'No Reimbursements By That User';
        } else {
            return multiReimbursementDTOConvertor(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements with that user') {
            throw {
                status: 404,
                message: 'No reimbursements with that user'
            };
        } else {
            throw {
                status: 500,
                Message: 'Something went wrong, try again'
            };
        }

    } finally {
        client.release();
    }
}

// post reimbursement
export async function daoPostReimbursement(post) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
       // console.log(post.author);
        
        await client.query('INSERT INTO project0_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) values ($1,$2,$3,$4,$5,1,$6,$7)',
                           [post.author, post.amount, post.date_submitted, post.date_resolved, post.description, post.type]);
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
                          [post.author]);
        client.query('COMMIT');
        return multiReimbursementDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal server error'
        };
    } finally {
        client.release();
    }
}

export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE reimbursementid = $1',
            [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'Reimbursement does not exist';
        } else {
            return multiReimbursementDTOConvertor(result.rows);
        }
    } catch (e) {
        if (e === 'Reimbursement does not exist') {
            throw {
                status: 404,
                message: 'Reimbursement does not exist'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}

export async function daoUpdateReimbursement(r: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query(`UPDATE project0.reimbursement SET author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6,
            resolver = $7, status = $8, type = $9 WHERE reimbursementid = $1;`,
            [r.reimbursementId, r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}
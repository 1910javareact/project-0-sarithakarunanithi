
import { Reimbursement } from "../models/reimbursement ";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementdto-to-reimbursement";



// Get all Reimbursement
export async function daoGetAllReimbursement(): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement');
        return multiReimbursementDTOtoReimbursement(result.rows);
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
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE status = $1 ORDER BY date_submitted DESC', [statusId]);
        // console.log(result.rows);

        if (result.rowCount === 0) {
            throw 'No reimbursements with that status';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
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
                Message: 'Something went wrong!'
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
            return multiReimbursementDTOtoReimbursement(result.rows);
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
export async function daoPostReimbursement(reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
      //  console.log(reimbursement.author);
        
        await client.query('INSERT INTO project0_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, status, "type") values ($1,$2,$3,$4,$5,1,$6)',
                           [reimbursement.author, reimbursement.amount, reimbursement.date_submitted, reimbursement.date_resolved, reimbursement.description, reimbursement.type]);
                           
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
                          [reimbursement.author]);
        client.query('COMMIT');
        return multiReimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal server error'
        };
    } finally {
        client.release();
    }
}

// update
export async function daoUpdateReimbursement(r: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
       // console.log(r.amount);
        
        client.query('BEGIN');
      //  console.log(r.reimbursementId);
        
        await client.query(`UPDATE project0.reimbursement SET author = $2, amount = $3, date_submitted = $4, date_resolved = $5, description = $6,
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


export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM project0.reimbursement.reimbursement WHERE reimbursementid = $1',
            [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'Reimbursement does not exist';
        } else {
            return reimbursementDTOtoReimbursement(result.rows);
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


import { Reimbursement } from '../models/reimbursement ';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from '../util/reimbursementdto-to-reimbursement';


// By status id
export async function daoGetReimbursementsByStatusId(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE status = $1 ORDER BY date_submitted DESC', [statusId]);
        //console.log(result.rows);
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
                Message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
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
                Message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

// post reimbursement - make a new Reimbursement
export async function daoPostReimbursement(reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('INSERT INTO project0_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, status, "type") values ($1,$2,$3,$4,$5,1,$6)',
            [reimbursement.author, reimbursement.amount, reimbursement.date_submitted, reimbursement.date_resolved, reimbursement.description, reimbursement.type]);

        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
            [reimbursement.author]);

        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

// update
export async function daoUpdateReimbursement(r: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        client.query('BEGIN');
       // console.log(r.reimbursementId);

        await client.query(`UPDATE project0_reimbursement.reimbursement SET author = $2, amount = $3, date_submitted = $4, date_resolved = $5, description = $6,
            resolver = $7, status = $8, type = $9 WHERE reimbursement_id = $1;`,
            [r.reimbursementId, r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);

        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement where reimbursement_id = $1',
            [r.reimbursementId]);

        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        console.log(e);

        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

// Reimbursement by Reimbursement Id
export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM project0_reimbursement.reimbursement WHERE reimbursement_id = $1',
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
        client && client.release();
    }
}

import { daoGetReimbursementsByStatusId, daoGetReimbursementsByUserId, daoPostReimbursement, daoUpdateReimbursement, daoGetReimbursementsByReimbursementId } from '../repositories/reimbursement-dao';


// status id
export function getReimbursementsByStatusId(statusId: number) {
    try {
        return daoGetReimbursementsByStatusId(statusId);
    } catch (e) {
        throw e;
    }
}

// get user id
export function getReimbursementsByUserId(userId: number) {
    try {
        return daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }
}

// post reimbursement
export function postReimbursement(post) {
    try {
        return daoPostReimbursement(post);
    } catch (e) {
        throw e;
    }
}

//patch
export async function patchReimbursement(patch) {
    try {
        const post = await daoGetReimbursementsByReimbursementId(patch.reimbursementId);
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key];
            }
        }
        console.log(post);
        return await daoUpdateReimbursement(post);
    } catch (e) {
        throw e;
    }
}


// Reimbursement id
export function getReimbursementsByReimbursementId(reimbursementid) {
    try {
        return daoGetReimbursementsByReimbursementId(reimbursementid);
    } catch (e) {
        throw e;
    }
}

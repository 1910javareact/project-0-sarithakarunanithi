export function daoGetAllPosts(): Post[] {
    return posts;
}
// save post

// find post by id
export function daoFindPostById(id: number): Post {
    for (const p of posts) {
        if (p.id === id) {
            return p;
        }
    }
    throw {
        status: 404,
        message: 'No Such Post'
    };
}

// update post
export function daoUpdatePost(post: Post) {
    const newPosts = [...posts];
    for (let i = 0 ; i < newPosts.length; i++) {
        if (newPosts[i].id === post.id) {
            newPosts[i] = post;
        }
    }
}
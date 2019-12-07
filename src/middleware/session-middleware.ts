import session from 'express-session';

// initial config of session
const sess = {
    secret: 'secret',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
};

// use it in index.ts
export const sessionMiddleware = session(sess); 
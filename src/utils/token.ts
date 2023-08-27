import jwt from 'jsonwebtoken';
import Debug from 'debug';
import { SECRET_KEY } from '@config';

const debug = Debug('http');



const tokenData = {
    encodeToken: (id, username, email) => {
        const payload = { id, username, email};
        const option = { expiresIn: '1d' };
        const secret = SECRET_KEY
        return jwt.sign(payload, secret, option);
    },
};

export default tokenData
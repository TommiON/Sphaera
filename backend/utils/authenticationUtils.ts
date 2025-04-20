import jsonwebtoken from 'jsonwebtoken';

import environment from '../config/environment';

export const generateTokenForUser = (username: string): string => {
    const userForToken = { name: username };
    
    return jsonwebtoken.sign(userForToken, environment.tokenSecret as string);
}
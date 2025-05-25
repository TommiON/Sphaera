import jsonwebtoken from 'jsonwebtoken';

import environment from '../config/environment';

export const generateAuthenticationToken = (username: string, clubId: number | undefined): string => {
    const authenticatedEntity = {
        username: username,
        clubId: clubId
    };
    
    return jsonwebtoken.sign(authenticatedEntity, environment.tokenSecret as string);
}
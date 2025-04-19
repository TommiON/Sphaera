export type ValidationError =
    // uusi käyttäjä
    'USERNAME_INSUFFICIENT'     |
    'PASSWORD_INSUFFICIENT'     |
    'USERNAME_ALREADY_TAKEN'    |
    'CLUBNAME_INSUFFICIENT'     |
    'CLUBNAME_ALREADY_TAKEN'    |
    
    // autentikointi
    'USERNAME_NOT_FOUND'        |
    'PASSWORD_DOES_NOT_MATCH';
    
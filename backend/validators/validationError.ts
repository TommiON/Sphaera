export type ValidationError =
    // uusi käyttäjä
    'USERNAME_INSUFFICIENT'         |
    'PASSWORD_INSUFFICIENT'         |
    'USERNAME_ALREADY_TAKEN'        |
    'CLUBNAME_INSUFFICIENT'         |
    'CLUBNAME_ALREADY_TAKEN'        |
    
    // sisäänkirjautuminen
    'USERNAME_NOT_FOUND'            |
    'PASSWORD_DOES_NOT_MATCH'       |

    // kutsun JsonWebToken
    'TOKEN_MISSING'                 |
    'TOKEN_MALFORMATTED'            |
    'TOKEN_DOES_NOT_MATCH'          |

    // pyynnön kohteen tarkistus
    'UNAUTHORIZED'                  |
    'URL_PARAMETER_MALFORMATTED';
    
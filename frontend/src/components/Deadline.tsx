import React from "react";

const Deadline = ( { entry }) => {

    let description;
    switch (entry.kind) {
        case 'finances':
            description = 'Budjetti'
        case 'training':
            description = 'Harjoittelu'
        case 'transfer':
            description = 'Pelaajasiirrot'
        case 'match':
            description = 'Seuraava ottelu'
        default:
            description = 'täh'
    }

    return(
        <div>
            <p>{description}</p>
        </div>
    )
}

export default Deadline;
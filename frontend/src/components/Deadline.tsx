import React from "react";

import { formatDeadline } from "../utils/timeUtils";

const Deadline = ( { entry }) => {

    let description;
    switch (entry.kind) {
        case 'finances':
            description = 'Budjetti';
            break;
        case 'training':
            description = 'Harjoittelu';
            break;
        case 'transfer':
            description = 'Pelaajasiirrot';
            break;
        case 'match':
            description = 'Ottelu';
            break;
    }

    return(
        <div>
            <p><a href="#">{description}</a> {formatDeadline(entry.due)} </p>
        </div>
    )
}

export default Deadline;
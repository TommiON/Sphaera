import React from "react";

import { formatDeadline } from "../utils/timeUtils";
import { DeadlineData } from "../types/DeadlineData";

const Deadline = (entry: DeadlineData) => {

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
        default:
            description = '';
    }

    return(
        <div>
            <p><a href="#">{description}</a> {formatDeadline(entry.due)} </p>
        </div>
    )
}

export default Deadline;
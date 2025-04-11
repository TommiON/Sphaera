import axios from "axios";
import { useState, useEffect } from "react";

import Deadline from "./Deadline";
import { FETCH_INTERVAL_IN_MILLISECONDS } from "../utils/constants";

const Deadlines = () => {
    
    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/calendar/week`)
            .then(result => setWeeklySchedule(result.data.deadlines))
            .catch(error => console.log('Virhe haettaessa deadlineja: ', error));
        },
    [fetchTrigger]);

    setInterval(() => {
        setFetchTrigger(!fetchTrigger);
    }, FETCH_INTERVAL_IN_MILLISECONDS)

    return(
        <div>
            <h4>Määräajat</h4>
            {weeklySchedule.map(entry => <Deadline entry={entry}/> )}
        </div>
        
    )

}

export default Deadlines;
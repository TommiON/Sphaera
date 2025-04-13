import axios from "axios";
import { useState, useEffect } from "react";

import Deadline from "./Deadline";
import { DeadlineData } from "../types/DeadlineData";
import { FETCH_INTERVAL_IN_MILLISECONDS, BACKEND_BASE_URL } from "../utils/constants";

const Deadlines = () => {
    
    const [weeklySchedule, setWeeklySchedule] = useState<DeadlineData[]>([]);
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/calendar/week`)
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
            {weeklySchedule.map(entry => <Deadline {...entry}/> )}
        </div>
        
    )

}

export default Deadlines;
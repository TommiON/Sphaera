import axios from "axios";
import { useState, useEffect } from "react";
import Deadline from "./Deadline";

const Deadlines = () => {
    
    const [weeklySchedule, setWeeklySchedule] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/calendar/week`)
            .then(result => setWeeklySchedule(result.data.deadlines))
            .catch(error => console.log('Virhe haettaessa deadlineja: ', error));
        },
    []);

    return(
        <div>
            <h4>Määräajat</h4>
            {weeklySchedule.map(entry => <Deadline entry={entry}/> )}
        </div>
        
    )

}

export default Deadlines;
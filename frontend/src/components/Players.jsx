import axios from 'axios';
import { useEffect } from 'react';

const Players = () => {
    console.log('no mitä vittua!')
    let playerdata;
    useEffect(() => {
        axios.get('http://localhost:3000/api/club/players', { params: { "clubId": 2 } })
            .then(result => {
                playerdata = result
                console.log('tuleeks täältä jotain?', playerdata)
            });
    })

    return(
        <div>
            <h1>Pelaajat</h1>
        </div>
    )
}

export default Players




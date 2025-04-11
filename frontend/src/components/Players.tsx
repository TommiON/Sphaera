import axios from 'axios';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

import Player from './Player';

const Players = ({clubId}: {clubId: number}) => {
    
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/club/${clubId}/players`)
            .then(result => setPlayers(result.data))
            .catch(error => console.log('Virhe haettaessa pelaajia: ', error));
        },
    []);

    return(
        <Stack>
            <h4>Pelaajat</h4>
            {players.map(player => <Player playerData={player} key={player.id} />)}
        </Stack>
    )
}

export default Players




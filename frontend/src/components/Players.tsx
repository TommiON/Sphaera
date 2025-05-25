import axios from 'axios';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

import Player from './Player';
import { PlayerData } from '../types/PlayerData';
import { getPlayersForClub } from '../services/PlayerServices';

const Players = ({clubId}: {clubId: number}) => {
    
    const [players, setPlayers] = useState<PlayerData[]>([]);

    useEffect(() => {
        getPlayersForClub(clubId)
            .then(result => {
                console.log('Millaiset pelaajat tulee?', result)
                setPlayers(result);
            })
            .catch(error => console.log('Virhe haettaessa pelaajia:', error))
        /*
        axios.get(`${BACKEND_BASE_URL}/club/${clubId}/players`)
            .then(result => {
                setPlayers(result.data);
            })
            .catch(error => console.log('Virhe haettaessa pelaajia: ', `${BACKEND_BASE_URL}/club/${clubId}/players`, error));
                 */
        },
    []);

    return(
        <Stack>
            <h4>Pelaajat</h4>
            {players.map(player => <Player {...player} key={player.id} />)}
        </Stack>
    )
}

export default Players




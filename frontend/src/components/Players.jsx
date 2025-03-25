import axios from 'axios';
import { useState, useEffect } from 'react';
import Player from './Player';

const Players = ({ clubId }) => {
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/club/${clubId}/players`)
            .then(result => {
                setPlayers(result.data);
            });
    }, []);

    return(
        <div>
            <h1>Pelaajat</h1>
            {players.map(player => <Player playerData={player} key={player.id} />)}
        </div>
    )
}

export default Players




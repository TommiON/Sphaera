import React, { useState } from 'react';

const Player = ({ playerData }) => {
    const [minified, setMinified] = useState<boolean>(true);

    const fullTextForFootedness = (footedness: string) => {
        switch (footedness) {
            case 'left':
                return 'left-footed';
            case 'right':
                return 'right-footed';
            case 'both':
                return 'both-footed';
            default:
                return '';
        }
    }

    if (minified) {
        return(
            <div>
                #{playerData.playingNumber} {playerData.name}
                <button onClick={() => setMinified(!minified)}>
                    ...
                </button>
            </div>
        )
    } else {
        return(
            <div>
                #{playerData.playingNumber} {playerData.name}
                <button onClick={() => setMinified(!minified)}>
                    ^
                </button>
                <table>
                    <tbody>
                    <tr>
                        <th>Stamina</th>
                        <th>{playerData.stamina}</th>
                        <th>Ruggedness</th>
                        <th>{playerData.ruggedness}</th>
                        <th>Pace</th>
                        <th>{playerData.pace}</th>
                    </tr>
                    <tr>
                        <th>
                            {fullTextForFootedness(playerData.footedness)}
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Player;
import React, { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

import { PlayerData } from '../types/PlayerData';

const Player = (playerData: PlayerData) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

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

    return(
        <div>
            #{playerData.playingNumber} <a onClick={() => setShowDetails(true)} href="#">{playerData.name}</a>

            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>#{playerData.playingNumber} {playerData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size="sm">
                        <tbody>
                            <tr>
                                <td><b>Physical skills</b></td>
                            </tr>
                            <tr>
                                <td>Stamina</td>
                                <td>{playerData.stamina}</td>
                                <td>{fullTextForFootedness(playerData.footedness)}</td>
                            </tr>
                            <tr>
                                <td>Ruggedness</td>
                                <td>{playerData.ruggedness}</td>
                            </tr>
                            <tr>
                                <td>Pace</td>
                                <td>{playerData.pace}</td>
                            </tr>
                            <td><b>Tactical and mental skills</b></td>
                            <tr>
                                <td>Vision</td>
                                <td>{playerData.vision}</td>
                            </tr>
                            <tr>
                                <td>Positioning</td>
                                <td>{playerData.positioning}</td>
                            </tr>
                            <tr>
                                <td>Experience</td>
                                <td>{playerData.experience}</td>
                            </tr>
                            <td><b>Technical skills</b></td>
                            <tr>
                                <td>Heading</td>
                                <td>{playerData.heading}</td>
                            </tr>
                            <tr>
                                <td>Shooting</td>
                                <td>{playerData.shooting}</td>
                            </tr>
                            <tr>
                                <td>Short passing</td>
                                <td>{playerData.shortPassing}</td>
                            </tr>
                            <tr>
                                <td>Long passing</td>
                                <td>{playerData.longPassing}</td>
                            </tr>
                            <tr>
                                <td>Ball control</td>
                                <td>{playerData.ballControl}</td>
                            </tr>
                            <tr>
                                <td>Tackling</td>
                                <td>{playerData.tackling}</td>
                            </tr>
                            <tr>
                                <td>Goalkeeping</td>
                                <td>{playerData.goalkeeping}</td>
                            </tr>
                            <tr>
                                <td>Dribbling</td>
                                <td>{playerData.dribbling}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Player;
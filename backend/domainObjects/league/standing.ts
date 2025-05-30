import Club from "../club/club";

export default interface Standing {
    team: Club;
    
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}
import Footedness from "./footedness";

export default interface Player {
    name: string;
    birthday: Date;

    footedness: Footedness;

    stamina: number;
    ruggedness: number;
    pace: number;

    /*
    vision: number;
    positioning: number;
    experience: number;

    heading: number;
    shooting: number;
    shortPassing: number;
    longPassing: number;
    ballControl: number;
    tackling: number;
    goalkeeping: number;
    dribbling: number;
    */
}
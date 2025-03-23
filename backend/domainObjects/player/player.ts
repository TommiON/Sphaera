import Footedness from "./footedness";
import Trait from "./trait";

export default interface Player {
    name: string;
    birthday: Date;
    playingNumber: number;

    footedness: Footedness;

    stamina: number;
    ruggedness: number;
    pace: number;

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

    traits: Trait[];
}
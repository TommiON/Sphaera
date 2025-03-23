import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

import ClubEntity from "./club.entity";
import Footedness from "../domainObjects/player/footedness";

@Entity('player')
class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    birthday: Date

    @Column()
    footedness: Footedness

    @Column()
    stamina: number

    @Column()
    ruggedness: number

    @Column()
    pace: number

    @Column()
    vision: number;
    
    @Column()
    positioning: number;
    
    @Column()
    experience: number;

    @Column()
    heading: number;
    
    @Column()
    shooting: number;
    
    @Column()
    shortPassing: number;
    
    @Column()
    longPassing: number;
    
    @Column()
    ballControl: number;
    
    @Column()
    tackling: number;
    
    @Column()
    goalkeeping: number;
    
    @Column()
    dribbling: number;

    @Column({nullable: true})
    trait: string;

    @ManyToOne(() => ClubEntity, (club) => club.players)
    club: ClubEntity;
}

export default PlayerEntity;
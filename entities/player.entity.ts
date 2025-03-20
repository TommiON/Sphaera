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

    @ManyToOne(() => ClubEntity, (club) => club.players)
    club: ClubEntity;
}

export default PlayerEntity;
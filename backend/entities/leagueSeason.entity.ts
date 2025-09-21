import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm"; 
import ClubEntity from "./club.entity";

@Entity('leagueseason')
class LeagueSeasonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ordinal: number;

    @OneToMany(() => ClubEntity, (team) => team.leagueSeason)
    teams: [ClubEntity];

    /*
    @OneToMany()
    ottelut
    */

    @Column()
    started: boolean;

    @Column()
    finished: boolean;
}

export default LeagueSeasonEntity;
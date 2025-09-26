import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn, ManyToMany } from "typeorm"; 
import ClubEntity from "./club.entity";

@Entity('leagueseason')
class LeagueSeasonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ordinal: number;

    @ManyToMany(() => ClubEntity, (team) => team.leagueSeason)
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
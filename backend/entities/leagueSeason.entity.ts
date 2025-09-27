import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn, ManyToMany } from "typeorm"; 
import ClubEntity from "./club.entity";
import MatchEntity from "./match.entity";

@Entity('leagueseason')
class LeagueSeasonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ordinal: number;

    @ManyToMany(() => ClubEntity, (team) => team.leagueSeason)
    teams: [ClubEntity];

    @OneToMany(() => MatchEntity, (match) => match.leagueSeason)
    matches: [MatchEntity];

    @Column()
    started: boolean;

    @Column()
    finished: boolean;
}

export default LeagueSeasonEntity;
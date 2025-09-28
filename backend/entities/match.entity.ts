import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import ClubEntity from "./club.entity";
import LeagueSeasonEntity from "./leagueSeason.entity";

@Entity('match')
class MatchEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week: number

    @ManyToOne(() => ClubEntity)
    @JoinColumn()
    homeTeam: ClubEntity

    @ManyToOne(() => ClubEntity)
    @JoinColumn()
    awayTeam: ClubEntity

    @ManyToOne(() => LeagueSeasonEntity, (leagueseason) => leagueseason.matches)
    leagueSeason: LeagueSeasonEntity;

    @Column()
    started: boolean

    @Column()
    ended: boolean

    /*
    @OneToMany
    events
    */
}

export default MatchEntity;
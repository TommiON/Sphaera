import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import PlayerEntity from "./player.entity";
import UserAccountEntity from "./userAccount.entity";
import LeagueSeasonEntity from "./leagueSeason.entity";

@Entity('club')
class ClubEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    established: Date;

    @OneToOne(() => UserAccountEntity)
    @JoinColumn()
    account: UserAccountEntity

    @OneToMany(() => PlayerEntity, (player) => player.club)
    players: [PlayerEntity];

    @ManyToMany(() => LeagueSeasonEntity, (leagueSeason) => leagueSeason.teams)
    @JoinTable({name: 'club_leagueseason'})
    leagueSeason: LeagueSeasonEntity;
}

export default ClubEntity;
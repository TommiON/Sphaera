import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import PlayerEntity from "./player.entity";
import UserAccountEntity from "./userAccount.entity";

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
}

export default ClubEntity;
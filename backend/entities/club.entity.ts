import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import PlayerEntity from "./player.entity";

@Entity('club')
class ClubEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    established: Date ;

    @OneToMany(() => PlayerEntity, (player) => player.club)
    players: [PlayerEntity];
}

export default ClubEntity;
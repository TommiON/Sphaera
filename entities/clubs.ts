import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import Player from "./players";

@Entity()
class Club {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    established: Date ;

    @OneToMany(() => Player, (player) => player.club)
    players: [Player];
}

export default Club;
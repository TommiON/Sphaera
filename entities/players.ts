import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Club from "./clubs";

@Entity()
class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @ManyToOne(() => Club, (club) => club.players)
    club: Club;
}

export default Player;
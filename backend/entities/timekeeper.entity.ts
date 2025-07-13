import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity('timekeeper')
class TimekeeperEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    season: number;

    @Column()
    week: number;

    @Column()
    financesDone: boolean;

    @Column()
    transferDone: boolean;

    @Column()
    trainingDone: boolean;

    @Column()
    matchDone: boolean;
}

export default TimekeeperEntity
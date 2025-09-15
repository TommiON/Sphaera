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
    finances: boolean;

    @Column()
    transfer: boolean;

    @Column()
    training: boolean;

    @Column()
    match: boolean;

    @Column()
    lastWeekEnd: Date;
}

export default TimekeeperEntity
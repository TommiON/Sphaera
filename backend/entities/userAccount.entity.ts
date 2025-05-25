import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity('account')
class UserAccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}

export default UserAccountEntity;
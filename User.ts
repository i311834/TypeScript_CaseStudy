import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length : 25
    })
    firstname!: string

    
    @Column({
        length : 25
    })
    lastname!: string

}


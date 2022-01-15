import { Entity, BaseEntity, Column, PrimaryColumn , CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('Users')
export class Users extends BaseEntity{
    
    @PrimaryColumn()
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    age: number

    @Column({
        default: false
    })
    isEnrolled: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
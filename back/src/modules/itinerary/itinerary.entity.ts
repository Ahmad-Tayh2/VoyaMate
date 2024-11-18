import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable} from 'typeorm';
import { User } from '../user/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity("itineraries")

export class Itinerary{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique:true })
    name:string;

    @Column()
    description:string;

    @Column({ nullable:true })
    budget?:number;

    @ManyToOne(()=>User, (user)=>user.ownerItIneraries)
    @Expose()
    owner:User;

    @ManyToMany(()=>User, (user)=>user.memberItineraries)
    @JoinTable()
    @Exclude()
    members:User[];

    @CreateDateColumn({type:'timestamp'})
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp'})
    updatedAt:Date;
}


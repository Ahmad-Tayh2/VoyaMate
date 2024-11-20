
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./activity.entity";


@Entity('checkpoint')
export class Checkpoint{
    @PrimaryGeneratedColumn('uuid')
    checkpointid:string;
    @Column()
    location:string;
    @OneToMany(()=>(Activity),(Activity)=>Activity.checkpoint)
    activities:Activity[]


}
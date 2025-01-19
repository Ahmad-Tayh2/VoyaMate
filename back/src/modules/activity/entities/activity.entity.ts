import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Checkpoint } from "src/modules/checkpoint/checkpoint.entity";
@Entity('activities')
export class Activity {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    docurl:string;
    @Column()
    name:string;
    @Column({
    type:"text",
    })
    description:string
    @ManyToOne(()=>Checkpoint,(checkpoint)=>checkpoint.activities,{onDelete:'CASCADE'})
    checkpoint:Checkpoint;
}

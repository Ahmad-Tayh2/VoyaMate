import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Itinerary } from '../itinerary/itinerary.entity';
import { Exclude } from 'class-transformer';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany(()=>Itinerary, (itinerary)=>itinerary.owner)
  ownerItIneraries: Itinerary[];

  @ManyToMany(()=>Itinerary, (itinerary)=>itinerary.members)
  @Exclude() 
  memberItineraries: Itinerary[];

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

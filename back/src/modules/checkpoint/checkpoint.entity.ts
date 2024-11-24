import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Itinerary } from '../itinerary/itinerary.entity';

@Entity('checkpoints')
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itineraryId: number;

  @Column({ type: 'datetime' })
  plannedTime: Date;

  @Column({ default: false })
  checked: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.checkpoints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itineraryId' })
  itinerary: Itinerary;
}

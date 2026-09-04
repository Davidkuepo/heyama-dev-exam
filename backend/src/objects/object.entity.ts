import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('objects')
export class HeyamaObject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  imageData: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'uuid' })
  userId: string;
}

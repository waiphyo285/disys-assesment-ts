import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['shortCode'], { unique: true })
export class ShortUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 10 })
  shortCode: string;

  @Column({ nullable: false })
  fullUrl: string;

  @Column({ default: 0 })
  hitCount: number;

  @Column({ default: false })
  isExpired: boolean;

  @Column('datetime')
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

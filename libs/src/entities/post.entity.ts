import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'title',
    length: 15,
    comment: '게시글 제목',
  })
  title: string;

  @Column('text', {
    name: 'context',
    nullable: true,
    comment: '게시글 내용',
  })
  context: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('varchar', {
    name: 'userId',
    length: 36,
    unique: true,
    comment: '[fk] 유저ID',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.post, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

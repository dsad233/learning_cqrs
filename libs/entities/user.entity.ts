import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetail } from './userDetail.entity';
import { STATUS } from 'libs/enums';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'email',
    length: 30,
    unique: true,
    comment: '이메일',
  })
  email: string;

  @Column('varchar', { name: 'password', length: 64, comment: '패스워드' })
  password: string;

  @Column('varchar', {
    name: 'name',
    length: 10,
    nullable: true,
    comment: '이름',
  })
  name?: string;

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

  @Column('enum', {
    name: 'verified',
    enum: STATUS.BooleanStatus,
    default: STATUS.BooleanStatus.FALSE,
    comment: '이메일 인증 여부',
  })
  verified: STATUS.BooleanStatus;

  @OneToOne(() => UserDetail)
  @JoinColumn()
  userDetail: UserDetail;
}

import { TYPE } from '@libs/.//enums';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'user_details',
})
export class UserDetail {
  constructor(
    nickname: string | null,
    gender: number | null,
    birth: Date | null,
  ) {
    this.nickname = nickname;
    this.gender = gender;
    this.birth = birth;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'nickname',
    length: 8,
    unique: true,
    nullable: true,
    comment: '닉네임',
  })
  nickname?: string;

  @Column('enum', {
    name: 'gender',
    enum: TYPE.GenderEnum,
    nullable: true,
    comment: '성별',
  })
  gender?: TYPE.GenderEnum;

  @Column('date', {
    name: 'birth',
    nullable: true,
    comment: '생년월일',
  })
  birth?: Date;

  @OneToOne(() => User, (user) => user.userDetail, {
    cascade: true,
  })
  user: User;
}

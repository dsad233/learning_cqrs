import { TYPE } from 'libs/enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user_details',
})
export class UserDetail {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'nickname',
    length: 8,
    unique: true,
    nullable: true,
    comment: '닉네임',
  })
  nickname: string;

  @Column('enum', {
    name: 'gender',
    enum: TYPE.GenderEnum,
    nullable: true,
    comment: '성별',
  })
  gender: TYPE.GenderEnum;

  @Column('date', {
    name: 'birth',
    nullable: true,
    comment: '생년월일',
  })
  birth: Date;
}

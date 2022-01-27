import { BaseEntity } from 'src/entities/BaseEntity';
import { Column, Entity } from 'typeorm';
import { Action } from './actions.enum';
import { Subject } from './subjects.enum';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;

  @Column({
    type: 'enum',
    enum: Subject,
  })
  subject: Subject;
}

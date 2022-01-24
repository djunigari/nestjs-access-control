import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';

import { Role } from './Role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];
}

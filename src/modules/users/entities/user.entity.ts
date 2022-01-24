import { BaseEntity } from 'src/entities/BaseEntity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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

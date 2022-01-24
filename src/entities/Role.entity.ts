import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];
}

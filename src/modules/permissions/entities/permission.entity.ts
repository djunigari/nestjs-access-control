import { BaseEntity } from 'src/entities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

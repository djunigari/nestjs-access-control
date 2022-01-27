import { Action } from '../entities/actions.enum';
import { Subject } from '../entities/subjects.enum';

export interface ICreatePermissionDto {
  action: Action;
  subject: Subject;
}

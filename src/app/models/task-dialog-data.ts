import { ITask } from './task';
import { IUser } from './user';

export interface ITaskDialogData {
  task: ITask | null;
  users: IUser[];
}

import { IUser } from './user';

export type TTaskStatus = 'todo' | 'in_progress' | 'done';
export type TTaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate: string;
  assignee: IUser;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isOverdue?: boolean;
  completedAt?: string;
}

export const STATUS_LABELS: Record<TTaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
};

export const STATUS_COLORS: Record<TTaskStatus, string> = {
  todo: 'bg-sky-300/50',
  in_progress: 'bg-yellow-200/50',
  done: 'bg-emerald-200/50',
};

export const PRIORITY_LABELS: Record<TTaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

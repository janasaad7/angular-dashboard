import { computed, inject, Injectable, signal } from '@angular/core';
import { ITask, TTaskStatus } from '../models/task';
import { generateId } from '../utils/helpers';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  #http = inject(HttpClient);
  #tasks = signal<ITask[]>([]);
  #users = signal<IUser[]>([]);
  #statistics = signal<any[]>([]);

  users = this.#users.asReadonly();
  statistics = this.#statistics.asReadonly();

  todoTasks = computed(() => this.#tasks().filter(t => t.status === 'todo'));
  inProgressTasks = computed(() => this.#tasks().filter(t => t.status === 'in_progress'));
  doneTasks = computed(() => this.#tasks().filter(t => t.status === 'done'));

  taskStats = computed(() => ({
    total: this.#tasks().length,
    todo: this.todoTasks().length,
    inProgress: this.inProgressTasks().length,
    done: this.doneTasks().length,
    overdue: this.#tasks().filter(task => task.isOverdue && task.status !== 'done').length,
  }));

  tasksByDay = computed(() => {
    const map = new Map<string, number>();
    this.#tasks().forEach(t => {
      const day = new Date(t.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      map.set(day, (map.get(day) ?? 0) + 1);
    });

    return new Map([...map.entries()].sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    }));
  });

  constructor() {
    this.#loadTasks();
    this.#loadUsers();
    this.#loadStatistics();
  }

  #loadTasks(): void {
    this.#http.get<{ tasks: ITask[] }>('data-fetching/tasks.json')
      .subscribe(response => {
        this.#tasks.set(response.tasks);
      });
  }

  #loadUsers(): void {
    this.#http.get<{ users: IUser[] }>('data-fetching/users.json')
      .subscribe(response => this.#users.set(response.users));
  }

  #loadStatistics(): void {
    this.#http.get<{ statistics: any[] }>('data-fetching/statistics.json')
      .subscribe(response => this.#statistics.set(response.statistics));
  }

  getTaskById(id: string): ITask | undefined {
    return this.#tasks().find(t => t.id === id);
  }

  addTask(data: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>): ITask {
    const now = new Date().toISOString();
    const task: ITask = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    this.#tasks.update(tasks => [...tasks, task]);
    return task;
  }

  updateTask(id: string, changes: Partial<Omit<ITask, 'id' | 'createdAt'>>): void {
    const now = new Date().toISOString();
    this.#tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, ...changes, updatedAt: now } : t)
    );
  }

  deleteTask(id: string): void {
    this.#tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  moveTask(id: string, status: TTaskStatus, toIndex: number): void {
    const changes: Partial<ITask> = { status };
    if (status === 'done') changes.completedAt = new Date().toISOString();

    this.#tasks.update(tasks => {
      const task = tasks.find(t => t.id === id)!;
      const updated = { ...task, ...changes };
      const without = tasks.filter(t => t.id !== id);

      const targetTasks = without.filter(t => t.status === status);
      const otherTasks = without.filter(t => t.status !== status);

      targetTasks.splice(toIndex, 0, updated);
      return [...otherTasks, ...targetTasks];
    });
  }

  reorderTasks(status: TTaskStatus, reordered: ITask[]): void {
    this.#tasks.update(tasks => {
      const others = tasks.filter(t => t.status !== status);
      return [...others, ...reordered];
    });
  }
}

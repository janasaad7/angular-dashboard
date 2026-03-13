import { computed, inject, Injectable, signal } from '@angular/core';
import { ITask, TTaskStatus } from '../models/task';
import { generateId } from '../utils/helpers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  #http = inject(HttpClient);
  #tasks = signal<ITask[]>([]);

  tasks = this.#tasks.asReadonly();

  todoTasks = computed(() => this.#tasks().filter(t => t.status === 'todo'));
  inProgressTasks = computed(() => this.#tasks().filter(t => t.status === 'in_progress'));
  doneTasks = computed(() => this.#tasks().filter(t => t.status === 'done'));

  taskStats = computed(() => ({
    total: this.#tasks().length,
    todo: this.todoTasks().length,
    inProgress: this.inProgressTasks().length,
    done: this.doneTasks().length,
    overdue: this.#tasks().filter(t => t.isOverdue && t.status !== 'done').length,
  }));

  constructor() {
    this.#loadTasks();
  }

  #loadTasks(): void {
    this.#http.get<{ tasks: ITask[] }>('data-fetching/tasks.json')
      .subscribe(response => {
        this.#tasks.set(response.tasks);
      });
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

  moveTask(id: string, status: TTaskStatus): void {
    const changes: Partial<ITask> = { status };
    if (status === 'done') changes.completedAt = new Date().toISOString();
    this.updateTask(id, changes);
  }
}

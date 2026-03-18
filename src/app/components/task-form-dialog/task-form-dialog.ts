import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask, PRIORITY_LABELS, STATUS_LABELS, TASK_PRIORITIES, TASK_STATUSES } from '../../models/task';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/input';
import { ITaskDialogData } from '../../models/task-dialog-data';

@Component({
  selector: 'app-task-form-dialog',
  imports: [ReactiveFormsModule, MatError],
  templateUrl: './task-form-dialog.html',
  styleUrl: './task-form-dialog.scss',
})
export class TaskFormDialogComponent {
  dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  data = inject<ITaskDialogData>(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  isEditMode = !!this.data.task;

  statuses = TASK_STATUSES;
  priorities = TASK_PRIORITIES;
  statusLabels = STATUS_LABELS;
  priorityLabels = PRIORITY_LABELS;

  form = this.fb.group({
    title: [this.data.task?.title ?? '', [Validators.required, Validators.maxLength(80)]],
    description: [this.data.task?.description ?? ''],
    status: [this.data.task?.status ?? 'todo', Validators.required],
    priority: [this.data.task?.priority ?? 'medium', Validators.required],
    dueDate: [this.data.task?.dueDate ?? '', Validators.required],
    assigneeId: [this.data.task?.assignee?.id ?? '', Validators.required],
  });

  tags = signal<string[]>(this.data.task?.tags ?? []);
  tagInput = signal<string>('');

  addTag(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const value = this.tagInput().trim();
    if (value && !this.tags().includes(value)) {
      this.tags.update(tags => [...tags, value]);
    }
    this.tagInput.set('');
  }

  removeTag(tag: string): void {
    this.tags.update(tags => tags.filter(t => t !== tag));
  }

  onTagInput(event: Event): void {
    this.tagInput.set((event.target as HTMLInputElement).value);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const assignee = this.data.users.find(u => u.id === formValue.assigneeId)!;

    this.dialogRef.close({
      ...formValue,
      tags: this.tags(),
      assignee,
    });
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}

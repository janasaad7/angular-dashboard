import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask, PRIORITY_LABELS, STATUS_LABELS, TASK_PRIORITIES, TASK_STATUSES } from '../../models/task';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/input';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [ReactiveFormsModule, MatError],
  templateUrl: './edit-task-dialog.html',
  styleUrl: './edit-task-dialog.scss',
})
export class EditTaskDialogComponent {
  dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);
  data = inject<ITask>(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  statuses = TASK_STATUSES;
  priorities = TASK_PRIORITIES;
  statusLabels = STATUS_LABELS;
  priorityLabels = PRIORITY_LABELS;

  form = this.fb.group({
    title: [this.data.title, [Validators.required, Validators.maxLength(80)]],
    description: [this.data.description],
    status: [this.data.status, Validators.required],
    priority: [this.data.priority, Validators.required],
    dueDate: [this.data.dueDate, Validators.required],
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}

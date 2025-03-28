import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { TaskInterface } from '../task.interface';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})

export class TaskCardComponent {

  @Input()
  item!: TaskInterface; 
  firebase = inject(FirebaseService);
  completedSubtasks: number = 0;

  getCompletedPercentage(): number {
    if (!this.item.subtasks || this.item.subtasks.length === 0) {
      return 0;
    }
    this.completedSubtasks = this.item.subtasks.filter(subtask => subtask.isCompleted).length;
    return (this.completedSubtasks / this.item.subtasks.length) * 100;
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskInterface } from '../task.interface';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule, EditDialogComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 firebase = inject(FirebaseService);
   @Output() closeDialogEvent = new EventEmitter<void>();
   @Input() item?: TaskInterface;
   private cdr = inject(ChangeDetectorRef); // ChangeDetector für UI-Updates

   selectedItem?: TaskInterface;
   isDialogOpen: boolean = false;

   deleteTask() {
    if (this.item?.id) {
      this.firebase.deleteTaskFromData(this.item.id);
      this.closeDialogEvent.emit();
      this.closeDialog();
      }
  }
  
   formatDate(date: string | Date | undefined): string {
    if (!date) return ''; // Falls kein Datum vorhanden ist
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB'); // Ausgabe im Format DD/MM/YYYY
  }
  

   updateSubtaskStatus(taskId: string | undefined, subtaskIndex: number) {
    if (!this.item?.id || !this.item?.subtasks) return;

    // Status der Subtask umkehren
    this.item.subtasks[subtaskIndex].isCompleted = !this.item.subtasks[subtaskIndex].isCompleted;

    // UI sofort aktualisieren
    this.cdr.detectChanges();
    this.firebase.updateTaskStatus(this.item.id, { subtasks: this.item.subtasks, status: this.item.status })
      .then(() => {
        console.log('Subtask updated successfully');
        this.cdr.detectChanges(); 
      })
      .catch((error) => console.error('Error updating subtask:', error));
}

  closeDialog() {
    this.closeDialogEvent.emit();
  }
  
  openEditDialog(item: TaskInterface){
    this.selectedItem = item;
    this.isDialogOpen = true;
  }
  
   closeEditDialog(){
    this.isDialogOpen = false; 
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

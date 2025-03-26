import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ChangeDetectorRef} from '@angular/core';
import { TaskInterface } from '../task.interface';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent{
  firebase = inject(FirebaseService);
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Input() item?: TaskInterface;

  isDialogOpen: boolean = false;
  selectedPriority: string = 'medium';
  hideInputIconTimeout: ReturnType<typeof setTimeout> | null = null;
  subtaskInputFocused: boolean = false;
  subtaskInput: string = '';
  subtasks: { name: string, isCompleted: boolean }[] = []; // Array für Subtasks
  dropdownVisible: boolean = false;
  checkboxActive = false;

  assignContact(contactId: string) {
    this.checkboxActive = !this.checkboxActive;
    this.item?.assignedToUserId?.push(contactId);
    console.log(this.item?.assignedToUserId);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  ngOnInit() {
    if (this.item?.priority) {
      this.selectedPriority = this.item.priority;  // Setze gespeicherte Priorität
    }
  
    // Stelle sicher, dass 'subtasks' immer ein Array ist
    if (!this.item?.subtasks) {
      this.item!.subtasks = []; // Initialisiere 'subtasks' als leeres Array, falls nicht vorhanden
    }
  }
  
  selectPriority(priority: string) {
    this.selectedPriority = priority;
    if (this.item) {
      this.item.priority = priority; // Aktualisiere das Item
    }
  }

  saveEditedTask(taskForm: NgForm) {
    if (this.item?.id && this.item?.date) {
      console.log('Vor Update:', this.item.date); // Debugging
  
      this.firebase.updateTaskStatus(this.item.id, {
        title: this.item.title,
        description: this.item.description,
        date: this.item.date,  
        priority: this.selectedPriority,  
        assignedToUserId: this.item.assignedToUserId,
        status: this.item.status,
        category: this.item.category,
        subtasks: this.item.subtasks
      }).then(() => {
        console.log('Nach Update:', this.item?.date); // Debugging
        console.log('Aufgabe erfolgreich aktualisiert!');
        this.closeDialog();
      }).catch((error) => {
        console.error('Fehler beim Aktualisieren:', error);
      });
    }
  }
  
  closeDialog() {
    this.closeDialogEvent.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

// subtaks

addSubtask() {
  if (this.subtaskInput.trim()) {
    const newSubtask = { subtask: this.subtaskInput.trim(), isCompleted: false };
    
    // Wenn 'this.item' und 'subtasks' vorhanden sind, füge Subtask hinzu
    if (this.item && this.item.subtasks) {
      this.item.subtasks.push(newSubtask);
    } else {
      console.error('Item or subtasks is undefined');
    }
    this.subtaskInput = ''; // Eingabefeld leeren
  }
}


removeSubtask(index: number) {
  this.subtasks.splice(index, 1); // Subtask entfernen
}

editSubtask(index: number) {
  this.subtasks[index].isCompleted = true;
  setTimeout(() => {
    const inputElement = document.getElementById(`subtask-input-${index}`) as HTMLInputElement;
    inputElement?.focus();
  }, 0);
}

saveSubtask(index: number) {
  const inputElement = document.getElementById(`subtask-input-${index}`) as HTMLInputElement;
  if (inputElement && this.item?.subtasks) {
    // Hier 'subtask' statt 'name' verwenden
    this.item.subtasks[index].subtask = inputElement.value.trim();
    this.item.subtasks[index].isCompleted = false;
  }
}

handleKeyUp(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter') {
    this.saveSubtask(index);
  }
}


clearSubtaskInput() {
  this.subtaskInput = '';
  this.subtaskInputFocused = false;
}

focusSubtaskInput() {
  const subtaskInput = document.querySelector('.subtask-input') as HTMLInputElement;
  if (subtaskInput) {
    subtaskInput.focus();
  }
}

onSubtaskInputBlur() {
  this.hideInputIconTimeout = setTimeout(() => {
    this.subtaskInputFocused = false;
  }, 1000/2); // 2 seconds delay
}

onSubtaskInputFocus() {
  if (this.hideInputIconTimeout) {
    clearTimeout(this.hideInputIconTimeout);
  }
  this.subtaskInputFocused = true;
}

}

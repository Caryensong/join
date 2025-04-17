import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, orderBy, query, setDoc, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { ContactInterface } from '../../main-content/contacts/contact-interface';
import { TaskInterface } from '../../main-content/board/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { dummyData, dummyDataTasks, avatarColor } from './dummy-data';

/**
 * Service to interact with Firebase Firestore for managing contacts and tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  /**
   * Firestore instance injected into the service.
   */
  firebase = inject(Firestore);

  /**
   * BehaviorSubject to store the list of tasks.
   */
  private tasksListSubject: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);

  /**
   * Observable for the list of tasks.
   */
  tasksList$: Observable<TaskInterface[]> = this.tasksListSubject.asObservable();

  /**
   * List of contacts fetched from Firestore.
   */
  contactsList: ContactInterface[] = [];

  /**
   * Ordered list of contacts fetched from Firestore.
   */
  orderedContactsList: ContactInterface[] = [];

  /**
   * List of tasks fetched from Firestore.
   */
  tasksList: TaskInterface[] = [];

  /**
   * Categorized tasks: To-Do.
   */
  todo: TaskInterface[] = [];

  /**
   * Categorized tasks: In Progress.
   */
  inProgress: TaskInterface[] = [];

  /**
   * Categorized tasks: Awaiting Feedback.
   */
  awaitFeedback: TaskInterface[] = [];

  /**
   * Categorized tasks: Done.
   */
  done: TaskInterface[] = [];

  /**
   * Dummy contact data.
   */
  dummyData = dummyData;

  /**
   * Dummy task data.
   */
  dummyDataTasks = dummyDataTasks;

  /**
   * Array of avatar colors used for contacts.
   */
  avatarColor = avatarColor;

  /**
   * Unsubscribe function for Firestore listeners.
   */
  unsubscribe: Unsubscribe;

  /**
   * Unsubscribe function for ordered contact list listener.
   */
  unsubscribeOrderedList: Unsubscribe = () => {};

  constructor() {
    this.initializeContacts();
    this.initializeTasks();
    // Initialize Firestore listeners
    this.unsubscribe = this.orderedListQuery();
    this.unsubscribe = this.getTasksList();
  }

  /**
   * Cleanup Firestore listeners on service destruction.
   */
  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  //#region Fetch Contacts

  /**
   * Fetches an ordered list of contacts from Firestore.
   * @returns {Unsubscribe} Function to unsubscribe from the Firestore listener.
   */
  orderedListQuery(): Unsubscribe {
    const contactsRef = collection(this.firebase, "contacts");
    const q = query(contactsRef, orderBy('firstname'));
    return onSnapshot(q, (list) => {
      this.orderedContactsList = [];
      list.forEach(element => {
        this.orderedContactsList.push(this.setContactObject(element.id, element.data() as ContactInterface));
      });
    });
  }

  /**
   * Adds a new contact to Firestore.
   * @param {ContactInterface} contactsList - The contact to add.
   */
  async addContactToData(contactsList: ContactInterface) {
    await addDoc(collection(this.firebase, "contacts"), contactsList);
  }

  /**
   * Deletes a contact from Firestore.
   * @param {string} id - The ID of the contact to delete.
   */
  async deleteContactFromData(id: string) {
    await deleteDoc(doc(this.firebase, "contacts", id));
  }

  /**
   * Updates a contact in Firestore.
   * @param {string} id - The ID of the contact to update.
   * @param {ContactInterface} data - The updated contact data.
   */
  async editContactToDatabase(id: string, data: ContactInterface) {
    await updateDoc(doc(this.firebase, "contacts", id), {
      fullname: data.fullname,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
    });
  }

  /**
   * Creates a ContactInterface object from Firestore data.
   * @param {string} id - The ID of the contact.
   * @param {ContactInterface} obj - The Firestore data.
   * @returns {ContactInterface} The contact object.
   */
  setContactObject(id: string, obj: ContactInterface): ContactInterface {
    return {
      id: id,
      email: obj.email,
      fullname: obj.fullname,
      firstname: obj.firstname,
      lastname: obj.lastname,
      phone: obj.phone,
      color: obj.color,
    };
  }

  //#endregion

  //#region Fetch and Categorize Tasks

  /**
   * Fetches the list of tasks from Firestore.
   * @returns {Unsubscribe} Function to unsubscribe from the Firestore listener.
   */
  getTasksList(): Unsubscribe {
    return onSnapshot(collection(this.firebase, "tasks"), (taskObject) => {
      this.todo = [];
      this.inProgress = [];
      this.awaitFeedback = [];
      this.done = [];
      const tasksList: TaskInterface[] = [];

      taskObject.forEach((element) => {
        const task = this.setTaskObject(element.id, element.data() as TaskInterface);
        this.categorizeTask(task);
        tasksList.push(task);
      });
      this.tasksListSubject.next(tasksList);
    });
  }

  /**
   * Adds a new task to Firestore.
   * @param {TaskInterface} newTask - The task to add.
   */
  async addTaskToData(newTask: TaskInterface) {
    await addDoc(collection(this.firebase, "tasks"), newTask);
  }

  /**
   * Deletes a task from Firestore.
   * @param {string} id - The ID of the task to delete.
   */
  async deleteTaskFromData(id: string) {
    await deleteDoc(doc(this.firebase, "tasks", id));
  }

  /**
   * Updates the status of a task in Firestore.
   * @param {string} taskId - The ID of the task to update.
   * @param {Partial<TaskInterface>} updatedData - The updated task data.
   */
  async updateTaskStatus(taskId: string, updatedData: Partial<TaskInterface>) {
    const taskDocRef = doc(this.firebase, `tasks/${taskId}`);
    await updateDoc(taskDocRef, updatedData).catch((error) => {
      console.error(error);
    });
  }

  /**
   * Creates a TaskInterface object from Firestore data.
   * @param {string} id - The ID of the task.
   * @param {TaskInterface} obj - The Firestore data.
   * @returns {TaskInterface} The task object.
   */
  setTaskObject(id: string, obj: TaskInterface): TaskInterface {
    return {
      id: id,
      title: obj.title,
      description: obj.description,
      date: obj.date,
      priority: obj.priority,
      assignedToUserId: obj.assignedToUserId,
      status: obj.status,
      category: obj.category,
      subtasks: obj.subtasks,
    };
  }

  /**
   * Categorizes a task into one of the predefined categories.
   * @param {TaskInterface} task - The task to categorize.
   */
  categorizeTask(task: TaskInterface) {
    if (task.status === "todo") {
      this.todo.push(task);
    } else if (task.status === "awaitFeedback") {
      this.awaitFeedback.push(task);
    } else if (task.status === "inProgress") {
      this.inProgress.push(task);
    } else if (task.status === "done") {
      this.done.push(task);
    }
  }

  //#endregion






  // #region vorlage 
  async initializeContacts() {
    try {
      const contactsRef = collection(this.firebase, "contacts");
      this.dummyData.forEach(async (element) => {
        await setDoc(doc(contactsRef), {
          email: element.email,
          fullname: `${element.firstname} ${element.lastname}`,
          firstname: element.firstname,
          lastname: element.lastname,
          phone: element.phone,
          color: element.color,
        });
      })
      console.log('Contact initialized successfully');
    } catch (error) {
      console.error('Error initializing contact:', error);
    }
  }
// #endregion

//region Vorlage tasks
  async initializeTasks() {
    try {
          const tasksRef = collection(this.firebase, "tasks");
          this.dummyDataTasks.forEach(async (element) => {
            await setDoc(doc(tasksRef), {
              title: element.title,
              description: element.description,
              date: element.date,
              priority: element.priority,
              assignedToUserId: element.assignedToUserId,
              status: element.status,
              category: element.category,
              subtasks: element.subtasks,
            });
          })
          console.log('Tasks initialized successfully');
        } catch (error) {
          console.error('Error initializing task:', error);
        }
  }
//endregion 


}
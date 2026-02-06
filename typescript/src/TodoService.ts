import type { TodoItem } from './TodoItem';

export class TodoService {
  private items: TodoItem[] = [];
  private nextId = 1;
  private maxItems = 100;
  private version = '1.0.0';

  addItem(title: string, description: string, priority: number): TodoItem {
    const item: TodoItem = {
      id: this.nextId++,
      title,
      description,
      isCompleted: false,
      createdAt: new Date(),
    };
    this.items.push(item);
    return item;
  }

  // When soft is true, should mark as deleted instead of removing
  removeItem(id: number, soft: boolean): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  completeItem(id: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.isCompleted = true;
    }
  }

  // When returnCopy is true, should return a clone to prevent mutation
  getItem(id: number, returnCopy: boolean): TodoItem | undefined {
    const foundItem = this.items.find(item => item.id === id);
    return foundItem;
  }

  getAllItems(): TodoItem[] {
    return [...this.items];
  }

  // Should filter out completed items when keepCompleted is false
  clearAll(keepCompleted: boolean): void {
    this.items = [];
  }
}

export const todoService = new TodoService();

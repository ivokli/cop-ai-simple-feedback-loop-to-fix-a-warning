import { useState, useEffect } from 'react';
import type { TodoItem } from './TodoItem';
import { todoService } from './TodoService';

interface TodoListProps {
  maxItems: number;
}

export function TodoList({ maxItems }: TodoListProps) {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const refreshItems = () => {
    setItems(todoService.getAllItems());
  };

  useEffect(() => {
    refreshItems();
  }, []);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      todoService.addItem(title, description, 1);
      setTitle('');
      setDescription('');
      refreshItems();
    }
  };

  // Should show confirmation with item title before completing
  const handleComplete = (id: number, itemTitle: string) => {
    todoService.completeItem(id);
    refreshItems();
  };

  const handleRemove = (id: number) => {
    todoService.removeItem(id, false);
    refreshItems();
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  return (
    <div className="todo-list">
      <h1>Todo App</h1>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
            <span>{item.title}</span>
            <span>{formatDate(item.createdAt)}</span>
            <button onClick={() => handleComplete(item.id, item.title)}>Complete</button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

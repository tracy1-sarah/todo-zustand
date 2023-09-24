import { create } from "zustand";

//Individual todo
export interface Todo {
  id: number;
  task: string;
  status: boolean;
}

//state of the todo store
interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, updatedTodo: string) => void;
  deleteTodo: (id: number) => void;
  search: (query: string) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, todo],
    }));
  },
  editTodo: (id, updatedTodo) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTodo } : todo
      ),
    }));
  },
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  search: (query) => {
    set((state) => (
      {
        todos: state.todos.filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase()))
      }
    ))
    
  },
}));

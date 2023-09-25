import { create } from "zustand";

//Individual todo
export interface Todo {
  id: number;
  task: string;
}

//state of the todo store
interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, updatedTodo: string) => void;
  deleteTodo: (id: number) => void;
  search: (query: string) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  filteredTodos: [],
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
    // Filter the todos based on the query
    const filteredTodos = set((state) => ({
      filteredTodos: state.todos.filter((todo) =>
        todo.task.toLowerCase().includes(query.toLowerCase())
      ),
    }));

    return filteredTodos;
  },
}));

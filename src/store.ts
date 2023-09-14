import { create } from "zustand";

//Individual todo
interface Todo {
  id: number;
  task: string;
  status: boolean;
}

//state of the todo store
interface TodoState {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  editTodo: (id: number, updatedTodo: string) => void
  toggleTodo: (id: number) => void
  // searchTerm: (searchTerm: string) => Todo[]
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, todo],
    }));
  },
  toggleTodo: (id) => {
    set((state) => ({
      todos: state?.todos?.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: !todo.status,
            }
          : todo
      ),
    }));
  },
  editTodo: (id, updatedTodo) => {
    set((state) => (
      {
        todos: state?.todos?.map((todo) => 
        todo.id === id ? {
          ...todo, task: updatedTodo
        }:todo)
      }
    ))

  },
 
}));

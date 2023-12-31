import clsx from "clsx";
import { FaSearch } from "react-icons/fa";
import { useStore } from "../../store";
import  { useState } from "react";
import { TodoItemProps } from "../../context/types";
import TodoPopup from "./TodoPopup";
import TodoItem from "./TodoItem";

interface PopupData {
  id: number | null;
  item: TodoItemProps;
}

const Todo = () => {
  const store = useStore();
  const [todoPopup, setTodoPopup] = useState<PopupData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");


  const handleOpenTodoPopUp = (id: number | null, item: TodoItemProps) => {
    setTodoPopup({
      id,
      item,
    });
  };

  const todosToRender = store.filteredTodos.length > 0 ? store.filteredTodos : store.todos;
  const showNoItemsMessage = !searchQuery && todosToRender.length === 0;

 const handleSearch = () => {
   store.search(searchQuery); 
 };

  return (
    <>
      <div className="pt-5">
        {todoPopup && (
          <TodoPopup
            handleClosePopup={() => setTodoPopup(null)}
            data-testid="todo-popup"
            data={todoPopup?.item}
            id={todoPopup?.id}
          />
        )}
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <input
              type="search"
              className={clsx(
                "w-full bg-gray-50 p-4",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              placeholder={`Search (${store.todos.length} items)`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-input"
            />
            <button
              type="button"
              onClick={handleSearch}
              className={clsx(
                "absolute bottom-2 right-2 top-2",
                "rounded-lg bg-purple-700 px-4 text-white",
                "hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
              )}
              data-testid="search-button"
            >
              <FaSearch />
            </button>
          </div>
          <button
            onClick={() =>
              handleOpenTodoPopUp(null, {
                id: 1,
                task: "",
              })
            }
            type="button"
            className={clsx(
              "w-fit rounded-lg bg-emerald-700 px-4 py-2.5",
              "font-medium text-white",
              "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            )}
            data-testid="add-button"
          >
            Add
          </button>
        </div>
      </div>
      {/* Show all todos */}
      <div className="py-3" data-testid="todos-container">
        {todosToRender.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={{
              id: todo.id,
              task: todo.task,
            }}
          />
        ))}
        {showNoItemsMessage && <p data-testid="no-items-message">No todo items to display</p>}
      </div>
    </>
  );
};

export default Todo;

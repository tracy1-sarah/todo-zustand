import clsx from "clsx";
import { TodoItemProps } from "../../context/types";
import { useStore } from "../../store";
import { useEffect, useState } from "react";

interface TodoPopupProps {
  id: number | null;
  data: TodoItemProps;
  handleClosePopup: () => void;
}

const TodoPopup = ({ id, data, handleClosePopup }: TodoPopupProps) => {
  const store = useStore();
  const [inputValue, setInputValue] = useState(data?.task || "");
  const isEditMode = id !== null;

  useEffect(() => {
    setInputValue(data?.task || "");
  }, [data]);

  const handleAddAndEditTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      const newTodo = {
        id: isEditMode ? id! : 0, 
        task: inputValue,
      };
      if (isEditMode) {
        store.editTodo(newTodo.id, newTodo.task);
      } else {
        store.addTodo(newTodo);
      }

    }

    handleClosePopup();
  };
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 top-0 z-50",
        "flex items-center justify-center bg-gray-700/60 p-4"
      )}
    >
      <div className="w-full max-w-md">
        <form className="rounded-lg bg-white shadow" onSubmit={handleAddAndEditTodo}>
          <div className="p-6">
            <input
              required
              type="text"
              className={clsx(
                "w-full bg-gray-50 p-4",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-purple-500 focus:ring-purple-500"
              )}
              placeholder={isEditMode ? 'Edit Todo' : 'Add Todo'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div
            className={clsx(
              "flex items-center justify-center space-x-8 p-4",
              "rounded-b border-t border-gray-200"
            )}
          >
            <button
              type="submit"
              className={clsx(
                "rounded-lg bg-emerald-700 px-5 py-2.5",
                "text-center font-medium text-white",
                "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              )}
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
            <button
              onClick={handleClosePopup}
              type="button"
              className={clsx(
                "bg-white px-5 py-2.5",
                "rounded-lg border border-gray-200",
                "font-medium text-gray-500",
                "hover:bg-gray-100 hover:text-gray-900",
                "focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
              )}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoPopup;

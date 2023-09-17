import clsx from "clsx";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { TodoItemProps } from "../../context/types";
import { useStore } from "../../store";
import { useState } from "react";

interface TodoItemInterface {
  search: string;
  item: TodoItemProps;
  index: number;
  onEdit: () => void;
}

const TodoItem = ({ search, item, index, onEdit }: TodoItemInterface) => {
  const store = useStore();
  const [isEditMode, setIsEditMode] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState(item.value);

  // const handleEditTodo = (event: React.FormEvent) => {
  //   setIsEditMode(true);
  // };
const handleEditTodo = () => {
  // Assuming you have an editTodo function in your store
  store.editTodo(item.id, editTodo);
  setIsEditMode(false); // Exit edit mode
};

  

  return (
    <div
      className={clsx(
        "mt-2.5 flex w-full items-center justify-between bg-white p-4",
        "rounded-lg border border-gray-200 shadow"
      )}
    >
      <span className="font-normal text-gray-700"></span>
      <div className="flex gap-2">
        <button
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700",
            "hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
          )}
        >
          <FaRegTrashAlt />
        </button>
        <button
          onClick={handleEditTodo}
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700",
            "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          )}
        >
          <FaRegEdit />
        </button>
        {/* <button
          type="button"
          className={clsx(
            item.isChecked ? "bg-emerald-700" : "bg-gray-400",
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          )}
        ></button> */}
      </div>
    </div>
  );
};

export default TodoItem;

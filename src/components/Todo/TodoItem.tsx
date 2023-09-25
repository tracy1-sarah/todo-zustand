import clsx from "clsx";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { TodoItemProps } from "../../context/types";
import {  useStore } from "../../store";
import {useState} from "react"
import TodoPopup from "./TodoPopup";

interface TodoItemInterface {
  todo: TodoItemProps;
}

const TodoItem = ({ todo }: TodoItemInterface) => {
  const store = useStore()
  const [isEdit, setIsEdit] = useState<Boolean>(false)


  return (
    <div
      className={clsx(
        "mt-2.5 flex w-full items-center justify-between bg-white p-4",
        "rounded-lg border border-gray-200 shadow"
      )}
    >
      <span className="font-normal text-gray-700">{todo.value}</span>
      <div className="flex gap-2">
        <button
          onClick={() => store.deleteTodo(todo.id)}
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700",
            "hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
          )}
        >
          <FaRegTrashAlt className="text-white" />
        </button>
        <button
          onClick={() => setIsEdit(true)}
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700",
            "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          )}
        >
          <FaRegEdit className="text-white" />
        </button>
      </div>
      {isEdit && (
        <TodoPopup
          id={todo.id}
          data={{
            id: todo?.id,
            value: todo?.value,
          }}
          handleClosePopup={() => setIsEdit(false)}
        />
      )}
    </div>
  );
};

export default TodoItem;

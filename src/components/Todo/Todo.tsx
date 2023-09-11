import clsx from "clsx";
import { FaSearch } from "react-icons/fa";

const Todo = () => {
  return (
    <div className="pt-5">
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
            placeholder="Search"
          />
          <button
            type="button"
            className={clsx(
              "absolute bottom-2 right-2 top-2",
              "rounded-lg bg-purple-700 px-4 text-white",
              "hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
            )}
          >
            <FaSearch />
          </button>
        </div>
        <button
          type="button"
          className={clsx(
            "w-fit rounded-lg bg-emerald-700 px-4 py-2.5",
            "font-medium text-white",
            "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          )}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Todo;

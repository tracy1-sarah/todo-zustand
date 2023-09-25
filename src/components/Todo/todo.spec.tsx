import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import { useStore } from "../../store";

jest.mock("../../store", () => ({
  useStore: jest.fn(),
}));

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const mockStore: {
  todos: { id: number; task: string; status: boolean }[];
  filteredTodos: { id: number; task: string; status: boolean }[];
  addTodo: jest.Mock;
  editTodo: jest.Mock;
  deleteTodo: jest.Mock;
  search: jest.Mock;
} = {
  todos: [
    { id: 1, task: "Task 1", status: false },
    { id: 2, task: "Task 2", status: true },
  ],
  filteredTodos: [],
  addTodo: jest.fn(),
  editTodo: jest.fn(),
  deleteTodo: jest.fn(),
  search: jest.fn(),
};

describe("Todo component", () => {
  beforeEach(() => {
    mockUseStore.mockReturnValue(mockStore);
  });

  it("renders Todo component correctly", () => {
    render(<Todo />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it('displays "No todo items to display" when no todos are present', () => {
    mockStore.todos = [];

    render(<Todo />);
    expect(screen.getByText("No todo items to display")).toBeInTheDocument();
  });
});

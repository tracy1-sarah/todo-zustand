import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import { useStore } from "../../store";

// Mock the useStore function
jest.mock("../../store", () => ({
  useStore: jest.fn(),
}));

// Define the mock store
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

  it("performs a search when the search button is clicked", () => {
    render(<Todo />);
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "Task 1" } });
    fireEvent.click(searchButton);

    expect(mockStore.search).toHaveBeenCalledWith("Task 1");
  });

  it("displays \"Todo doesn't exist\" when a search doesn't match any todos", () => {
    mockStore.filteredTodos = []; 

     render(<Todo />);
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "Non-Existent Task" } });
    fireEvent.click(searchButton);

    expect(screen.getByText("Todo doesn't exist")).toBeInTheDocument();
  });
});

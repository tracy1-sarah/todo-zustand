import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo'; 
import { useStore } from '../../store';

// Mock the store functions for testing
jest.mock('../../store', () => ({
  useStore: jest.fn(),
}));

// Mock the store functions for testing
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

// Define a test store
const mockStore: {
    todos: { id: number; task: string; status: boolean }[];
    filteredTodos: { id: number; task: string; status: boolean }[];
    addTodo: jest.Mock;
    editTodo: jest.Mock;
    deleteTodo: jest.Mock;
    search: jest.Mock;
  } = {
    todos: [
      { id: 1, task: 'Task 1', status: false },
      { id: 2, task: 'Task 2', status: true },
    ],
    filteredTodos: [],
    addTodo: jest.fn(),
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    search: jest.fn(),
  };
  

describe('Todo component', () => {
  // Reset the mock store before each test
  beforeEach(() => {
    mockUseStore.mockReturnValue(mockStore);
  });

  it('renders Todo component correctly', () => {
    render(<Todo />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('displays "No todo items to display" when no todos are present', () => {
    // Set an empty list of todos
    mockStore.todos = [];

    render(<Todo />);
    expect(screen.getByText('No todo items to display')).toBeInTheDocument();
  });

  it('filters and displays todos when a search query is entered', () => {
    // Set a search query
    const searchQuery = 'Task 1';
    mockStore.filteredTodos = mockStore.todos.filter((todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
        render(<Todo />);

        // Find the input element for the search query
        const searchInput = screen.getByTestId('search-input');
    
        // Enter the search query
        fireEvent.change(searchInput, { target: { value: 'Task 1' } });
    
        // Find the search button and click it
        const searchButton = screen.getByText('Add'); // Adjust this selector if needed
        fireEvent.click(searchButton);
    
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument(); // Task 2 should be filtered out
      });
    
      it('clears the search query and displays all todos when the search field is cleared', () => {
        // Set a search query
        const searchQuery = 'Task 1';
        mockStore.filteredTodos = mockStore.todos.filter((todo) =>
          todo.task.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        // Render the Todo component
        render(<Todo />);
    
        // Find the input element for the search query
        const searchInput = screen.getByTestId('search-input');
    
        // Enter the search query
        fireEvent.change(searchInput, { target: { value: 'Task 1' } });
    
        const clearButton = screen.getByText('Add'); // Adjust this selector if needed
        fireEvent.click(clearButton);
    
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
      });
    });
    

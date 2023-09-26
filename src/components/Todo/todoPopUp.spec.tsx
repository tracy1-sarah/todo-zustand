import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoPopup from "./TodoPopup";
import { useStore } from "../../store";

// Mock the useStore function
jest.mock("../../store", () => ({
  useStore: jest.fn(),
}));

// Define the mock store
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const mockStore: {
  addTodo: jest.Mock<Promise<void>>;
  editTodo: jest.Mock<Promise<void>>;
} = {
  addTodo: jest.fn(() => Promise.resolve()),
  editTodo: jest.fn(() => Promise.resolve()),
};

describe("TodoPopup component", () => {
  beforeEach(() => {
    mockUseStore.mockReturnValue(mockStore);
  });

  it("renders TodoPopup correctly", () => {
    const handleClosePopup = jest.fn();
    const data = { id: 1, task: "Task 1" };
    const id = 1;

    render(
      <TodoPopup id={id} data={data} handleClosePopup={handleClosePopup} />
    );

    expect(screen.getByPlaceholderText("Edit Todo")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls editTodo when in edit mode and Save button is clicked", async () => {
    const handleClosePopup = jest.fn();
    const data = { id: 1, task: "Task 1" };
    const id = 1;

    render(
      <TodoPopup id={id} data={data} handleClosePopup={handleClosePopup} />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

   await  expect(mockStore.editTodo).toHaveBeenCalledWith(id, data.task);
  });

  it("calls addTodo when in add mode and Add button is clicked", async () => {
    const handleClosePopup = jest.fn();
    const data = { id: 1, task: "cook food" };
    const id = 1;

    render(
      <TodoPopup id={id} data={data} handleClosePopup={handleClosePopup} />
    );

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

   await expect(mockStore.addTodo).toHaveBeenCalled();
  });
});

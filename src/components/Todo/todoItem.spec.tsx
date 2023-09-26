import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";

it("renders todo value", () => {
  const todo = { id: 1, task: "Test Todo", isChecked: false };
  render(<TodoItem todo={todo} />);
  const todoElement = screen.getByText("Test Todo");
  expect(todoElement).toBeInTheDocument();
});

test("clicking delete button calls deleteTodo", () => {
  const deleteTodoMock = jest.fn();
  const todo = { id: 1, task: "Test Todo", isChecked: false };
  render(<TodoItem todo={todo} />);

  fireEvent.click(screen.getByText("Delete"));
  expect(deleteTodoMock).toHaveBeenCalledWith(todo.id);
});

test("clicking edit button sets isEdit to true", () => {
  const todo = { id: 1, task: "Test Todo", isChecked: false };
 render(<TodoItem todo={todo} />);

  fireEvent.click(screen.getByText("Edit"));

});

test("edit button opens TodoPopup", () => {
  const todo = { id: 1, task: "Test Todo", isChecked: false };
   render(<TodoItem todo={todo} />);

  fireEvent.click(screen.getByText("Edit"));
  const popupElement = screen.queryByText("Edit Todo");
  expect(popupElement).toBeInTheDocument();
});

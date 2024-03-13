import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type todoType = {
  name: string | undefined;
  status: boolean;
  description: string | undefined;
  id: string;
};

export interface todoState {
  todos: [];
  selectedTodo: todoType;
  editMode: boolean;
}
const savedTodos = localStorage.getItem("todos");

const initialState: todoState = {
  todos: savedTodos ? JSON.parse(savedTodos) : [],
  selectedTodo: {
    name: "",
    status: false,
    description: "",
    id: "",
  },
  editMode: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todoType>) => {
      // @ts-ignore
      state.todos.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      // @ts-ignore
      state.todos = state.todos.filter(
        (todo: todoType) => todo.id !== action.payload
      );
    },

    setTodo: (state, action) => {
      state.todos = action.payload;
    },

    seletedTodoById: (state, action: PayloadAction<todoType>) => {
      state.selectedTodo = action.payload;
      state.editMode = true;
    },

    editTodo: (
      state,
      action: PayloadAction<{ id: string; todo: todoType }>
    ) => {
      const { id, todo } = action.payload;
      const index = state.todos.findIndex((t: todoType) => t.id === id);
      if (index !== -1) {
        //   @ts-ignore
        state.todos[index] = todo;
      }
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.editMode = action.payload;
    },

    todoCompleted: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(
        (t: todoType) => t.id === action.payload
      );

      if (index !== -1) {
        // @ts-ignore
        state.todos[index].status = !state.todos[index].status;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  deleteTodo,
  editTodo,
  setTodo,
  seletedTodoById,
  setEditMode,
  todoCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;

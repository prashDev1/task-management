"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addTodo,
  todoType,
  editTodo,
  setTodo,
  setEditMode,
} from "@/features/todo/todoSlice";
import createRandomString from "@/lib/randomString";
import { useEffect, useState } from "react";
import TaskList from "@/widgets/TaskList";
import { Textarea } from "@/components/ui/textarea";
import { TaskCard } from "@/widgets/TaskCard";

const page = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const selectedTodo = useSelector(
    (state: RootState) => state.todo.selectedTodo
  );
  const editMode = useSelector((state: RootState) => state.todo.editMode);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState<string>();
  const [taskDetail, setTaskDetail] = useState<string>();

  // Load todos from local storage on page load
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(setTodo(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  // Update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onAddTodo = () => {
    const todo: todoType = {
      name: taskName,
      id: createRandomString(10),
      description: taskDetail,
      status: false,
    };

    if (editMode && taskName && taskName?.trim().length > 0) {
      dispatch(editTodo({ id: selectedTodo.id, todo: todo }));
      setTaskName("");
      setTaskDetail("");
      dispatch(setEditMode(false));
    }

    if (taskName && taskName?.trim().length > 0 && !editMode) {
      dispatch(addTodo(todo));
      setTaskName("");
      setTaskDetail("");
    }
  };

  useEffect(() => {
    if (editMode) {
      setTaskName(selectedTodo.name);
      setTaskDetail(selectedTodo.description);
    }
  }, [editMode, selectedTodo]);

  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen">
      <div className="mt-5">
        <div className="flex flex-col justify-center items-center space-x-2">
          <div className="space-y-1">
            <Input
              placeholder="Enter Task"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
            />
            <Textarea
              placeholder="Type your message here."
              onChange={(e) => {
                setTaskDetail(e.target.value);
              }}
              value={taskDetail}
            />
          </div>
          <Button onClick={onAddTodo} className="mt-2 w-[70%]">
            {editMode ? "Edit" : "Add"}
          </Button>
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-2 mt-5">
        {todos.length > 0 &&
          todos.map((item: todoType) => {
            return <TaskCard {...item} key={item.id} />;
          })}
      </ul>
    </div>
  );
};

export default page;

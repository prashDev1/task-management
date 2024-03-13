import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteTodo,
  editTodo,
  seletedTodoById,
  todoCompleted,
  todoType,
} from "@/features/todo/todoSlice";
import { useDispatch } from "react-redux";

export function TaskCard({ name, description, id, status }: todoType) {
  const dispatch = useDispatch();

  const onTodoDelete = () => {
    dispatch(deleteTodo(id));
  };

  const onEdit = () => {
    const todo: todoType = {
      name,
      status,
      description,
      id,
    };

    dispatch(seletedTodoById(todo));
  };

  const onTodoComplete = () => {
    dispatch(todoCompleted(id));
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle
          onClick={onTodoComplete}
          className={status ? "line-through cursor-pointer" : "cursor-pointer"}
        >
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button onClick={onTodoDelete} variant={"destructive"}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

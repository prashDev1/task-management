import {
  deleteTodo,
  seletedTodoById,
  todoCompleted,
  todoType,
} from "@/features/todo/todoSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

const TaskList = ({ name, status, description, id }: todoType) => {
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
    <div
      className="border flex justify-between items-center rounded-full h-[3rem] p-4"
      style={{
        height: "3rem",
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={onTodoComplete}
        className={status ? "line-through flex flex-col py-2" : ""}
      >
        <p>{name}</p>

        <small>{description}</small>
      </div>
      <div className="flex justify-center items-center space-x-1">
        <MdDelete
          size={"25px"}
          onClick={onTodoDelete}
          style={{ cursor: "pointer", color: " red" }}
        />
        <MdEdit
          size={"25px"}
          onClick={onEdit} // Call onEdit function when the edit button is clicked
          style={{ cursor: "pointer", color: "green" }}
        />
      </div>
    </div>
  );
};

export default TaskList;

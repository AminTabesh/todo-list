import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { removeTodo } from "../helpers/helpers";
import { useTodoContext } from "../contexts/ContextProvider";
import { useEffect } from "react";

function Todo({ todo }) {
  const id = todo.id;
  const { setIsOpenModal, setIsEdditingSession, setEditTodoObj, editTodoObj } =
    useTodoContext();

  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => removeTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  function deleteHandler() {
    mutateDelete(id);
  }
  function editHandler(event) {
    event.stopPropagation();
    setEditTodoObj(todo);
    setIsEdditingSession(true);
    setIsOpenModal(true);
  }

  useEffect(() => {
    if (editTodoObj) {
      setIsEdditingSession(true); 
      setIsOpenModal(true); 
    }
  }, [editTodoObj, setIsEdditingSession, setIsOpenModal]);

  return (
    <div className="w-full h-20 flex items-center px-10 bg-stone-100">
      <div className="flex items-center gap-4">
        <img
          src={todo.image ? todo.image : "/microsoft-todo.svg"}
          alt=""
          className="rounded-full w-8 h-8 justify-self-start bg-emerald-500"
        />
        <h3 className="font-medium text-xl w-32  overflow-hidden">
          {todo.title}
        </h3>
      </div>
      <p className="ml-auto">{todo.desc}</p>
      <div className="flex items-center gap-5 ml-auto">
        <button className=" text-2xl" onClick={editHandler}>
          <MdOutlineModeEdit />
        </button>
        <button className="text-red-500 text-2xl" onClick={deleteHandler}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default Todo;

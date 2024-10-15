import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../helpers/helpers";
import { useTodoContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import Todo from "./Todo";
import Spinner from "./Spinner";

function Main() {
  const { setTodos, todos } = useTodoContext();
  const { data: todosList, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  useEffect(
    function () {
      setTodos(todosList);
    },
    [todosList, setTodos]
  );

  return (
    <div className=" w-11/12 mx-auto overflow-y-auto h-[400px] mt-6 border rounded-2xl relative">
      {isLoading ? (
        <Spinner />
      ) : (
        todos?.map((todo) => <Todo todo={todo} key={todo.id} />)
      )}
    </div>
  );
}

export default Main;

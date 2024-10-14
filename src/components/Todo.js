import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

function Todo({ title, desc, id }) {
  return (
    <div className="w-full h-20 flex items-center px-10 bg-stone-100">
      <div className="flex items-center gap-4">
        <img
          src="/microsoft-todo.svg"
          alt=""
          className="rounded-full w-8 justify-self-start bg-emerald-500"
        />
        <h3 className="font-medium text-xl w-32  overflow-hidden">{title}</h3>
      </div>
      <p className="ml-auto">{desc}</p>
      <div className="flex items-center gap-5 ml-auto">
        <button className=" text-2xl"><MdOutlineModeEdit /></button>
        <button className="text-red-500 text-2xl"><MdDelete /></button>
      </div>
    </div>
  );
}

export default Todo;

import { useEffect, useRef } from "react";
import { useTodoContext } from "../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo, postTodo } from "../helpers/helpers";

function Modal() {
  const {
    isOpenModal,
    modalRef,
    isAnimating,
    setIsAnimating,
    handleCloseModal,
    setTodos,
    isEdditingSession,
    editTodoObj,
  } = useTodoContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate: mutateCreate } = useMutation({
    mutationFn: (data) => postTodo(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      handleCloseModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: mutateEdit } = useMutation({
    mutationFn: (newTodo) => editTodo(newTodo),
    onSuccess: (res) => {
      queryClient.invalidateQueries("todos");
      handleCloseModal()
    },
  });

  useEffect(() => {
    if (!isOpenModal) setIsAnimating(false);
  }, [isOpenModal, setIsAnimating]);

  const fileInputRef = useRef(null);

  const onSubmitCreate = (data) => {
    const todoObj = {
      ...data,
      image: data.image[0],
    };
    mutateCreate(todoObj);
  };

  const onSubmitEdit = (data) => {
    const todoObj = {
      ...data,
      id: editTodoObj.id,
      image: data.image[0],
    };

    mutateEdit(todoObj);
  };

  return (
    isOpenModal && (
      <div
        className={`backdrop-blur-sm absolute w-screen h-screen z-50 flex items-center justify-center`}
      >
        <div
          ref={modalRef}
          className={`bg-white border-2 rounded-2xl w-8/12 h-5/6 p-10 transition-transform duration-300 overflow-hidden ${
            isAnimating ? "animate-exit" : "animate-enter"
          }`}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-red-500 text-4xl"
          >
            &times;
          </button>

          {isEdditingSession ? (
            <form
              onSubmit={handleSubmit(onSubmitEdit)}
              className="flex flex-col items-center justify-center h-full w-full gap-4 pb-20"
            >
              <label
                htmlFor="title"
                className="text-lg font-medium text-left w-full"
              >
                Title:{" "}
              </label>
              <input
                type="text"
                name="title"
                defaultValue={editTodoObj.title}
                placeholder="Enter the todo title..."
                className="bg-stone-100 w-full focus:outline-logo-primary-light px-2 py-4 rounded-lg mt-2"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}

              <label
                htmlFor="desc"
                className="text-lg font-medium text-left w-full"
              >
                Description:{" "}
              </label>
              <input
                type="text"
                name="desc"
                defaultValue={editTodoObj.desc}
                placeholder="Enter the todo description..."
                className="bg-stone-100 w-full focus:outline-logo-primary-light px-2 py-4 rounded-lg mt-2"
                {...register("desc", { required: "Description is required" })}
              />
              {errors.desc && (
                <span className="text-red-500">{errors.desc.message}</span>
              )}

              <label
                htmlFor="file"
                className="text-lg font-medium text-left w-full"
              >
                Image:
              </label>

              <input
                ref={fileInputRef}
                accept="image/*"
                // defaultValue={}
                type="file"
                id="file"
                className="file:bg-logo-primary file:border-none file:transition-colors file:rounded-lg file:hover:bg-logo-primary-dark file:text-white file:cursor-pointer file:py-2 file:px-4 w-full"
                onChange={(e) => console.log(e.target.files[0]?.name)} // Log the file name
                {...register("image")}
              />
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}

              <button
                className="absolute bottom-10 right-10 bg-teal-500 transition-colors rounded-lg py-2 px-4 hover:bg-teal-600 text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitCreate)}
              className="flex flex-col items-center justify-center h-full w-full gap-4 pb-20"
            >
              <label
                htmlFor="title"
                className="text-lg font-medium text-left w-full"
              >
                Title:{" "}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter the todo title..."
                className="bg-stone-100 w-full focus:outline-logo-primary-light px-2 py-4 rounded-lg mt-2"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}

              <label
                htmlFor="desc"
                className="text-lg font-medium text-left w-full"
              >
                Description:{" "}
              </label>
              <input
                type="text"
                name="desc"
                placeholder="Enter the todo description..."
                className="bg-stone-100 w-full focus:outline-logo-primary-light px-2 py-4 rounded-lg mt-2"
                {...register("desc", { required: "Description is required" })}
              />
              {errors.desc && (
                <span className="text-red-500">{errors.desc.message}</span>
              )}

              <label
                htmlFor="file"
                className="text-lg font-medium text-left w-full"
              >
                Image:
              </label>

              <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                id="file"
                className="file:bg-logo-primary file:border-none file:transition-colors file:rounded-lg file:hover:bg-logo-primary-dark file:text-white file:cursor-pointer file:py-2 file:px-4 w-full"
                onChange={(e) => console.log(e.target.files[0]?.name)} // Log the file name
                {...register("image")}
              />
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}

              <button
                className="absolute bottom-10 right-10 bg-teal-500 transition-colors rounded-lg py-2 px-4 hover:bg-teal-600 text-white"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    )
  );
}

export default Modal;

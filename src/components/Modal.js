import { useEffect, useRef } from "react";
import { useTodoContext } from "../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postTodo } from "../helpers/helpers";

function Modal() {
  const {
    isOpenModal,
    modalRef,
    isAnimating,
    setIsAnimating,
    handleCloseModal,
    setTodos
  } = useTodoContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => postTodo(data),
    onSuccess: (data) => {
        setTodos(todos => [...todos, data])
        handleCloseModal()
    },
    onError: (err) => {
        console.error(err);
    }

  })

  useEffect(() => {
    if (!isOpenModal) setIsAnimating(false);
  }, [isOpenModal, setIsAnimating]);

  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
    const todoObj = {
      ...data,
      image: data.image[0],
    };
    mutate(todoObj);
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

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
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
              {...register("image", { required: "Image is required" })}
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
        </div>
      </div>
    )
  );
}

export default Modal;

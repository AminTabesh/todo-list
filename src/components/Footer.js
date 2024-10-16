import { useEffect } from "react";
import { useTodoContext } from "../contexts/ContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearTodos } from "../helpers/helpers";

function Footer() {
  const {
    isOpenModal,
    setIsOpenModal,
    setIsEdditingSession,
    modalRef,
    handleCloseModal,
  } = useTodoContext();

  const queryClient = useQueryClient()

  const { mutate, data } = useMutation({
    mutationFn: () => clearTodos(),
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
      console.log(data);
    },
  });

  function handleOpenModal(event) {
    event.stopPropagation();
    setIsEdditingSession(false);
    setIsOpenModal(true);
  }
  function handleClear() {
    mutate();
  }

  useEffect(
    function () {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          handleCloseModal();
        }
      };

      if (isOpenModal) {
        document.body.addEventListener("click", handleClickOutside);
        document.body.addEventListener("keyup", (e) => {
          if (e.keyCode === 27) {
            handleCloseModal();
          }
        });
      }

      return () => {
        document.body.removeEventListener("click", handleClickOutside);
        document.body.removeEventListener("keyup", (e) => {
          if (e.keyCode === 27) {
            handleCloseModal();
          }
        });
      };
    },
    [isOpenModal, setIsOpenModal, modalRef, handleCloseModal]
  );

  return (
    <div className="flex justify-end items-center w-full h-16 mt-4 gap-4 pr-16">
      <button
        className="bg-red-500 transition-colors rounded-lg py-2 px-4 hover:bg-red-600 text-white"
        onClick={handleClear}
      >
        Clear All
      </button>
      <button
        className="bg-teal-500 transition-colors rounded-lg py-2 px-4 hover:bg-teal-600 text-white"
        onClick={handleOpenModal}
      >
        New Todo
      </button>
    </div>
  );
}

export default Footer;

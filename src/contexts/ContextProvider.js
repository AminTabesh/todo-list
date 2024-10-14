import { createContext, useContext, useRef, useState } from "react";

const todoContext = createContext();

function ContextProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [todos, setTodos] = useState([]);
  const modalRef = useRef(null);
  const handleCloseModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpenModal(false);
      setIsAnimating(false);
    }, 100);
  };
  return (
    <todoContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        modalRef,
        isAnimating,
        setIsAnimating,
        handleCloseModal,
        todos,
        setTodos
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(todoContext);
  if (context === undefined)
    throw new Error("Context must be used inside it's provider");
  return context;
}

export default ContextProvider;

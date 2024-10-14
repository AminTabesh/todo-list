import Container from "./Container";
import Modal from "./Modal";
import { useTodoContext } from "../contexts/ContextProvider";


function AppLayout() {
  const { isOpenModal } = useTodoContext();

  

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-bg-color flex justify-center items-center">
      <Container />
      {isOpenModal && <Modal />}
    </div>
  );
}

export default AppLayout;

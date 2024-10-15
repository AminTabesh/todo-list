import Container from "./Container";
import Modal from "./Modal";
import { useTodoContext } from "../contexts/ContextProvider";
import { useEffect } from "react";


function AppLayout() {
  const { isOpenModal } = useTodoContext();

  // useEffect(function() {
  //   fetch('http://localhost:2000/', {
  //     method : "POST",
  //     headers: {
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify({
  //       title: 'test title',
  //       desc: 'test desc'
  //     })
  //   })
  //     .then(res =>console.log(res))
  // } , [])

  

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-bg-color flex justify-center items-center">
      <Container />
      {isOpenModal && <Modal />}
    </div>
  );
}

export default AppLayout;

import { useState } from "react";
import ModalChild from "./ModalChild";
const modalWrapperStyle = {
  position: "relative",
  zIndex: 1,
};

const heigherIndexWrapperStyle = {
  position: "relative",
  zIndex: 2,
  color: "#00f",
  background: "#ff0",
  padding: "10px",
};
const ModalParent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div style={modalWrapperStyle}>
        <h2>ModalParent zIndex:1</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          modal open
        </button>
        {/* modal */}
        <ModalChild open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div style={heigherIndexWrapperStyle}>z-index 2</div>
    </>
  );
};

export default ModalParent;

import React from "react";
import ReactDOM from "react-dom";
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  background: "#fff",
  color: "#333",
  padding: "50px",
  zIndex: "10",
};
const dimStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background: "rgba(0,0,0,.5)",
  zIndex: "10",
};

const ModalChild = ({ open, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div style={dimStyle} className="modalWrap">
      <div style={modalStyle} className="modal">
        <h2>ModalChild zIndex:10</h2>
        <button onClick={onClose}>closeModal</button>
      </div>
    </div>,
    document.getElementById("portal")
    // public 폴더의 index.html에 id portal인 div 생성해 준 뒤에
  );
};

export default ModalChild;

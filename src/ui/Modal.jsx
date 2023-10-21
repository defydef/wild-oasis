/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import useDeteckClickOutside from "../hooks/useDeteckClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// 1. Create a context
const ModalContext = createContext();

// 2. Create a parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3.Create child components that implement common tasks
function Open({ opens: opensWindowName, renderButton }) {
  const { open } = useContext(ModalContext);
  return renderButton(() => open(opensWindowName));

  // return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, renderForm }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();
  useDeteckClickOutside(ref); // Detect click outside Modal

  if (name !== openName) return null;
  return createPortal(
    // attach the Modal directly into the document.body in DOM structure
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {renderForm(() => close())}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4. Add child components to the parent component
Modal.Open = Open;
Modal.Window = Window;

// 5. Export contexts inside Modal
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error(
      "useModal is undefined because it is defined inside the children component of Modal"
    );
  return context;
}

export default Modal;

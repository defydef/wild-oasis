import { createContext, useContext, useReducer, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useDeteckClickOutside from "../hooks/useDeteckClickOutside";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenusContext);
  if (context === undefined)
    throw new Error(
      "useMenu is undefined because it is defined inside the children component of Menu"
    );
  return context;
}

function Menu({ id, children }) {
  return <StyledMenu>{children}</StyledMenu>;
}
function Toggle({ children, id }) {
  const { openId, open, close } = useMenu();
  function handleClick() {
    openId === "" || openId !== id ? open(id) : close();
  }
  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}
function List({ children, id }) {
  const { openId, close } = useMenu();
  const ref = useDeteckClickOutside(close); // Detect click outside Modal
  if (openId !== id) return null;
  return createPortal(
    <StyledList $position={{ x: 30, y: 90 }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ icon, onClick }) {
  return (
    <li>
      <StyledButton onClick={onClick}>{icon}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

import { useEffect } from "react";
import { useModal } from "../ui/Modal";

function useDeteckClickOutside(component) {
  const { close } = useModal();

  useEffect(
    function () {
      function handleClick(e) {
        if (component.current && !component.current.contains(e.target)) close();
      }
      document.addEventListener("click", handleClick, true);
      // if third argument (true) is not specified, the if condition in line 10 will still be called,
      // even if the Modal is not opened

      return document.removeEventListener("click", handleClick);
    },
    [close, component]
  );
}

export default useDeteckClickOutside;

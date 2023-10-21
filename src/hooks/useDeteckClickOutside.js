import { useEffect, useRef } from "react";
import { useModal } from "../ui/Modal";

function useDeteckClickOutside(closeFunction) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) closeFunction();
      }
      document.addEventListener("click", handleClick, true);
      // if third argument (true) is not specified, the if condition in line 10 will still be called,
      // even if the Modal is not opened

      return document.removeEventListener("click", handleClick);
    },
    [closeFunction]
  );
  return ref;
}

export default useDeteckClickOutside;

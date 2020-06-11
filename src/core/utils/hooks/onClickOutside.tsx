import {useEffect, RefObject} from "react";

function useOnClickOutside(element: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function eventListener(event: MouseEvent | TouchEvent) {
      if (
        !element.current ||
        !(event.target instanceof HTMLElement) ||
        element.current.contains(event.target)
      ) {
        return;
      }

      callback();
    }

    document.addEventListener("mousedown", eventListener);
    document.addEventListener("touchstart", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("touchstart", eventListener);
    };
  }, [element, callback]);
}

export default useOnClickOutside;

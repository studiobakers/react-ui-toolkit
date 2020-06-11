import React from "react";

function useDebounce(debouncedHandler: any, initialValue: any, delay: number) {
  const [value, setValue] = React.useState(initialValue);
  const currentValueRef = React.useRef(value);

  React.useEffect(() => {
    let handler: any;

    if (currentValueRef.current !== value) {
      handler = setTimeout(() => {
        debouncedHandler(value);
      }, delay);

      currentValueRef.current = value;
    }

    return () => {
      clearTimeout(handler);
    };
  }, [currentValueRef, debouncedHandler, value, delay]);

  return [value, setValue];
}

export default useDebounce;

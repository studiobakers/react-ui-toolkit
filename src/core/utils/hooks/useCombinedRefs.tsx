import React from "react";

//  TODO: Add JSDoc
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(targetRef.current);
        } else {
          (ref as React.MutableRefObject<T | null>).current = targetRef.current;
        }
      }
    });
  }, [refs]);

  return targetRef;
}

export default useCombinedRefs;

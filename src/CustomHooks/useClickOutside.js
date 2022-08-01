import { useEffect } from "react";
/**
 * Custom hook used to detect click outside a given component
 * @param ref: the reference of the target component
 * @param excludedRef: the reference for a component that should be exluded from listener
 * @param callBack: the callback to be invoked when the lister is invoked
 */
export default function useClickOutside(ref, excludedRef, callBack) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        excludedRef &&
        ref.current &&
        !ref.current.contains(event.target) &&
        excludedRef.current &&
        !excludedRef.current.contains(event.target)
      ) {
        callBack();
      } else if (
        !excludedRef &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callBack();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

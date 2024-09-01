import { useEffect, useState } from "react";

/**
 *Custom hook for debounce a value
 *@param value - The value to be debouonce
 *@param delayValue -The debounce delay in millisecond
 *@returns - Debounce value
 */
const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
export default useDebounce;

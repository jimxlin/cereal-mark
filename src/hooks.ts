import { useState, useEffect, useRef } from "react";

export function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      ),
    ...(typeof initialValue === "boolean" && { checked: value }),
  };
  // const reset = (): void => setValue(initialValue);
  // return [value, reset, bind];
  return [value, bind];
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback as any;
  }, [callback]);
  useEffect(() => {
    function tick() {
      (savedCallback.current as any)();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

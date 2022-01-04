import { useState } from "react";

export function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const reset = (): void => setValue(initialValue);
  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      ),
    ...(typeof initialValue === "boolean" && { checked: value }),
  };
  return [value, reset, bind];
}

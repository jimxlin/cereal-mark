import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders site name", () => {
  render(<App />);
  const elements = screen.getAllByText(/cerealmark/i);
  expect(elements[0]).toBeInTheDocument();
});

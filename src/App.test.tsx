import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headerText = screen.getByText(/cerealmark/i);
  expect(headerText).toBeInTheDocument();
});

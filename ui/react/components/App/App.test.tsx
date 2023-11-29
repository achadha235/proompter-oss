import { render, screen } from "@testing-library/react";
import { test } from "bun:test";
import { App } from "./index";

test("App component renders yo", () => {
  render(<App />);
  screen.debug();
  screen.getByText(/Yo/i);
});

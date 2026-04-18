import { render, screen } from "@testing-library/react";
import Landing from "../index";

describe("Landing Page", () => {
  it("renders a button", () => {
    render(<Landing />);
    const el = screen.getByRole("button");
    expect(el).toBeVisible();
  });
});

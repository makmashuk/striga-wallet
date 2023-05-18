import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "@/components/modules/Register";

jest.mock("next/router", () => require("next-router-mock"));

describe("Register component", () => {
  beforeEach(() => {
    render(<Register />);
  });
  test("renders last name input field", () => {
    const lastNameInput = screen.getByRole("textbox", { name: "Last Name" });
    expect(lastNameInput).toBeInTheDocument();
  });
  test("renders email input field", () => {
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
  });
  test("renders Address Line input field", () => {
    const address1 = screen.getByRole("textbox", { name: "Address Line" });
    expect(address1).toBeInTheDocument();
  });
  test("renders City input field", () => {
    const city = screen.getByRole("textbox", { name: "City" });
    expect(city).toBeInTheDocument();
  });
  test("renders country select field with options", () => {
    const selectCountryButton = screen.getByRole("button", {
      name: "Select country",
    });
    expect(selectCountryButton).toBeInTheDocument();
  });
  test("renders register button", () => {
    const registerButton = screen.getByRole("button", {
      name: "Register Now",
    });
    expect(registerButton).toBeInTheDocument();
  });
});

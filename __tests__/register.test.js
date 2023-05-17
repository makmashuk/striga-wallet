import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Home from "@/pages/index";

describe("Home", () => {
  //   it('renders a heading', () => {
  //     render(<Home />);

  //     const heading = screen.getByRole('heading', {
  //       name: /welcome to next\.js!/i,
  //     });

  //     expect(heading).toBeInTheDocument();
  //   });
  it("renders title and meta tags", () => {
    render(<Home />);
    const titleElement = screen.getByTitle("Striga Wallet");
    const descriptionElement = screen.getByText("A Wallet for Bitcoin");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

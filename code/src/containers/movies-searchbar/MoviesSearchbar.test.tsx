import { screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import MoviesSearchbar from "@/containers/movies-searchbar/MoviesSearchbar";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const initialQuery = "Lord of The Rings";

const testQuery = "Shrek";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
  useNavigate: () => mockNavigate
}));

const renderAndMock = (params?: Record<string, string>) => {
  (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(params)]);

  renderWithProviders(<MoviesSearchbar />);
};

describe("Test movie searchbar", () => {
  test("Should render search input and submit button", () => {
    renderAndMock();

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("SearchIcon");

    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Search initial value should be empty when there is no query", () => {
    renderAndMock();

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", "");
  });

  test("Search initial value should be equal to query param", () => {
    renderAndMock({ query: initialQuery });

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", initialQuery);
  });

  test("Should input text and set right query after submit is hit", async () => {
    renderAndMock();

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("SearchIcon");

    await typeIntoInput(input, testQuery);

    await userEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith(`?query=${testQuery}`);
  });
});

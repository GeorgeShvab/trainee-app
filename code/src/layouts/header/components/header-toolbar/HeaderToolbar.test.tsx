import { screen } from "@testing-library/react";

import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";

import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";
import { useIsAuthLoadingSelector } from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock(
  "@/layouts/header/utils/get-header-toolbar-by-role/getHeaderToolbarByRole",
  () => ({
    __esModule: true,
    default: () => <div>Toolbar for specific role</div>
  })
);

jest.mock("@/store/slices/userSlice", () => ({
  useIsAuthLoadingSelector: jest.fn(),
  useUserRoleSelector: jest.fn()
}));
jest.mock("@/store/api/productsApi", () => ({
  useGetUserProductsBySearchQuery: jest.fn()
}));

const mockAndRender = (isLoading = false) => {
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(isLoading);
  (useGetUserProductsBySearchQuery as jest.Mock).mockReturnValue({
    data: {
      totalElements: 5,
      content: [{ id: 1, name: "Product 1", image: "image1.png" }]
    },
    isLoading: false,
    isError: false
  });
  renderWithProviders(<HeaderToolbar />);
};

describe("Test HeaderToolbar", () => {
  test("Should render logo and search field and navigation toolbar", () => {
    mockAndRender();

    const logo = screen.getByAltText("App logo");
    const searchField = screen.getByRole("textbox");
    const navigationToolbar = screen.getByText("Toolbar for specific role");

    expect(logo).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
    expect(navigationToolbar).toBeInTheDocument();
  });

  test("Should render loaders when authenticatin loading is in progress", () => {
    mockAndRender(true);

    const loaders = screen.getAllByTestId("header-icon-loader");
    expect(loaders).toHaveLength(4);
  });
});

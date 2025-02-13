import { screen } from "@testing-library/react";

import { updateProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.constants";
import DashboardUpdateProductContainer from "@/pages/dashboard/dashboard-update-product/components/dashboard-update-product-container/DashboardUpdateProductContainer";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import { RTKQueryReturnState } from "@/types/common";
import { GetManagerProductByIdResponse } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const validUUID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const mockRenderRedirectComponent = jest.fn();

jest.mock(
  "@/containers/forms/product-form/components/update-product-form/UpdateProductForm",
  () => ({
    __esModule: true,
    default: () => <div>UpdateProductForm</div>
  })
);

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    renderRedirectComponent: mockRenderRedirectComponent
  }))
}));

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductQuery: jest.fn()
}));

const mockData = {} as GetManagerProductByIdResponse;

const defaultParams = {
  data: mockData,
  isLoading: false,
  error: null
};

const mockAndRender = (
  response: Partial<
    RTKQueryReturnState<GetManagerProductByIdResponse, unknown>
  > = defaultParams
) => {
  (useGetManagerProductQuery as jest.Mock).mockReturnValue(response);
  renderWithProviders(
    <DashboardUpdateProductContainer productId={validUUID} />
  );
};

describe("DashboardUpdateProductContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render title and update form", () => {
    mockAndRender();

    const title = screen.getByText("product.update.title");
    const form = screen.getByText("UpdateProductForm");

    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test("Should call useGetManagerProductQuery with productId", () => {
    mockAndRender();

    expect(useGetManagerProductQuery).toHaveBeenCalledWith({
      productId: validUUID
    });
  });

  test("Should show error message if there is some request error that is not 404", () => {
    mockAndRender({
      error: { status: 500 },
      data: mockData
    });

    const label = screen.getByText("errors.somethingWentWrong");
    expect(label).toBeInTheDocument();

    expect(mockRenderRedirectComponent).not.toHaveBeenCalled();
  });

  test("Should redirect to not found page if we get 404 error", () => {
    mockAndRender({
      error: { status: 404 }
    });

    expect(mockRenderRedirectComponent).toHaveBeenCalledWith(
      updateProductPageNotFoundErrorConfig
    );
  });

  test("Should display loding fallback while loading", () => {
    mockAndRender({
      isLoading: true
    });

    const label = screen.getByTestId("page-loading-fallback");
    expect(label).toBeInTheDocument();
  });
});

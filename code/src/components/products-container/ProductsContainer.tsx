import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";
import { ProductsContainerProps } from "@/components/products-container/ProductsContainer.types";

import { Product } from "@/types/product.types";
import cn from "@/utils/cn/cn";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

import "@/components/products-container/ProductsContainer.scss";

const ProductsContainer = ({
  products,
  className,
  isLoading = false,
  isError = false,
  loadingItemsCount = 5,
  errorMessage = "errors.somethingWentWrong"
}: ProductsContainerProps) => {
  if (isError) {
    return (
      <AppBox className={cn("products-container_error", className)}>
        <AppTypography
          translationKey={errorMessage}
          className="products-container__error-label"
        />
      </AppBox>
    );
  }

  const skeletonCards = repeatComponent(<ProductSkeleton />, loadingItemsCount);

  const productCards = products.map((product: Product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const gridItems = isLoading ? skeletonCards : productCards;

  return (
    <AppBox className={cn("products-container", className)}>{gridItems}</AppBox>
  );
};

export default ProductsContainer;

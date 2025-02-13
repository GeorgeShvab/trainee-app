import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { orderBadgeVariants } from "@/containers/order-item/OrderItem.constants";
import OrderItemDetails from "@/containers/order-item/components/order-item-details/OrderItemDetails";

import {
  AppAccordionContainer,
  AppAccordionDetails,
  AppAccordionSummary
} from "@/components/app-accordion/AppAccordion";
import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { UserOrder } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";

import "@/containers/order-item/OrderItem.scss";

type OrderItemProps = {
  order: UserOrder;
  isExpanded?: boolean;
};

const OrderItem = ({ order, isExpanded }: OrderItemProps) => {
  const { createdAt, orderStatus, isPaid } = order;

  const orderDeliveryStatus = orderStatusesTranslationKeys[orderStatus];

  const orderPaymentStatusContent = (
    <AppTypography
      className="spa-order-item__badge-status"
      variant="caption-small"
      translationKey={
        isPaid ? "orderProductItem.payed" : "orderProductItem.notPayed"
      }
    />
  );
  const orderDeliveryStatusContent = (
    <AppTypography
      variant="caption-small"
      className="spa-order-item__badge-status"
      translationKey={orderDeliveryStatus}
    />
  );

  return (
    <AppAccordionContainer
      expanded={isExpanded}
      className="spa-order-item__container"
    >
      <AppAccordionSummary
        className="spa-order-item__title"
        expandIcon={!isExpanded && <ExpandMoreIcon />}
      >
        <AppBox className="spa-order-item__status">
          <AppTypography
            className="spa-order-item__status"
            variant="caption"
            fontWeight="extra-bold"
          >
            {formatDate(createdAt)}
          </AppTypography>
          <AppBadge
            variant={orderBadgeVariants[orderDeliveryStatus]}
            badgeContent={orderDeliveryStatusContent}
          />
        </AppBox>
        <AppBadge
          variant={isPaid ? "success" : "danger"}
          badgeContent={orderPaymentStatusContent}
        />
      </AppAccordionSummary>
      <AppAccordionDetails>
        <OrderItemDetails order={order} />
      </AppAccordionDetails>
    </AppAccordionContainer>
  );
};

export default OrderItem;

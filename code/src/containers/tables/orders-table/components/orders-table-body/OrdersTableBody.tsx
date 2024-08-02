import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MenuItem } from "@mui/material";

import { orderBadgeVariants } from "@/containers/order-item/OrderItem.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppSelect from "@/components/app-select/AppSelect";
import { AppTableCell } from "@/components/app-table/components";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { orderDeliveryStatuses } from "@/constants/orderStatuses";
import routes from "@/constants/routes";
import { AdminOrder, OrderIsPaid, OrderStatus } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody.scss";

type OrderTableBodyProps = {
  order: AdminOrder;
  onStatusChange: (status: OrderStatus) => void;
  onIsPaidChange: (isPaid: OrderIsPaid) => void;
};

const OrdersTableBody = ({
  order,
  onStatusChange,
  onIsPaidChange
}: OrderTableBodyProps) => {
  const {
    id,
    createdAt,
    total,
    orderStatus,
    receiver: { firstName, lastName, email },
    postAddress: { deliveryMethod },
    isPaid
  } = order;

  const orderReceiver = `${lastName} ${firstName}`;

  const statusBlock = (
    <AppSelect
      defaultValue={orderStatus}
      value={orderStatus}
      className="spa-order-table__body-status-select"
      data-testid="order-status"
      MenuProps={{
        PaperProps: {
          className: "spa-order-table__body-status-select",
          "data-testid": "order-status-menu"
        }
      }}
      inputProps={{
        className: "spa-order-table__body-status-select-input",
        "data-testid": "order-status-input"
      }}
    >
      {Object.keys(orderStatusesTranslationKeys).map((status) => {
        const orderBadgeItemStatus = (
          <AppTypography
            className="spa-order-table__body-status-text"
            variant="caption"
            translationKey={orderStatusesTranslationKeys[status as OrderStatus]}
          />
        );

        const handleStatusChange = () => {
          onStatusChange(status as OrderStatus);
        };

        return (
          <MenuItem value={status} key={status} onClick={handleStatusChange}>
            <AppBadge
              variant={
                orderBadgeVariants[
                  orderStatusesTranslationKeys[status as OrderStatus]
                ]
              }
              badgeContent={orderBadgeItemStatus}
            />
          </MenuItem>
        );
      })}
    </AppSelect>
  );

  const handleIsPaidChange = () => {
    !isPaid && onIsPaidChange(true);
  };

  const emailField = (
    <AppTypography variant="caption" className="spa-order-table__body-email">
      {email}
    </AppTypography>
  );

  const notPaidOrderCheckbox =
    orderStatus !== orderDeliveryStatuses.CANCELED ? (
      <AppTooltip
        followCursor
        titleTranslationKey="ordersTable.notpaid.tooltip"
      >
        <AppCheckbox
          className="spa-order-table__body-checkbox"
          onChange={handleIsPaidChange}
        />
      </AppTooltip>
    ) : (
      <AppTooltip
        followCursor
        titleTranslationKey="ordersTable.canceled.tooltip"
      >
        <AppCheckbox className="spa-order-table__body-checkbox" disabled />
      </AppTooltip>
    );

  const isPaidField = isPaid ? (
    <AppTooltip followCursor titleTranslationKey="ordersTable.ispaid.tooltip">
      <AppCheckbox
        className="spa-order-table__body-checkbox"
        checked
        disabled
      />
    </AppTooltip>
  ) : (
    notPaidOrderCheckbox
  );

  return (
    <>
      <AppTableCell>{orderReceiver}</AppTableCell>
      <AppTableCell>{emailField}</AppTableCell>
      <AppTableCell>{statusBlock}</AppTableCell>
      <AppTableCell>{formatDate(createdAt)}</AppTableCell>
      <AppTableCell>{deliveryMethod}</AppTableCell>
      <AppTableCell>{formatPrice(total)}</AppTableCell>
      <AppTableCell>{isPaidField}</AppTableCell>
      <AppTableCell>
        <AppLink to={routes.dashboard.orderDetails.path(id)}>
          <AppIconButton>
            <MoreHorizIcon />
          </AppIconButton>
        </AppLink>
      </AppTableCell>
    </>
  );
};

export default OrdersTableBody;

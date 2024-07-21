import { fireEvent, render, screen } from "@testing-library/react";

import { mockOrders } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";

const mockStatusChange = jest.fn();

describe("OrdersTableBody", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <OrdersTableBody
              onStatusChange={mockStatusChange}
              order={mockOrders[0]}
            />
          </tr>
        </tbody>
      </table>
    );
  });

  test("renders order information correctly", () => {
    const ordersId = screen.getByText(mockOrders[0].id);
    const ordersReceiver = screen.getByText(
      `${mockOrders[0].receiver.firstName} ${mockOrders[0].receiver.lastName}`
    );
    const doneIcon = screen.getByTestId(/DoneIcon/);

    expect(doneIcon).toBeInTheDocument();
    expect(ordersId).toBeInTheDocument();
    expect(ordersReceiver).toBeInTheDocument();
  });

  test("Should render select elements properly", () => {
    const statusSelectText = screen.getByText("orders.statuses.inProgress");
    const statusSelect = screen.getByTestId("order-status");

    fireEvent.mouseDown(statusSelectText);

    const probableIcon = statusSelect.getElementsByTagName("svg")[0];

    const statusSelectMenu = screen.getByTestId("order-status-menu");
    const statusSelectInput = screen.getByTestId("order-status-input");

    expect(probableIcon).toBeUndefined();
    expect(statusSelectMenu).toBeInTheDocument();
    expect(statusSelectInput).toBeInTheDocument();
  });

  test("Should change order status", () => {
    const statusSelect = screen.getByText("orders.statuses.inProgress");

    fireEvent.mouseDown(statusSelect);

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(5);

    const desiredStatus = screen.getByText("orders.statuses.delivered");

    fireEvent.click(desiredStatus);

    expect(mockStatusChange).toHaveBeenCalledWith("DELIVERED");
  });
});

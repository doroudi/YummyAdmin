import { OrderStatus } from '~/models/Order'

export function useOrders() {
  function getStatusColor(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Submitted:
        return 'info'
      case OrderStatus.Processing:
        return 'success'
      case OrderStatus.ReadyToSend:
        return 'warning'
      case OrderStatus.Sent:
        return 'success'
      case OrderStatus.Delivered:
        return 'success'
    }
  }
  return {
    getStatusColor,
  }
}

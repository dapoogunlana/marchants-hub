import { IorderSettings } from "../constants/interfaces/product-and-orders-schema";


  export const calculateProductCost = (productList: any, costSetting: IorderSettings) => {
    console.log({productList, costSetting});
    let productsCost = 0;
    productList.map((item: any) => {
      console.log({qty: item.quantity});
      productsCost += (item.amount * item.quantity);
    });
    let deliveryCost = productsCost * (costSetting.deliveryFee.percent/100);
    if (deliveryCost > costSetting.deliveryFee.max) {
        deliveryCost = costSetting.deliveryFee.max;
    }
    if (deliveryCost < costSetting.deliveryFee.min) {
        deliveryCost = costSetting.deliveryFee.min;
    }
    let charges = (productsCost + deliveryCost) * (costSetting.orderFee.percent/100);
    if (charges > costSetting.orderFee.max) {
        charges = costSetting.orderFee.max;
    }
    if (charges < costSetting.orderFee.min) {
        charges = costSetting.orderFee.min;
    }
    const totalCost = productsCost + deliveryCost + charges;
    console.log({
      totalCost,
      productsCost,
      deliveryCost,
      charges,
    });
    return {
      totalCost,
      productsCost,
      deliveryCost,
      charges,
    }
  }
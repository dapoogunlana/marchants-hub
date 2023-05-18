import { IorderSettings, sampleOrderSettings } from "../constants/interfaces/product-and-orders-schema";
import { sendRequest } from "./request";


export const calculateProductCost = (productList: any, costSetting: IorderSettings) => {
  // console.log({productList, costSetting});
  let productsCost = 0;
  productList.map((item: any) => {
    productsCost += (item.amount * item.quantity);
  });
  let deliveryCost = productsCost * (costSetting.deliveryFee.percent/100);
  if (deliveryCost > costSetting.deliveryFee.max) {
      deliveryCost = costSetting.deliveryFee.max;
  }
  if (deliveryCost < costSetting.deliveryFee.min) {
      deliveryCost = costSetting.deliveryFee.min;
  }
  let charges = (productsCost) * (costSetting.orderFee.percent/100);
  if (charges > costSetting.orderFee.max) {
      charges = costSetting.orderFee.max;
  }
  if (charges < costSetting.orderFee.min) {
      charges = costSetting.orderFee.min;
  }
  const totalCost = productsCost + deliveryCost + charges;
  // console.log({
  //   totalCost,
  //   productsCost,
  //   deliveryCost,
  //   charges,
  // });
  return {
    totalCost,
    productsCost,
    deliveryCost,
    charges,
  }
}
export const calculateProductDisplayCost = (productsCost: any, costSetting: IorderSettings) => {
  let charges = productsCost * (costSetting.orderFee.percent/100);
  if (charges > costSetting.orderFee.max) {
      charges = costSetting.orderFee.max;
  }
  if (charges < costSetting.orderFee.min) {
      charges = costSetting.orderFee.min;
  }
  const totalCost = productsCost + charges;
  console.log({
    totalCost,
    charges,
  });
  return totalCost;
}


  const listProducts = (products: any[]) => {
    const list: any[] = [];
    products.map((product) => {
      list.push({
          product: product._id,
          quantity: Math.round(product.quantity),
          amount: Math.round(product.amount)
      });
    });
    return list;
  }

  export const prepareCreateOrderPayload = (products: any, costData: any, buyerData: any, sellerDetail: any, slug: string) => {
    const payload = {
      customerName: buyerData.name,
      storeSlug: slug,
      deliveryDistance: 5,
      isPaid: true,
      reference: sellerDetail.initiationTranRef,
      customerEmail: buyerData.email,
      customerPhoneNumber: buyerData.phoneNumber,
      customerAddress: buyerData.address,
      products: listProducts(products),
      productsCost: Math.round(costData.productsCost),
      deliveryCost: Math.round(costData.deliveryCost),
      charges: Math.round(costData.charges), 
      totalCost: Math.round(costData.totalCost)
    }
    return payload;
  }

  export const getCostRates = (callback: Function) => {
    sendRequest({
        url: `get/setting`,
        method: 'POST',
    }, (res: any) => {
      callback(res?.data?.length > 0 ? res?.data[0] : sampleOrderSettings);
    }, (err: any) => {});
  }
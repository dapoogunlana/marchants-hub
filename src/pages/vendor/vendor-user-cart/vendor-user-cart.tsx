import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginatedItems from '../../../components/base-components/pagination-component/pagination-component';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { addCartItem, changeCartItemQuantity, removeCartItem } from '../../../services/actions/cart-actions';
import { removeActiveProduct, setActiveProduct } from '../../../services/actions/product-actions';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { IorderSettings, Iproduct, sampleOrderSettings } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData } from '../../../services/constants/interfaces/state-schemas';
import { routeConstants } from '../../../services/constants/route-constants';
import { formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { calculateProductCost } from '../../../services/utils/product-cost-service';
import { sendRequest } from '../../../services/utils/request';
import { swalDanger } from '../../../services/utils/swal-utils';
import './vendor-user-cart.scss';

function VendorUserCart(props: any) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slug = useParams().slug || '';
  const cart = useSelector((item: IstoreState) => item.cart);

  const [storeName, setStoreName] = useState('STORE');
  const [costs, setCosts] = useState<any>({})
  const [settings, setSettings] = useState<IorderSettings>(sampleOrderSettings);


  const getCostRates = () => {
    sendRequest({
        url: `get/setting`,
        method: 'POST',
    }, (res: any) => {
      setSettings(res.data[0] || sampleOrderSettings);
      getOrderCosts(res.data[0] || sampleOrderSettings);
    }, (err: any) => {});
  }

  const getOrderCosts = (cost: IorderSettings) => {
    const costEstimate = calculateProductCost(cart, cost);
    setCosts(costEstimate);
  }

  const previousPage = () => {
    window.history.back();
  }

  const removeProductFromCart = (product: Iproduct) => {
    swalDanger.fire({
      title: 'Remove from Cart',
      text: `Are you sure you wish to remove this item (${product.name})`,
      icon: 'error',
    }).then((result: any) => {
      if(result.isConfirmed) {
        dispatch(removeCartItem(product));
      }
    })
  }

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      return toast.error('No items in cart to checkout please return to shopping list')
    }
    navigate(`/${routeConstants.checkout}/${slug}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCostRates();
    dispatch(removeActiveProduct());
    setStoreName((slug?.replace(/-/g, ' ') || storeName).substring(0, 20).toLocaleLowerCase());
  }, [props]);

  useEffect(() => {
    getOrderCosts(settings);
  }, [cart]);
  
  return (
    <>
      <StoreHeader storeName={storeName} />
      <div className='w90 max1200 py-5 cart'>
        <div className='row'>
          <div className='col-md-12 pb-4'>
            <button className='hollow-button-black px-4 reduced-soft' onClick={previousPage}>Back</button>
            <span className='py-3 px-4'>Cart</span>
          </div>
          <div className='col-lg-5 py-3'>
            <div className=''>
              <div className='py-3 px-3 spread-info summary-green-space'>
                <div className=''>
                  <p className='reduced-x mb-0'>Total Items</p>
                  <h2 className='h-black mb-0'>{cart.length}</h2>
                </div>
                <div className=''>
                  <p className='reduced-x mb-0'>Delivery fee</p>
                  <h2 className='h-black mb-0'>N{formatNumber(costs.deliveryCost)}</h2>
                </div>
                <div className=''>
                  <p className='reduced-x mb-0'>Charges</p>
                  <h2 className='h-black mb-0'>N{formatNumber(costs.charges)}</h2>
                </div>
              </div>
              <div className='py-3 px-3 summary-green-space'>
                <div className=''>
                  <p className='reduced-x mb-0'>Total Amount</p>
                  <h2 className='h-black mb-0'>N{formatNumber(costs.totalCost)}</h2>
                </div>
              </div>
              <div className='p-1 text-center summary-green-button'>
                <div className=''>
                  <p className='mb-0 h-bold reduced-soft' onClick={proceedToCheckout}>Proceed to Checkout</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-7 py-3'>
            <div className=''>
              {
                cart.map((cartItem: Iproduct, index: number) => (
                  <div className='cart-item-box' key={index}>
                    <div className='py-2 px-2'>
                      <Link to={`/${routeConstants.onlineStore}/${slug}/${cartItem._id}`}>
                        <p className='mb-0 underlined'>{cartItem.name}</p>
                      </Link>
                    </div>
                    <div className='spread-info py-2 px-2'>
                      <div className='quantity'>
                        {
                          cartItem.quantity < cartItem.availableQuantity &&
                          <div className='increase' onClick={() => dispatch(changeCartItemQuantity(index, true))}>
                            <i className="fa-solid increased fa-chevron-up"></i>
                          </div>
                        }
                        <p className='mb-0'>Quantiny: {cartItem.quantity}</p>
                        {
                          cartItem.quantity > 1 &&
                          <div className='decrease' onClick={() => dispatch(changeCartItemQuantity(index, false))}>
                            <i className="fa-solid increased fa-chevron-down"></i>
                          </div>
                        }
                      </div>
                      <h6 className='h-black mb-0 increased'>{formatNumber(cartItem.amount)}</h6>
                        <p className='mb-0 c-red underlined-red' onClick={() => removeProductFromCart(cartItem)}>Remove</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <StoreFooter storeName={storeName} />
    </>
  );
}

export default VendorUserCart;

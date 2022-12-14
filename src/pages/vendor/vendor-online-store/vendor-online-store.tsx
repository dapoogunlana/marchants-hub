import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { setActiveProduct } from '../../../services/actions/product-actions';
import { Iproduts } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData, Istate } from '../../../services/constants/interfaces/state-schemas';
import { routeConstants } from '../../../services/constants/route-constants';
import { stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../services/utils/request';
import './vendor-online-store.scss';

function VendorOnlineStore() {
  
  const [products, setProducts] = useState<Iproduts[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionData :IsessionData = useSelector((state: Istate) => state.session);


  const getProducts = () => {
    const params = {
      store: sessionData._id,
      limit: 10000,
    }
    sendRequest({
        url: `get/products` + stringifyFilter(params),
        method: 'POST',
        body: {}
    }, (res: any) => {
        // navigate(routeConstants.login);
        console.log({res})
        setProducts(res.data)
    }, (err: any) => {
    });
  }

  const viewProduct = (product: any) => {
    dispatch(setActiveProduct(product));
    navigate(`/${routeConstants.onlineStore}/${product._id}`);
  }

  const addProductToCart = (product: any) => {
    toast.info('Under Development');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);
  
  return (
    <>
      <StoreHeader/>
      <div className='top-banner py-5'>
        <div className='w90 max600'>
          <h1 className='text-center'>Online Store</h1>
          <p className='text-center'>
            Experience great shopping experience from product checkout to successful 
            delivery at your location. We???ve got you covered!
          </p>
          <div className='search-panel'>
            <div className='input'>
              <input type="text" placeholder='Search by product name' />
            </div>
            <div className='action'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div className='main-store-sect py-5'>
        <div className='w90 max1200 row'>
          {products.map((item, index) => (
            <div className='col-lg-4 col-md-6' key={index} data-aos="fade-up" data-aos-delay={(index * 100)}>
              <div className='store-card'>
                <div className='image-holder' style={{backgroundImage: `url(${item.images[0]?.photoUrl})`}}>
                  {/* <img src={item.images[0]?.photoUrl} alt="" /> */}
                </div>
                <h6 className='text-center min-41'>{item.name}</h6>
                <div className='spread-info'>
                  <h6 className='mb-0 increased-x'>{item.amount}</h6>
                  <p className='mb-0 increased-soft'>{item.availableQuantity} in stock</p>
                </div>
                <div className='info-grid pt-2'>
                  <button className='solid-button reduced-soft' onClick={() => viewProduct(item)}>View</button>
                  <span></span>
                  <button className='hollow-button reduced-soft' onClick={() => addProductToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StoreFooter/>
    </>
  );
}

export default VendorOnlineStore;

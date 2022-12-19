import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { Iproduts, sampleProdut } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData, Istate } from '../../../services/constants/interfaces/state-schemas';
import { routeConstants } from '../../../services/constants/route-constants';
import { stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../services/utils/request';
import './vendor-online-store-item.scss';

function VendorOnlineStoreItem() {
  
  const [product, setProduct] = useState<Iproduts>(sampleProdut);
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;
  
  const sessionData :IsessionData = useSelector((state: Istate) => {
    console.log({state});
    return state.session
  });


  const getProduct = () => {
    const params = {
      store: sessionData._id,
      limit: 10000,
    }
    sendRequest({
        url: `products/` + id
    }, (res: any) => {
        // navigate(routeConstants.login);
        console.log({res})
        setProduct(res.data)
    }, (err: any) => {
    });
  }

  const buyProduct = (product: any) => {
    toast.info('Under Development');
  }

  const addProductToCart = (product: any) => {
    toast.info('Under Development');
  }

  const goBack = () => {
    navigate(`/${routeConstants.onlineStore}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
  }, []);
  
  return (
    <>
      <StoreHeader/>
      <div className='single-store-item py-5'>
        <div className='w90 max550'>
          <button className='hollow-button reduced-soft px-3' onClick={() => goBack()}>Back</button>
        </div>
        <div className='w90 max1200'>
              <div className='store-card'>
                <div className='image-holder imh'>
                  <img src={product.images[0]?.photoUrl} alt="" />
                </div>
                <h6 className=''>{product.name}</h6>
                <p className='reduced c-dark-grey'>{product.description}</p>
                <div className='spread-info'>
                  <h6 className='mb-0 increased'>₦{product.amount}</h6>
                  <p className='mb-0'>{product.availableQuantity} in stock</p>
                </div>
                <div className='row pt-4 pb-2'>
                  <div className='col-sm-8'>
                    <textarea name="specifications" id="specifications" placeholder='Enter order details such as size' rows={2}></textarea>
                  </div>
                  <div className='col-sm-4'>
                    <input type="number" placeholder='quantity' />
                  </div>
                </div>
                <div className='info-grid pt-2'>
                  <button className='solid-button reduced-soft' onClick={() => buyProduct(product)}>Buy Now</button>
                  <span></span>
                  <button className='hollow-button reduced-soft' onClick={() => addProductToCart(product)}>Add to Cart</button>
                </div>
              </div>
        </div>
      </div>
      <StoreFooter/>
    </>
  );
}

export default VendorOnlineStoreItem;

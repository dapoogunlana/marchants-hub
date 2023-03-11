import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import PaginatedItems from '../../../components/base-components/pagination-component/pagination-component';
import StoreFooter from '../../../components/block-components/store-footer/store-footer';
import StoreHeader from '../../../components/block-components/store-header/store-header';
import { addCartItem } from '../../../services/actions/cart-actions';
import { setActiveProduct } from '../../../services/actions/product-actions';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { Iproduct } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData } from '../../../services/constants/interfaces/state-schemas';
import { routeConstants } from '../../../services/constants/route-constants';
import { formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../services/utils/request';
import './vendor-online-store.scss';

function VendorOnlineStore(props: any) {
  
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionData :IsessionData = useSelector((state: IstoreState) => state.session);
  const slug = useParams().slug || '';

  const [storeName, setStoreName] = useState('STORE');


  const getProducts = () => {
    const params = {
      storeSlug: slug,
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
        setProducts(res.data);
        setProductsLoaded(true);
    }, (err: any) => {
    });
  }

  const viewProduct = (product: any) => {
    // dispatch(setActiveProduct(product));
    navigate(`/${routeConstants.onlineStore}/${slug}/${product._id}`);
  }

  const addProductToCart = (product: any) => {
    dispatch(addCartItem(product));
  }

  const changePage = (pageDetails: any) => {
    console.log(pageDetails);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    setStoreName((slug?.replace(/-/g, ' ') || storeName).substring(0, 20).toLocaleLowerCase());
  }, []);
  
  return (
    <>
      <StoreHeader storeName={storeName} />
      <div className='top-banner py-5'>
        <div className='w90 max600'>
          <h1 className='text-center'>Online Store</h1>
          <p className='text-center'>
            Experience great shopping experience from product checkout to successful 
            delivery at your location. We’ve got you covered!
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
      {
        productsLoaded ?
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
                    <h6 className='mb-0 increased-x'>₦{formatNumber(item.amount)}</h6>
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
            {products.length > 0 && <div className='py-4 w96'>
              <PaginatedItems itemsPerPage={1} changePage={changePage} />
            </div>}
          </div>
          {products.length === 0 && <h4 className='text-center py-5'>This store has no products presently</h4>}
        </div> :
        <div className='main-store-sect py-5'>
          <div className='w90 max1200'>
            <h4 className='text-center py-5'>Loading . . .</h4>
          </div>
        </div>
      }
      <StoreFooter storeName={storeName} />
    </>
  );
}

export default VendorOnlineStore;

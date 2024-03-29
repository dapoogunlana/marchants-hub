import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ActionModal from '../../../components/block-components/modals/action-modal/action-modal';
import NewProductModal from '../../../components/block-components/modals/new-product-modal/new-product-modal';
import { IstoreState } from '../../../services/constants/interfaces/data-schemas';
import { Iproduct, sampleOrderSettings } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData } from '../../../services/constants/interfaces/session-schemas';
import { deleteProductMessage } from '../../../services/constants/product-dummy-constants';
import { formatNumber, stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { calculateProductDisplayCost, getCostRates } from '../../../services/utils/product-cost-service';
import { sendRequest } from '../../../services/utils/request';
import './vendor-products.scss';

function VendorProducts(props: any) {

  const [filter, setFilter] = useState<any>({ name: '' });
  const [viewNewProduct, setViewNewProduct] = useState(false);
  const [viewEditProduct, setViewEditProduct] = useState(false);
  const [viewRestockProduct, setViewRestockProduct] = useState(false);
  const [viewDeleteProduct, setViewDeleteProduct] = useState(false);
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(0);
  const [activeProduct, setActiveProduct] = useState();
  const [costRate, setCostRate] = useState(sampleOrderSettings);
  
  const sessionData :IsessionData = useSelector((state: IstoreState) => state.session);

  const submit = () => {
    getProducts();
  }

  const updateForm = (field: string, ev: any) => {
    const newFilter = {...filter};
    const value = ev.target.value;
    newFilter[field] = value;
    setFilter(newFilter);
  }

  const openNewProductModal = (id: any) => {
    setViewNewProduct(true);
  }

  const closeNewProductModal = (feedback?: any) => {
    setViewNewProduct(false);
    if (feedback === 'refresh') {
      getProducts();
    }
  }

  const openEditProductModal = (product: any) => {
    setActiveProduct(product)
    setViewEditProduct(true);
  }

  const closeEditProductModal = (feedback?: any) => {
    setViewEditProduct(false);
    if (feedback === 'refresh') {
      getProducts();
    }
  }

  const openRestockProductModal = (product: any) => {
    setActiveProduct(product)
    setViewRestockProduct(true);
  }

  const closeRestockProductModal = (feedback?: any) => {
    setViewRestockProduct(false);
    if (feedback === 'refresh') {
      getProducts();
    }
  }

  const getProducts = () => {
    const params = {
      store: sessionData._id,
      limit: 10000,
    }
    const payload: any = {};
    if(filter.name) {
      payload.search = filter;
    }
    setProductsLoading(0)
    sendRequest({
        url: `get/products` + stringifyFilter(params),
        method: 'POST',
        body: payload
    }, (res: any) => {
      setProductsLoading(1);
        setProducts(res.data);
    }, (err: any) => {
      setProductsLoading(2);
    });
  }

  const openDeleteProductModal = (product: any) => {
    setActiveProduct(product);
    setViewDeleteProduct(true);
  }
  
  const deleteProduct = (item?: any, feedback?: any) => {
    setViewDeleteProduct(false);
    if (feedback) {
      sendRequest({
          url: 'products/' + item?._id,
          method:'DELETE',
      }, (res: any) => {
          toast.success(res.message);
          getProducts();
          return;
      }, (err: any) => {
          toast.error(err.error?.emailError || err.message || 'Unable to complete');
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    getCostRates((cost: any) => setCostRate(cost));
  }, [props]);
  
  return (
    <>
      <div className='vendor-products py-5'>
        <div className='top-menu'>
          <div className='input-space'>
            <div className="row">
              <div className='col-10 py-1'>
                <div className='input-style'>
                  <input type="text" placeholder="Search by product name" value={filter.name} onChange={(e) => updateForm('name', e)} />
                </div>
              </div>
              {/* <div className='col-1'></div> */}
              <div className='col-2 py-1 pl-0'>
                <button className="search-hollow-button" onClick={submit}>Go</button>
              </div>
            </div>
          </div>
          <button className='solid-button' onClick={openNewProductModal}>
            <i className="fa-solid fa-circle-plus mr-2"></i>
            Add Product
          </button>
        </div>
        {
          productsLoading === 1 &&
          <div className='row'>
            {
              products.length > 0 ?
              products.map((item, index) => (
                <div className='col-lg-3 col-md-4 col-sm-6' key={index} data-aos="fade-up" data-aos-delay={(index * 100)}>
                  <div className='store-card'>
                    <div className='image-holder' style={{backgroundImage: `url(${item.images[0]?.photoUrl})`}}>
                      {/* <img src={item.images[0]?.photoUrl} alt="" /> */}
                    </div>
                    <h6 className='text-center min-41'>{item.name}</h6>
                    <div className='spread-info'>
                      <h6 className='mb-0'>₦{formatNumber(item.amount)}</h6>
                      <p className='mb-0 reduced-x'>{item.availableQuantity} in stock</p>
                    </div>
                    <p className='mb-0 my-2 reduced-x c-pr-green'>Price + Fee: ₦{formatNumber(calculateProductDisplayCost(item.amount, costRate))}</p>
                    
                    <div className='info-grid pt-2'>
                      <button className='solid-button reduced px-3' onClick={() => openEditProductModal(item)}>Edit</button>
                      <span></span>
                      <button className='hollow-button reduced' onClick={() => openDeleteProductModal(item)}>Delete</button>
                    </div>
                    {item.availableQuantity === 0 && <div className='out-of-scock-banner center-info-col' data-aos="fade-in" data-aos-delay={(index * 100) + 600}>
                      <p className='increased'>Out of stock</p>
                      <button className='solid-button rad-3-im px-3' onClick={() => openRestockProductModal(item)}>&nbsp;&nbsp; Restock &nbsp;&nbsp;</button>
                      <span className='py-2'></span>
                      <button className='hollow-button reduced rad-3-im px-3' onClick={() => openDeleteProductModal(item)}><span className='py-1 px-2'>Delete</span></button>
                    </div>}
                  </div>
                </div>
              )) :
              <div className='col-md-12 py-5'>
                <div className='py-5'>
                  <h5 className='text-center py-5 font-weight-bold increased-x'>No Products Available</h5>
                </div>
              </div>
            }
          </div>
        }
        {
          productsLoading === 0 &&
          <div className='py-5'>
            <div className='py-5'>
              <h5 className='text-center py-5 font-weight-bold increased-x'>Loading...</h5>
            </div>
          </div>
        }
        {
          productsLoading === 2 &&
          <div className='py-5'>
            <div className='py-5'>
              <h5 className='text-center py-5 font-weight-bold increased-x'>Failed To Load</h5>
            </div>
          </div>
        }
      </div>
      {viewNewProduct && <NewProductModal closeModal={closeNewProductModal} />}
      {viewEditProduct && <NewProductModal title={'Edit'} product={activeProduct} closeModal={closeEditProductModal} />}
      {viewRestockProduct && <NewProductModal title={'Restock'} product={activeProduct} closeModal={closeRestockProductModal} />}
      {viewDeleteProduct && <ActionModal title={'Delete'} writeup={deleteProductMessage} product={activeProduct} closeModal={deleteProduct} />}
    </>
  );
}

export default VendorProducts;

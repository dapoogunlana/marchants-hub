import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NewProductModal from '../../../components/block-components/modals/new-product-modal/new-product-modal';
import { Iproduts } from '../../../services/constants/interfaces/product-and-orders-schema';
import { IsessionData, Istate } from '../../../services/constants/interfaces/state-schemas';
import { storeItemList } from '../../../services/constants/product-dummy-constants';
import { stringifyFilter } from '../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../services/utils/request';
import { swal } from '../../../services/utils/swal-utils';
import './vendor-products.scss';

function VendorProducts() {

  const [filter, setFilter] = useState<any>({ name: '' });
  const [viewNewProduct, setViewNewProduct] = useState(false);
  const [viewEditProduct, setViewEditProduct] = useState(false);
  const [viewRestockProduct, setViewRestockProduct] = useState(false);
  const [products, setProducts] = useState<Iproduts[]>([]);
  const [activeProduct, setActiveProduct] = useState();
  
  const sessionData :IsessionData = useSelector((state: Istate) => state.session);

  const submit = () => {
    submitFilters(filter);
  }
  const submitFilters = (filter: any) => {
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

  const openEditProductModal = (id: any) => {
    setActiveProduct(id)
    setViewEditProduct(true);
  }

  const closeEditProductModal = (feedback?: any) => {
    console.log({feedback});
    setViewEditProduct(false);
    if (feedback === 'refresh') {
      getProducts();
    }
  }

  const openRestockProductModal = (id: any) => {
    setActiveProduct(id)
    setViewRestockProduct(true);
  }

  const closeRestockProductModal = (feedback?: any) => {
    console.log({feedback});
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
  
  const deleteProduct = (item: any) => {
    swal.fire({
        title: 'Delete Product',
        text: `You are about to delete a product from you inventory (${item.name}), once you do this, it will no longer be 
        displayed on your products page and also on your online store`,
        icon: 'error',
    }).then((result: any) => {
        if (result.isConfirmed) {
            sendRequest({
                url: 'products/' + item._id,
                method:'DELETE',
            }, (res: any) => {
                toast.success(res.message);
                getProducts();
                return;
            }, (err: any) => {
                toast.error(err.error?.emailError || err.message || 'Unable to complete');
            });
        }
    })
}

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);
  
  return (
    <>
      <div className='vendor-products py-5'>
        <div className='top-menu spread-info'>
          <div className=''>
            <div className="row">
              <div className='col-8 py-1'>
                <div className='input-style'>
                  <input type="text" placeholder="Search names" value={filter.name} onChange={(e) => updateForm('name', e)} />
                </div>
              </div>
              {/* <div className='col-1'></div> */}
              <div className='col-3 py-1'>
                <button className="hollow-button py-1 " onClick={submit}>Go</button>
              </div>
            </div>
          </div>
          <button className='solid-button' onClick={openNewProductModal}>
            <i className="fa-solid fa-circle-plus mr-2"></i>
            Add Product
          </button>
        </div>
        <div className='row'>
          {products.map((item, index) => (
            <div className='col-lg-3 col-md-4 col-sm-6' key={index} data-aos="fade-up" data-aos-delay={(index * 100)}>
              <div className='store-card'>
                <div className='image-holder' style={{backgroundImage: `url(${item.images[0]?.photoUrl})`}}>
                  {/* <img src={item.images[0]?.photoUrl} alt="" /> */}
                </div>
                <h6 className='text-center min-41'>{item.name}</h6>
                <div className='spread-info'>
                  <h6 className='mb-0'>{item.amount}</h6>
                  <p className='mb-0 reduced-x'>{item.availableQuantity} in stock</p>
                </div>
                <div className='info-grid pt-2'>
                  <button className='solid-button reduced' onClick={() => openEditProductModal(item)}>Edit</button>
                  <span></span>
                  <button className='hollow-button reduced' onClick={() => deleteProduct(item)}>Delete</button>
                </div>
                {item.availableQuantity === 0 && <div className='out-of-scock-banner center-info-col' data-aos="fade-in" data-aos-delay={(index * 100) + 600}>
                  <button className='btn btn-success rad-3-im px-3' onClick={() => openRestockProductModal(item)}>Restock</button>
                  <span className='py-3'></span>
                  <button className='hollow-button reduced rad-3-im px-3' onClick={() => deleteProduct(item)}><span className='py-1 px-2'>Delete</span></button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {viewNewProduct && <NewProductModal closeModal={closeNewProductModal} />}
      {viewEditProduct && <NewProductModal title={'Edit'} product={activeProduct} closeModal={closeEditProductModal} />}
      {viewRestockProduct && <NewProductModal title={'Restock'} product={activeProduct} closeModal={closeRestockProductModal} />}
    </>
  );
}

export default VendorProducts;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NewProductModal from '../../../components/block-components/modals/new-product-modal/new-product-modal';
import { storeItemList } from '../../../services/constants/product-dummy-constants';
import { sendRequest } from '../../../services/utils/request';
import { swal } from '../../../services/utils/swal-utils';
import './vendor-products.scss';

function VendorProducts() {

  const [filter, setFilter] = useState<any>({ name: '' });
  const [viewNewProduct, setViewNewProduct] = useState(false);
  const [viewEditProduct, setViewEditProduct] = useState(false);
  const [viewRestockProduct, setViewRestockProduct] = useState(false);
  const [productId, setProductId] = useState();

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
    setProductId(id)
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
    setProductId(id)
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
    sendRequest({
        url: `get`,
        method: 'POST',
        body: {}
    }, (res: any) => {
        // navigate(routeConstants.login);
        console.log({res})
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
                url: 'products/' + item.id,
                method:'DELETE',
            }, (res: any) => {
                if(res.responseCode === 1) {
                    toast.success(res.responseText);
                    return;
                }
                toast.error(res.responseText);
            }, (err: any) => {
                toast.error(err.error?.emailError || err.message || 'Unable to complete');
            });
        }
    })
}

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  });
  
  return (
    <>
      <div className='vendor-products pt-5'>
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
          {storeItemList.map((item, index) => (
            <div className='col-lg-3 col-md-4 col-sm-6' data-aos="fade-up" data-aos-delay={(index * 100)}>
              <div className='store-card' key={index}>
                <div className='imh'>
                  <img src={item.image} alt="" />
                </div>
                <h6 className='text-center'>{item.name}</h6>
                <div className='spread-info'>
                  <h6 className='mb-0'>{item.price}</h6>
                  <p className='mb-0 reduced-x'>{item.amount} in stock</p>
                </div>
                <div className='info-grid pt-2'>
                  <button className='solid-button reduced' onClick={() => openEditProductModal(item.id)}>Edit</button>
                  <span></span>
                  <button className='hollow-button reduced' onClick={() => deleteProduct(item)}>Delete</button>
                </div>
                {item.amount === 0 && <div className='out-of-scock-banner center-info-col' data-aos="fade-in" data-aos-delay={(index * 100) + 600}>
                  <button className='btn btn-success rad-3-im px-3' onClick={() => openRestockProductModal(item.id)}>Restock</button>
                  <span className='py-3'></span>
                  <button className='hollow-button reduced rad-3-im px-3'><span className='py-1 px-2'>Delete</span></button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {viewNewProduct && <NewProductModal closeModal={closeNewProductModal} />}
      {viewEditProduct && <NewProductModal title={'Edit'} id={productId} closeModal={closeEditProductModal} />}
      {viewRestockProduct && <NewProductModal title={'Restock'} id={productId} closeModal={closeRestockProductModal} />}
    </>
  );
}

export default VendorProducts;

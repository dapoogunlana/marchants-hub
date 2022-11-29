import React, { useEffect } from 'react';
import { storeItem } from '../../../assets/images';
import './vendor-products.scss';

function VendorProducts() {

  const storeItemList = [
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 0,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
    {
      image: storeItem,
      name: 'Gucci Shoe',
      amount: 34,
      price: '7,000',
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='vendor-products pt-5'>
        <div className='top-menu'></div>
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
                  <button className='solid-button reduced'>Edit</button>
                  <span></span>
                  <button className='hollow-button reduced'>Delete</button>
                </div>
                {item.amount === 0 && <div className='out-of-scock-banner center-info-col' data-aos="fade-in" data-aos-delay={(index * 100) + 600}>
                  <button className='btn btn-success rad-3-im'>See More</button>
                  <span className='py-3'></span>
                  <button className='hollow-button reduced rad-3-im px-3'><span className='py-1 px-2'>Delete</span></button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VendorProducts;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLgas, getState } from "../../../services/utils/core-api-util";
import './store-header.scss'

 const StoreHeader = (props: any) => {
  
  const cartCount = 20;
  const navigate = useNavigate();

  const close = () => {
    window.close();
    navigate('/');
  }

  useEffect(() => {});

  return (
    <div className="store-header">
      {/* <Link to={'/'}>5th Perfumery</Link> */}
      <p className="mb-0 clickable" style={{textTransform: 'capitalize'}} onClick={close}>{props.storeName}</p>
      <div className="cart">
        <div className="cart-count">{cartCount}</div>
        <i className="fa-solid fa-cart-shopping increased"></i>
      </div>
    </div>
  )
}

export default StoreHeader
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLgas, getState } from "../../../services/utils/core-api-util";
import './store-header.scss'

 const StoreHeader = (props: any) => {
  
  const cartCount = 20;

  useEffect(() => {});

  return (
    <div className="store-header">
      <Link to={'/'}>5th Perfumery</Link>
      <div className="cart">
        <div className="cart-count">{cartCount}</div>
        <i className="fa-solid fa-cart-shopping increased"></i>
      </div>
    </div>
  )
}

export default StoreHeader
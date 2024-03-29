import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initiateCart } from "../../../services/actions/cart-actions";
import { IstoreState } from "../../../services/constants/interfaces/data-schemas";
import { routeConstants } from "../../../services/constants/route-constants";
import './store-header.scss'

 const StoreHeader = (props: any) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state:IstoreState) => state.cart?.cartList?.length || 0);
  const slug = useParams().slug || '';

  const close = () => {
    window.close();
    navigate(`/${routeConstants.onlineStore}/${slug}`);
  }
  const goToCart = () => {
    if(!cartCount) {
      toast.warning('No items in your cart');
      return;
    }
    navigate(`/${routeConstants.cart}/${slug}`);
  }

  useEffect(() => {
    dispatch(initiateCart(slug));
  },[props]);

  return (
    <div className="store-header">
      {/* <Link to={'/'}>5th Perfumery</Link> */}
      <p className="mb-0 clickable" style={{textTransform: 'capitalize'}} onClick={close}>{props.storeName}</p>
      <div onClick={goToCart} className={'cart' + (cartCount ? ' clickable' : '')}>
        <div className={cartCount ? 'cart-count' : 'full-hidden'}>{cartCount}</div>
        <i className="fa-solid fa-cart-shopping increased"></i>
      </div>
    </div>
  )
}

export default StoreHeader
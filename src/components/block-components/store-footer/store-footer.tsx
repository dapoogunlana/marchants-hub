import { useEffect, useState } from "react";
import './store-footer.scss'

 const StoreFooter = (props: any) => {
  
  const cartCount = 20;

  useEffect(() => {
    console.log({props});
  });

  return (
    <div className="store-footer p-5">
      <h6 className="increased-x pb-4" style={{textTransform: 'capitalize'}}>{props.storeName}</h6>
      <div className="row">
        <div className="col-md-6">
          <p className="reduced-soft c-dark-grey">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
            consetetur sadipscing elitr, sed diam nonumy.
          </p>
        </div>
        <div className="col-md-4">
          <p className="reduced-soft c-dark-grey">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
            dolore magna aliquyam.
          </p>
        </div>
        <div className="col-md-2">
          <p className="reduced-soft c-dark-grey">
            08012345678
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoreFooter
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "../../../services/utils/request";
import './store-footer.scss'

 const StoreFooter = (props: any) => {
  
  const [storeDetails, setStoreDetails] = useState<any>({});
  const slug = props.storeName?.toLocaleLowerCase().replace(/ /g, '-');

  

  const getStoreDetails = () => {
    sendRequest({
      url: 'get/stores?slug=' + slug,
      method: 'POST',
    }, (res: any) => {
      setStoreDetails(res.data[0] || {});
    }, (err: any) => {});
}

  useEffect(() => {
    getStoreDetails();
  }, [props]);

  return (
    <>
      <div className="store-footer px-5 pt-5">
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
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <p className="increased-soft font-weight-bold">Contact Details</p>
            <p className="reduced-soft c-dark-grey mb-0">
              Contact Phone: {storeDetails.phoneNumber}
            </p>
            <p className="reduced-soft c-dark-grey">
              Store Email: {storeDetails.email}
            </p>
          </div>
        </div>
      </div>
      <div className="store-footer py-4 px-5">
        <p className="m-0">
          <Link to={`/`}>&copy; {new Date().getFullYear()} Vendu All rights reserved</Link>
        </p>
      </div>
    </>
  )
}

export default StoreFooter
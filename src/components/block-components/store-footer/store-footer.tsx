import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "../../../services/utils/request";
import './store-footer.scss'

 const StoreFooter = (props: any) => {
  
  const [storeDetails, setStoreDetails] = useState<any>({});
  const slug = props.storeName?.toLocaleLowerCase().replace(/ /g, '-');

  

  const getStoreDetails = () => {
    if(storeDetails.businessName) {
      return;
    }
    sendRequest({
      url: 'get/stores?slug=' + slug,
      method: 'POST',
    }, (res: any) => {
      setStoreDetails(res.data[0] || {});
    }, (err: any) => {});
  }

  const goToLink = (link: string) => {
    window.open(link);
  }

  useEffect(() => {
    getStoreDetails();
  }, [props]);

  return (
    <>
      <div className="store-footer px-5 pt-5">
        <h6 className="increased-x pb-2" style={{textTransform: 'capitalize'}}>{props.storeName}</h6>
        <div className="row">
          <div className="col-md-6">
            <p className="reduced-soft c-dark-grey">
              {storeDetails.address}
            </p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <p className="reduced-soft c-dark-grey mb-0">
              Contact Phone: {storeDetails.phoneNumber}
            </p>
            <p className="reduced-soft c-dark-grey">
              Email: {storeDetails.email}
            </p>
          </div>
        </div>
      </div>
      <div className="store-footer py-4 px-5">
        <p className="m-0 reduced-im">
          Powered by <Link to={`/`}> Vendu</Link>
          <span className="ml-5 ref-text" onDoubleClick={() => goToLink('http://paul-ogunlana.com.ng/')}>Ref</span>
        </p>
      </div>
    </>
  )
}

export default StoreFooter
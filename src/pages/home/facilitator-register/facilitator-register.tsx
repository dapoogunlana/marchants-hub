import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { routeConstants } from '../../../services/constants/route-constants';
import './facilitator-register.scss';
import Introduction from './stages/introduction/introduction';
import BvnVerificationForm from './stages/bvn-verification-form/bvn-verification-form';
import MainFormPhoneValidation from './stages/main-form-phone-validation/main-form-phone-validation';
import MainFormBiodata from './stages/main-form-biodata/main-form-biodata';
import MainFormLocationData from './stages/main-form-location-data/main-form-location-data';
import MainFormFinancialInformation from './stages/main-form-financial-information/main-form-financial-information';
import MainFormGuarantorDetails from './stages/main-form-guarantor-details/main-form-guarantor-details';
import MainFormTerms from './stages/main-form-terms/main-form-terms';
import Thanks from './stages/thanks/thanks';

function FacilitatorRegister() {

  const initialForm: any = {};

  const [level, setLevel] = useState(2);
  const [form, setForm] = useState<any>({});

  const changeLevel = (forward?: boolean) => {
    const newLevel = forward ? (level + 1) : (level - 1);
    setLevel(newLevel);
  }

  const updateForm = (payload: any, forward?: boolean) => {
    if(!forward) {
      changeLevel();
      return;
    }
    let formName = '';
    switch(level) {
      case 1:
        formName = 'otp';
        break;
      case 2:
        formName = 'biodata';
        break;
      case 3:
        formName = 'locationData';
        break;
      case 4:
        formName = 'financialInformation';
        break;
      case 5:
        formName = 'guarantorDetails';
        break;
      case 6:
        formName = 'terms';
        break;
    }
    const newForm = {...form};
    newForm[formName] = payload;
    setForm(newForm);
    changeLevel(true);
  }

  const populateBvnData = (data: any) => {
    const newForm = {...form};
    newForm.biodata = data;
    setForm(newForm);
    changeLevel(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className="facilitator-register">
        <div className="header">
          <div className="container">
            <div className="spread-info mt-4">
              <Link to={routeConstants.home}>
                <img src={Logo} className="cp-logo" alt="PlaX Logo" />
              </Link>
              <Link to={`/${routeConstants.login}`}>
                <button className="btn btn-success">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container center-content2" data-aos='zoom-in'>
          <div className='w90 my-3' data-aos="fade-up">
            {
              level < 2 && 
              <div className='facilitator-register-box smaller-box'>
                {
                  level === -1 && <Introduction changeLevel={changeLevel} />
                }
                {
                  level === 0 && <BvnVerificationForm  populateBvnData={populateBvnData} />
                }
                {
                  level === 1 && <MainFormPhoneValidation validationNumber={form.biodata?.bvn_phone} updateForm={updateForm} />
                }
              </div>
            }
            {
              level > 1 && level < 6 &&
              <div className='facilitator-register-box'>
                {
                  level === 2 && <MainFormBiodata form={form.biodata} updateForm={updateForm} />
                }
                {
                  level === 3 && <MainFormLocationData form={form.locationData} updateForm={updateForm} />
                }
                {
                  level === 4 && <MainFormFinancialInformation form={form.financialInformation} updateForm={updateForm} />
                }
                {
                  level === 5 && <MainFormGuarantorDetails form={form.guarantorDetails} updateForm={updateForm} />
                }
              </div>
            }
            {
              level > 5 && 
              <div className='facilitator-register-box smaller-box'>
                {
                  level === 6 && <MainFormTerms form={form} changeLevel={changeLevel} />
                }
                {
                  level === 7 && <Thanks form={form.biodata} />
                }
              </div>
            }
          </div>
          <div className='py-5'></div>
        </div>
      </div>
    </>
  );
}

export default FacilitatorRegister;

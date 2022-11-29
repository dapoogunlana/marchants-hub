
import React from 'react';
import { Link } from 'react-router-dom';
import { routeConstants } from '../../../../../services/constants/route-constants';
import './thanks.scss';

function Thanks(props: any) {

    return (
        <div className=''>
            <h3 className='text-center text-success'>Thank You: {props.form?.firstName}</h3>
            <p className='text-center mb-0'>
                You have successfully filled the required information to become a facilitator.
                Our team would review your details and get back to you soon.
            </p>
            <div className='text-center'>
                <Link to={routeConstants.home}>
                    <button className='btn btn-success'>Finish</button>
                </Link>
            </div>
        </div>
    );
}

export default Thanks;

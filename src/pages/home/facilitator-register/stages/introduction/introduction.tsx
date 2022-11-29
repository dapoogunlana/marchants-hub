
import React from 'react';
import './introduction.scss';

function Introduction(props: any) {

    return (
        <div className=''>
            <h3 className='text-center text-success'>NOTE:</h3>
            <p>
                You would need to grant access to your location before you can register as a facilitator. Your browser 
                will ask you for this access. Click "allow" when you are asked.
            </p>
            <div className='text-center'>
                <button className='btn btn-success' onClick={() => props.changeLevel(true)}>Continue</button>
            </div>
        </div>
    );
}

export default Introduction;

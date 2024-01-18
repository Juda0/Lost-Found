import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import jumbotronImage from "../../../assets/Keys_In_Forest.jpg";

export default function Header() {
  return (
    <header>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${jumbotronImage})`, height: '60vh' }}
      >
        <div className='mask ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className='container h-100'>
            <div className='row h-100 align-items-center'>
              <div className='col-md-6'>
                <div className='text-white text-left'>
                  <h1 className='mb-3 fw-bold'>Find your items</h1>
                  <p className='mb-3'>Lost keys, wallets, and cherished items are a thing of the past. Our user-friendly Lost and Found app makes it easy to reunite with what's rightfully yours. Say goodbye to the frustration and hello to seamless recovery.</p>
                  <button>
                    Search
                  </button>
                </div>
              </div>
              <div className='col-md-6'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

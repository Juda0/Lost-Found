import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import jumbotronImage from "../../../assets/Keys_In_Forest.jpg"


export default function Header() {
    return (
      <header>
        <div
          className='p-5 text-center bg-image'
          style={{ backgroundImage: `url(${jumbotronImage})`, height: '400px' }}
        >
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <h1 className='mb-3 w-50'>Heading</h1>
                <p className='mb-3 w-50'>Lost keys, wallets, and cherished items are a thing of the past. Our user-friendly Lost and Found app makes it easy to reunite with what's rightfully yours. Say goodbye to the frustration and hello to seamless recovery.</p>
                <button tag="a" className='mx-2' >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
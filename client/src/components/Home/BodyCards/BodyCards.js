import React from 'react';
import './bodyCards.css';
import World from '../../../assets/World.svg';
import Handshake from '../../../assets/Handshake.svg';
import Partners from '../../../assets/Partners.svg';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

export default function BodyCards() {
  return (
    <>
      <div className='bodyCardsContainer pb-5' >
        <MDBContainer >
          <MDBRow className='mt-5'>
            <MDBCol size='md'>
              <div className='mt-5 d-flex align-items-center justify-content-center'>

                <div className="card mb-5 mt-10 cardShared">
                  <div className="card-body text-center">
                    <img src={World} className="card-img-top cardImgSmall" alt="Fissure in Sandstone" />
                    <h2 className="card-title fw-bold mt-5">Total users</h2>
                    <h3 className="card-text">40+ million</h3>
                  </div>
                </div>
              </div>

            </MDBCol>
            <MDBCol size='md'>
              <div className="card cardShared cardBig">
                <div className="card-body text-center">
                  <img src={Handshake} className="card-img-top" alt="Fissure in Sandstone" />
                  <h1 className="card-title fw-bold mt-3">Items returned</h1>
                  <h3 className="card-text highlightUnderTitle fw-bold">12.432.543+</h3>
                  <div className='text-center'>
                    <NavLink to="/find" style={{maxHeight: 'fit', maxWidth: 'fit'}}>
                    <button className='FindYourItemBtn'>Find your item</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </MDBCol>
            <MDBCol size='md'>
              <div className='mt-5 d-flex align-items-center justify-content-center'>
                <div className="card mb-5 mt-10 cardShared">
                  <div className="card-body text-center">
                    <img src={Partners} className="card-img-top cardImgSmall" alt="Fissure in Sandstone" />
                    <h2 className="card-title fw-bold mt-5">Partners</h2>
                    <h3 className="card-text">34+ Companies</h3>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}
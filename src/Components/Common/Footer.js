import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/img/logo.png';
import GoToTop from './GoToTop';
import { useSelector } from 'react-redux';

export default function Footer() {
  const { venueList } = useSelector(({ venue }) => venue);
  const { aboutList } = useSelector(({ about }) => about);

  return (
    <footer>
      <div className="container">
        <div className="social_icon">
          <ul>
            <li>
              <Link
                to="https://www.facebook.com/BestPartiesEver"
                target="_blank"
              >
                <i className="pi pi-facebook"></i>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/bestpartieseveruk/"
                target="_blank"
              >
                <i className="pi pi-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/BestPartiesEver" target="_blank">
                <i className="pi pi-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/company/best-parties-ever-limited/?originalSubdomain=uk"
                target="_blank"
              >
                <i className="pi pi-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
        <Row className="mb-5 g-4">
          <Col lg={3} md={6}>
            {venueList?.menuList?.map((item, index) => {
              return (
                <div className="footer_link">
                  <h4>{item?.region}</h4>
                  <ul>
                    {item?.venues?.map((itemData, itemIndex) => {
                      return (
                        <li>
                          <Link
                            to={`/christmas-parties/${
                              itemData?.public_name?.split(' ')[0]
                            }/${itemData?._id}`}
                          >
                            <i className="pi pi-fw pi-map-marker"></i>
                            {itemData?.public_name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Col>
          {/* <Col lg={3} md={6}>
            {venueList?.menuList?.map((item, index) => {
              return (
                <div className="footer_link">
                  <h4>{item?.region}</h4>
                  <ul>
                    {item?.venues?.map((itemData, itemIndex) => {
                      return (
                        <li>
                          <Link
                            to={`/christmas-parties/${itemData?.public_name
                              ?.split(' ')
                              .join('-')}/${itemData?._id}`}
                          >
                            <i className="pi pi-fw pi-map-marker"></i>
                            {itemData?.public_name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Col> */}

          <Col lg={6} md={6}>
            <div className="footer_link info_link_wrapper">
              <h4>INFORMATION</h4>
              <ul>
                <li>
                  <Link to="/request-brochures">Request a Brochure</Link>
                </li>
                {aboutList?.map(itemData => {
                  return (
                    <>
                      <li>
                        <Link to={`about/${itemData?.uri}/${itemData?._id}`}>
                          {itemData?.name}
                        </Link>
                      </li>
                    </>
                  );
                })}
                <li>
                  <Link to="https://tapenade.co.uk/" target="_blank">
                    Non-Christmas Parties
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="footer_link">
              <h4>GET IN TOUCH</h4>
              <ul>
                <li>
                  <p>Enquiries</p>
                </li>
                <li>
                  <Link to="tel:01932359900">01932 359900</Link>
                </li>
                <li>
                  <Link to="mailto:sales@bestpartiesever.com">
                    sales@bestpartiesever.com
                  </Link>
                </li>
                <li>
                  <p className="mt-2">
                    Location
                    <br />
                    Units 2-4 Trade City, Avro Way Brooklands Industrial Estate
                    Weybridge SURREY KT13 0YF
                  </p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="copyright_wrap">
          <Row className="align-items-center">
            <Col md={3}>
              <div className="footer_logo">
                <img src={Logo} alt="Logo" />
              </div>
            </Col>
            <Col md={9}>
              <div className="copyright_text">
                <p>© 2015-2023 Eventist Group :: All Rights Reserved</p>
                <p>
                  Eventist Group is a limited company trading as Best Parties
                  Ever. Registered in England. Registration Number: 3209530{' '}
                  <br />
                  Registered Office: Units 2-4 Trade City, Avro Way, Brooklands
                  Industrial Estate, Weybridge, Surrey, KT13 0YF.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="right_social_icon">
        <ul>
          <li className="facebook">
            <Link to="https://www.facebook.com/BestPartiesEver" target="_blank">
              <i className="pi pi-facebook"></i>
            </Link>
          </li>
          <li className="instagram">
            <Link
              to="https://www.instagram.com/bestpartieseveruk/"
              target="_blank"
            >
              <i className="pi pi-instagram"></i>
            </Link>
          </li>
          <li className="twitter">
            <Link to="https://twitter.com/BestPartiesEver" target="_blank">
              <i className="pi pi-twitter"></i>
            </Link>
          </li>
          <li className="linkedin">
            <Link
              to="https://www.linkedin.com/company/best-parties-ever-limited/?originalSubdomain=uk"
              target="_blank"
            >
              <i className="pi pi-linkedin"></i>
            </Link>
          </li>
        </ul>
        <GoToTop />
      </div>
    </footer>
  );
}

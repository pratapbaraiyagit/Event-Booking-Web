import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Location({ data }) {
  return (
    <div className="location_section pt-120">
      <div className="container">
        <div className="text-center location_title">
          <h2>LOCATION</h2>
          <h3 className="fw_400 mb-5">{data?.location?.address}</h3>
        </div>
        <div className="location_in mb-5">
          <iframe
            src={`https://maps.google.com/maps?q=${data?.location?.latitude},${data?.location?.longitude}&z=500&amp&output=embed`}
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location"
          ></iframe>
        </div>
        <div
          className="location_content pb-80"
          dangerouslySetInnerHTML={{
            __html: data?.location?.directions_for_bpe,
          }}
        ></div>
      </div>
      <div className="hire_exclusive pt-80 pb-80">
        <div className="container">
          <Row>
            <Col xl={6} lg={8}>
              <h2>HIRE THIS VENUE EXCLUSIVELY</h2>
              <p>
                Book any of our venues for your private and exclusive use on a
                range of nights.
              </p>
              <ul>
                <li>
                  <Link to="/exclusiveparties" className="btn_border">
                    Find Out More
                  </Link>
                </li>
                <li>
                  <span>OR CALL</span>
                </li>
                <li>
                  <Link to="tel:01932359900" className="phone">
                    <i className="pi pi-phone"></i> {data?.venue_phone}
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function HotelDetail() {
  return (
    <div className="hotel_wrapper pt-120 pb-80">
      <div className="container">
        <Row>
          <Col md={6}>
            <h2>HOTEL DEALS</h2>
            <p>
              Best Parties Ever has negotiated the best rates with Booking.com
              for our party guests. To find a suitable hotel at the best rate
              available please use our Instant Hotel Search form:
            </p>
            <div className="hotelSearchBox">
              <ins
                className="bookingaff"
                data-aid="1840961"
                data-target_aid="1840961"
                data-prod="nsb"
                data-width="95%"
                data-height="250"
                data-lang="en"
                data-dest_id=""
                data-dest_type="city"
                data-df_num_properties="3"
                data-bk-touched="true"
              >
                <iframe
                  src="//www.booking.com/flexiproduct.html?product=nsb&amp;w=95%25&amp;h=250&amp;lang=en&amp;aid=1840961&amp;target_aid=1840961&amp;dest_type=city&amp;df_num_properties=3&amp;fid=1682911687733&amp;"
                  width="95%"
                  height="250"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  frameborder="0"
                  allowtransparency="true"
                  id="booking_widget__1840961__1682911687733"
                  data-responsive="false"
                  title="booking"
                ></iframe>
              </ins>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

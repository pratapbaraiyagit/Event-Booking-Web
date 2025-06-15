import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createBooking,
  setIsBookingUpdated,
} from 'store/reducers/Booking/booking.slice';

export default function BookPlaces() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [POReference, setPOReference] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [notes, setNotes] = useState('');

  const { isBookingUpdated } = useSelector(({ booking }) => booking);

  useEffect(() => {
    if (isBookingUpdated) {
      navigate('/account');
      dispatch(setIsBookingUpdated(false));
    }
  }, [isBookingUpdated, navigate, dispatch]);

  return (
    <div className="login_wrapper setup_wrapper">
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Book Places</h1>
        </div>
      </div>
      <div className="register_inner_wrapper book_places_wrap pt-120 pb-120">
        <div className="container">
          <h2 className="text-center text_dark">
            Book <span>{state?.checkAvailabilty}</span> places
          </h2>
          <h3 class="text_dark text-center fw_300 mb-4 ">
            {state?.venue_name} - {state?.theme_name} -{' '}
            {moment(state?.dateData?.date).format('dddd, Do MMMM YYYY')}
            {/* Ardingly South of England, Haywards Heath, West Sussex - Friday 1st
            December 2023 */}
          </h3>
          <h4 className="text-center text_dark">Extra Information</h4>
          <div className="book_places_form_wrap">
            <p className="text_dark text-center">
              If you would like to assign a purchase order reference or have any
              special requirements (not dietary requirements) please enter them
              below.
            </p>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3 form-group">
                  <Form.Control
                    type="text"
                    value={POReference}
                    onChange={e => setPOReference(e.target.value)}
                    placeholder="PO reference"
                  />
                  <Form.Label>PO reference</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                  <Form.Control
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon reference"
                  />
                  <Form.Label>
                    Enter coupon codes (separate multiple coupons with commas)
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 form-group">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Special requirements (not dietary)"
                  />
                  <Form.Label>Special requirements (not dietary)</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                type="submit"
                className="btn_primary"
                onClick={() => {
                  dispatch(
                    createBooking({
                      approx_places: Number(state?.checkAvailabilty),
                      event_date_id: state?.dateData?._id,
                      notes: notes,
                      agent_ref_po_no: POReference,
                      coupon_code: couponCode,
                    }),
                  );
                }}
              >
                Book Places
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { checkAvailabilityDate } from 'store/reducers/Venue/venue.slice';

export default function DatePrices({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [dateData, setDateData] = useState('');
  const [checkAvailabilty, setCheckAvailabilty] = useState('');
  const [checkAvailVal, setCheckAvailVal] = useState('');

  const showMoreHandle = () => {
    setShowMore(!showMore);
  };
  const closeHandle = () => {
    setShowMore(false);
  };
  const availabilityHandle = () => {
    if (checkAvailabilty < 8) {
      setCheckAvailVal('Oops! You need to enter 8 or more places');
    } else {
      setCheckAvailVal('');
      dispatch(
        checkAvailabilityDate({
          _id: dateData?._id,
          data: { approx_places: Number(checkAvailabilty) },
        }),
      );
      setAvailability(!availability);
    }
  };

  const handleCreateBooking = () => {
    navigate('/book-places', {
      state: {
        theme_name: data?.theme_name,
        venue_name: data?.venue_name,
        event_id: data?.event_id,
        dateData: dateData,
        checkAvailabilty: checkAvailabilty,
      },
    });
  };

  const openPopupAvail = item => {
    if (item?.is_bookable) {
      setDateData(item);
      setVisibleModal(true);
    }
  };

  return (
    <>
      <div className="date_wrapper pt-120 pb-120">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="mb-4">BOOK YOUR PLACES NOW</h2>
            <Link to="/login" className="btn_primary">
              Already Booked? Log In Here
            </Link>
          </div>
          <div className="booking_celender_wrapper">
            <Row className="g-4">
              {data?.event_date?.map((item, index) => {
                return (
                  <Col xxl={2} xl={3} md={4} xs={6} key={index}>
                    <div
                      className="booking_celender_box"
                      onClick={() => openPopupAvail(item)}
                    >
                      <div className="booking_date">
                        {item?.date && (
                          <h5>
                            {moment(item.date).format('ddd')}{' '}
                            <span>{moment(item.date).format('DD')}</span>{' '}
                            {moment(item.date).format('MMM')}
                          </h5>
                        )}
                      </div>
                      <p>{item?.status ? item?.status : ''}</p>
                      <div className="booking_price">
                        <h6>
                          £
                          {item?.price_per_head_exclusive
                            ? item?.price_per_head_exclusive
                            : '0'}
                        </h6>
                        <span>+VAT</span>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="text-center">
            <p dangerouslySetInnerHTML={{ __html: data?.dates_prices_text }} />
          </div>
          <div className="more_content">
            <div className="text-center">
              <div onClick={() => showMoreHandle()} className="show_more_btn">
                <i className="pi pi-angle-down me-2"></i>{' '}
                <span>Find out more about the nights</span>
              </div>
            </div>
            {showMore === true && (
              <div className="more_content_innner mt-4">
                <div className="close_btn" onClick={() => closeHandle()}>
                  <i className="pi pi-times"></i>
                </div>
                <h4>Mixed Group</h4>
                <p>
                  Everyone’s welcome! Book for your company or group of friends
                  – minimum booking of 10 guests.
                </p>
                <h4>All Inclusive</h4>
                <p>
                  Mixed Group Party with Arrival Drink followed by Unlimited
                  Beer, House Wine, Prosecco and Soft Drinks included in the
                  ticket price.
                </p>
                <h4>Standing Mixed (Tobacco Dock London only)</h4>
                <p>
                  Mixed Group Party with a difference! Standing street food
                  party instead of seated dinner. Each group will get a reserved
                  base area for the evening.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        header="CHECK AVAILABILITY"
        visible={visibleModal}
        onHide={() => {
          setCheckAvailVal('');
          setVisibleModal(false);
        }}
        style={{ width: '600px' }}
        draggable={false}
        position="top"
        resizable={false}
        className="availability_popup"
      >
        <div className="check_availability_wrap">
          <p>
            {data?.venue_name} - {data?.theme_name} -{' '}
            {moment(dateData?.date).format('dddd, Do MMMM YYYY')}
          </p>
          {availability === true && (
            <>
              <Form.Group className="form-group mb-3">
                <Form.Label for="Tertiaryvenue">How many places?</Form.Label>
                <Form.Control
                  type="number"
                  value={checkAvailabilty}
                  onChange={e => {
                    if (e.target.value !== '') {
                      setCheckAvailVal('');
                    }
                    setCheckAvailabilty(e.target.value);
                  }}
                  className="hideArrow text-center"
                />
                <small>8 tickets minimum</small>
                {checkAvailVal !== '' && (
                  <span className="d-block text-danger text_small lookup_error">
                    {checkAvailVal}
                  </span>
                )}
              </Form.Group>
              <div className="text-center">
                <Button
                  className="btn_primary"
                  onClick={() => availabilityHandle()}
                >
                  Fingers Crossed!
                </Button>
              </div>
            </>
          )}
          {availability === false && (
            <div className="place_reserved_Wrap text-center">
              <Alert key="success" variant="success">
                We have availability! Whoop!
              </Alert>
              <h4>Do you want to reserve these places?</h4>
              <p>
                We can hold these places for you for 7 days without obligation -
                just click the button below to start, it only takes a minute!
              </p>
              <Button
                className="btn_primary"
                onClick={() => handleCreateBooking()}
              >
                Let's Do It!
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}

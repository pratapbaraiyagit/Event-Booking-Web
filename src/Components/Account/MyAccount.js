import Loader from 'Components/Common/Loader';
import GetCookies from 'hooks/GetCookies';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getBookingListData,
  setIsBookingUpdated,
} from 'store/reducers/Booking/booking.slice';

export default function MyAccount() {
  const dispatch = useDispatch();

  const userData = GetCookies('UserSession');
  const userSession = userData ? JSON.parse(atob(userData)) : null;

  const { bookingLoading, bookingList, isBookingUpdated } = useSelector(
    ({ booking }) => booking,
  );

  useEffect(() => {
    dispatch(getBookingListData());
  }, [dispatch]);

  useEffect(() => {
    if (isBookingUpdated) {
      dispatch(getBookingListData());
      dispatch(setIsBookingUpdated(false));
    }
  }, [dispatch, isBookingUpdated]);

  return (
    <div className="account_page_Wrapper">
      {bookingLoading && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>My Account</h1>
        </div>
      </div>
      <div className="account_wrap_inner pt-120 pb-120">
        <div className="container">
          <div className="account_top_content">
            <p>Hi {userSession?.first_name},</p>
            <p>
              This is your account area where you can manage your bookings and
              pay online. <br /> To manage your booking please click the{' '}
              <span className="primary_btn">Manage</span>
              button in the first column against the relevant booking below.
            </p>
            <p>
              To edit your contact details you can{' '}
              <Link to="/create-account">manage your account</Link>
            </p>
          </div>
          {bookingList.length > 0 ? (
            <div className="your_booking_wrapper">
              <h2>Your bookings</h2>
              <p>
                You currently have{' '}
                <span className="primary_btn">{bookingList?.length}</span>{' '}
                active booking
              </p>
              <div className="table_design_one">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Booking Ref</th>
                      <th>Venue</th>
                      <th>Party Date</th>
                      <th>Places Booked</th>
                      <th>Booking Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingList?.map((item, index) => {
                      return (
                        <tr>
                          <td className="booking_ref">
                            <span className="d-block">
                              {item?.ref_number ? item?.ref_number : '-'}
                            </span>
                            <span className="d-block">Your Ref:</span>
                            <Link
                              to={`/booking/${item?._id}`}
                              className="btn_primary small"
                            >
                              Manage
                            </Link>
                          </td>
                          <td className="venue">
                            {item?.venue_name ? item?.venue_name : '-'}
                          </td>
                          <td className="party_date">
                            {moment(item?.party_dat).format('dddd Do MMM YYYY')}
                          </td>
                          <td className="place_booked">
                            {item?.provisional_places > 0 && (
                              <p>
                                <span className="primary_btn">
                                  {item?.provisional_places}
                                </span>{' '}
                                Provisional
                              </p>
                            )}
                            {item?.confirmed_places > 0 && (
                              <p>
                                <span className="primary_btn">
                                  {item?.confirmed_places}
                                </span>{' '}
                                Confirmed
                              </p>
                            )}
                          </td>
                          <td className="booking_status">
                            {item?.created_at + item?.hold_period <
                            new Date() ? (
                              <div>
                                <p>
                                  <span className="primary_btn">
                                    Oh no you've gone past your 10 day hold
                                    period!
                                  </span>
                                </p>
                                <p>
                                  Quick quick, get your places confirmed before
                                  they are snapped up by someone else!
                                </p>{' '}
                              </div>
                            ) : (
                              'New Booking'
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          ) : (
            <p className="alert alert-primary">
              You currently do not have any active bookings
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

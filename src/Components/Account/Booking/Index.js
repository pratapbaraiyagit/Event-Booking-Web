import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import Overview from './Overview';
import GuestList from './GuestList';
import EmailManagement from './EmailManagement';
import PartyEtickets from './PartyEtickets';
import HotelDetail from './HotelDetail';
import Location from '../../../Components/Venue/VenueCommon/Location';
import Drinks from '../../../Components/Venue/VenueCommon/Drinks';
import Gallery from './Gallery';
import Help from './Help';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingData,
  setBookingDetail,
  setIsBookingUpdated,
  updateBooking,
} from 'store/reducers/Booking/booking.slice';
import Loader from 'Components/Common/Loader';
import PreviousGuestImport from './PreviousGuestImport';
import MenuBooking from './MenuBooking';
import { setImportGuestsListData } from 'store/reducers/Booking/guest.slice';

export default function Booking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { bookingLoading, isBookingUpdated, bookingDetail } = useSelector(
    ({ booking }) => booking,
  );
  const { importGuestList } = useSelector(({ guest }) => guest);

  const [importPreviousGuests, setImportPreviousGuests] = useState(false);

  const importPreviousGuestsHandleChange = () => {
    setImportPreviousGuests(!importPreviousGuests);
  };

  // useEffect(() => {
  //   if (isBookingUpdated) {
  //     navigate('/account');
  //     dispatch(setBookingDetail({}));
  //     dispatch(setIsBookingUpdated(false));
  //   }
  // }, [dispatch, isBookingUpdated, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(getBookingData(id));
    }
  }, [dispatch, id]);

  const [disableGuest, setDisableGuest] = useState(false);

  useEffect(() => {
    if (Object.keys(bookingDetail)?.length > 0) {
      if (bookingDetail.hasOwnProperty('special_requirements')) {
        setDisableGuest(true);
      }
    }
  }, [bookingDetail]);

  const tab1HeaderTemplate = options => {
    return (
      <span
        onClick={() => {
          setImportPreviousGuests(false);
          dispatch(setImportGuestsListData([]));
          options.onClick();
        }}
        className={options.className}
      >
        {options.titleElement}
      </span>
    );
  };
  return (
    <div className="booking_page_wrapper">
      {bookingLoading && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Bookings</h1>
        </div>
      </div>
      <div className="booking_wrap_inner pt-120 pb-120">
        <div className="container">
          <div className="back_to_booking">
            <Link to="/account" className="btn_primary">
              <i className="pi pi-angle-left"></i> Back to Bookings
            </Link>
          </div>
          <div className="top_heading">
            <h2 className="h1">Party Booking</h2>
            <p>
              Booking Reference: <span>{bookingDetail?.ref_number}</span>
            </p>
          </div>
          {importGuestList?.length > 0 && (
            <div className="table_design_one guest_table_wrapper">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Guest Import Status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  {importGuestList?.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>
                            {item?.status ? (
                              <span>Guest Imported</span>
                            ) : (
                              <>
                                <i className="pi pi-exclamation-triangle me-1 text-danger"></i>
                                <span className="text-danger">
                                  Guest Not Imported
                                </span>
                              </>
                            )}
                          </td>
                          <td className="first_name">
                            {item?.first_name?.val}
                          </td>
                          <td className="last_name">{item?.last_name?.val}</td>
                          <td className="manage_by">
                            {item?.email?.val}
                            {item?.status === false && (
                              <>
                                <span className="text-danger d-block">
                                  Error Details:
                                  <span className="text-dark">
                                    {item?.email?.error}
                                  </span>
                                </span>
                              </>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
          {/* <Alert key="primary" variant="primary">
            Oh no you've gone past your 10 day hold period!
          </Alert>
          <p>
            Quick quick, get your places confirmed before they are snapped up by
            someone else!
          </p> */}
          <Alert key="dark" variant="dark">
            <i className="pi pi-angle-double-down"></i> You can now manage your
            guest list here - click "Guest List" to find out more
          </Alert>
          {disableGuest === true && (
            <div>
              <h3>Your Guest List is Currently Disabled.</h3>
              <p>
                If you’d like to activate this to manage your guest list and
                allow them to log in and manage their own requirements then
                please{' '}
                <span
                  onClick={() => {
                    setDisableGuest(false);
                    dispatch(
                      updateBooking({
                        _id: id,
                        booking: {
                          is_guest_system: true,
                        },
                      }),
                    );
                  }}
                  style={{ color: 'red', fontSize: '16px' }}
                >
                  click here
                </span>{' '}
                to enable the Guest List facility.
              </p>
              <p>
                Note: Enabling the Guest List will void any Dietary Requirements
                you told us about over the phone or entered below here and they
                will need to be re-entered against each guest.
              </p>
            </div>
          )}
          <div className="booking_tab_wrapper">
            <TabView>
              <TabPanel
                header="Overview"
                // onTabChange={() => console.log('first')}
              >
                <Overview
                  data={bookingDetail}
                  bookingLoading={bookingLoading}
                  setDisableGuest={setDisableGuest}
                  disableGuest={disableGuest}
                />
              </TabPanel>
              {disableGuest === false && (
                <TabPanel
                  header="Guest List"
                  headerTemplate={tab1HeaderTemplate}
                >
                  {importPreviousGuests === true ? (
                    <PreviousGuestImport />
                  ) : (
                    <GuestList
                      data={bookingDetail}
                      importPreviousGuestsHandleChange={
                        importPreviousGuestsHandleChange
                      }
                      setImportPreviousGuests={setImportPreviousGuests}
                    />
                  )}
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Email Guests">
                  <EmailManagement data={bookingDetail} />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="eTickets">
                  <PartyEtickets />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Hotel Deals">
                  <HotelDetail />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Venue">
                  <Location data={bookingDetail} />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Menu">
                  <MenuBooking data={bookingDetail} />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Drinks">
                  <Drinks data={bookingDetail} />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Gallery">
                  <Gallery />
                </TabPanel>
              )}
              {disableGuest === false && (
                <TabPanel header="Help">
                  <Help />
                </TabPanel>
              )}
            </TabView>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Loader from 'Components/Common/Loader';
import {
  getBookingData,
  makePayment,
} from 'store/reducers/Booking/booking.slice';
import axios from 'axios';

const ConfirmYourPlaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { bookingLoading, bookingDetail } = useSelector(
    ({ booking }) => booking,
  );

  const initialValues = {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  };

  const confirmYourPlacesSchema = Yup.object().shape({
    checkbox1: Yup.boolean().oneOf(
      [true],
      '*Please Check this box if you want to proceed.',
    ),
    checkbox2: Yup.boolean().oneOf(
      [true],
      '*Please Check this box if you want to proceed.',
    ),
    checkbox3: Yup.boolean().oneOf(
      [true],
      '*Please Check this box if you want to proceed.',
    ),
    checkbox4: Yup.boolean().oneOf(
      [true],
      '*Please Check this box if you want to proceed.',
    ),
  });

  useEffect(() => {
    if (id) {
      dispatch(getBookingData(id));
    }
  }, [dispatch, id]);

  const integrationKey = 'gmof99yDahpmiqlKuejX9Nl0K8z2l6DiBGZrMyKS7OcbC6bEon';
  const integrationPassword =
    'rZVY9GDsaKwPVALMpehxAe6zFx4pTafbX2LQXODTgsaXelVbL8i6lNmypGpx5XrMX';
  const credentials = btoa(`${integrationKey}:${integrationPassword}`);

  const [merchantSessionKey, setMerchantSessionKey] = useState('');
  console.log('merchantSessionKey', merchantSessionKey);

  useEffect(() => {
    async function createMerchantSessionKey() {
      try {
        const response = await axios.post(
          'https://pi-test.sagepay.com/api/v1/merchant-session-keys',
          {
            vendorName: 'eventisttest',
          },
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-type': 'application/json',
            },
          },
        );
        setMerchantSessionKey(response.data.merchantSessionKey);
      } catch (error) {
        console.error('Error creating merchant session key:', error);
      }
    }

    createMerchantSessionKey();
  }, []);

  return (
    <div className="confirm_page_Wrapper">
      {bookingLoading && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>My Account</h1>
        </div>
      </div>
      <div className="confirm_wrap_inner booking_wrap_inner  pt-120 pb-120">
        <div className="container">
          <div className="top_heading mb-4">
            <h2 className="text_dark h1">Confirm your Places</h2>
            <p>
              Booking Reference:
              <span className="mx-1">{bookingDetail?.ref_number}</span>
            </p>
            <p className="big">Let's do this!</p>
            <p>
              You just need to put down a £
              {bookingDetail?.deposit_per_head_exclusive} deposit for each place
              to confirm them - then they are yours and no-one can steal them
              away!
            </p>
            <p>
              Now, there are few conditions as you'd expect so please read
              through and tick to confirm you are happy with them.
            </p>
          </div>
          <div className="confirm_inner_wrap">
            <Row>
              <Col md={2}>
                <div className="table_design_two">
                  <Table>
                    <thead>
                      <tr>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Link to={`/booking/${id}`}>
                            <i className="pi pi-angle-double-right"></i> Back to
                            Booking
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col md={10}>
                <div className="mb-5">
                  <div className="table_design_two">
                    <Table>
                      <thead>
                        <tr>
                          <th colSpan={2}>Current Places</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="w-50">Provisional Places Held:</td>
                          <td className="w-50">
                            <span className="badge badge_primary">
                              {bookingDetail?.provisional_places}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="confirm_table_wrap">
                  <div className="table_header_wrap">
                    <h4 className="m-0">Please Confirm</h4>
                  </div>
                  <div className="confirm_table_inner p-3">
                    <Row>
                      <Col md={6}>
                        <Formik
                          enableReinitialize={true}
                          initialValues={initialValues}
                          validationSchema={confirmYourPlacesSchema}
                          onSubmit={values => {
                            dispatch(
                              makePayment({
                                cardDetails: {
                                  cardholderName: 'Squidward Tentacles',
                                  cardNumber: '4929000000006',
                                  expiryDate: '0223',
                                  securityCode: '123',
                                },
                                amount: 1000,
                                currency: 'EUR',
                                description: 'Order Confirmed',
                                billingAddress: {
                                  address1: '407 St. John Street',
                                  address2: 'string',
                                  address3: 'string',
                                  city: 'London',
                                  postalCode: 'EC1V 4AB',
                                  country: 'GB',
                                  state: 'st',
                                },
                                customerFirstName: 'Sam',
                                customerLastName: 'Jones',
                              }),
                            );
                            // navigate(`/payment`, {
                            //   state: { data: bookingDetail },
                            // });
                            // handlePaymentSubmit(values);
                          }}
                        >
                          {({
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            values,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              <ul className="mb-3">
                                <li>
                                  <h3 className="mb-2 text_light">
                                    The small print!
                                  </h3>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label="I confirm that I am aware the published ticket
                                prices may exclude VAT and the remaining balance
                                must be paid no later than six weeks prior to the
                                party date."
                                      name="checkbox1"
                                      checked={values.checkbox1}
                                      onChange={e =>
                                        setFieldValue(
                                          'checkbox1',
                                          e.target.checked,
                                        )
                                      }
                                      id="checkbox1"
                                    />
                                    <span className="d-block text-danger text_small">
                                      <ErrorMessage name="checkbox1" />
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label={`I confirm I am aware the deposit of £${bookingDetail?.deposit_per_head_exclusive} per
                                person is due to confirm the booking and that any
                                pre-payments will be non-refundable and
                                non-transferrable.`}
                                      name="checkbox2"
                                      checked={values.checkbox2}
                                      onChange={e =>
                                        setFieldValue(
                                          'checkbox2',
                                          e.target.checked,
                                        )
                                      }
                                      id="checkbox2"
                                    />
                                    <span className="d-block text-danger text_small">
                                      <ErrorMessage name="checkbox2" />
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label={
                                        <div>
                                          I have read the
                                          <Link
                                            to={`/about/booking-terms/${bookingDetail?.booking_terms}`}
                                            target="_blank"
                                          >
                                            <span className="text_primary text-decoration-underline">
                                              Terms and Conditions
                                            </span>
                                          </Link>
                                          of Booking and agree that I, and all
                                          my participants shall abide by them.
                                        </div>
                                      }
                                      name="checkbox3"
                                      checked={values.checkbox3}
                                      onChange={e =>
                                        setFieldValue(
                                          'checkbox3',
                                          e.target.checked,
                                        )
                                      }
                                      id="checkbox3"
                                    />
                                    <span className="d-block text-danger text_small">
                                      <ErrorMessage name="checkbox3" />
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label={`I understand a ${bookingDetail?.vat}% (inc VAT) surcharge can be added
                                if paying by corporate/fleet credit card (no
                                charge for personal credit cards or any debit
                                cards).`}
                                      name="checkbox4"
                                      checked={values.checkbox4}
                                      onChange={e =>
                                        setFieldValue(
                                          'checkbox4',
                                          e.target.checked,
                                        )
                                      }
                                      id="checkbox4"
                                    />
                                    <span className="d-block text-danger text_small">
                                      <ErrorMessage name="checkbox4" />
                                    </span>
                                  </div>
                                  <p></p>
                                </li>
                                <li>
                                  <Button
                                    className="btn_primary small"
                                    type="submit"
                                  >
                                    Confirm Places
                                  </Button>
                                </li>
                              </ul>
                            </Form>
                          )}
                        </Formik>
                      </Col>
                      <Col md={6}>
                        <div className="table_design_two mb-3">
                          <Table>
                            <thead>
                              <tr>
                                <th colSpan={2}>Your booking details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="w-50">Venue:</td>
                                <td className="w-50">
                                  {bookingDetail?.venue_public_name}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Date:</td>
                                <td className="w-50">
                                  {moment(bookingDetail?.created_at).format(
                                    'dddd, Do MMMM  YYYY',
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Provisional Places:</td>
                                <td className="w-50">
                                  {bookingDetail?.provisional_places?.toFixed(
                                    2,
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Deposits to Pay:</td>
                                <td className="w-50 bg_primary text_white">
                                  £{bookingDetail?.deposite_to_pay?.toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmYourPlaces;

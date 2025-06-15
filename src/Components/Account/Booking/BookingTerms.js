import { useEffect } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';

import Loader from 'Components/Common/Loader';
import { getPayByBank } from 'store/reducers/Booking/booking.slice';

const BookingTerms = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  const { bookingLoading, payByBankDetail } = useSelector(
    ({ booking }) => booking,
  );

  const initialValues = {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  };

  const BookingTermsSchema = Yup.object().shape({
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
      dispatch(getPayByBank(id));
    }
  }, [dispatch, id]);

  return (
    <div className="confirm_page_Wrapper">
      {bookingLoading && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Bookings</h1>
        </div>
      </div>
      <div className="confirm_wrap_inner booking_wrap_inner  pt-120 pb-120">
        <div className="container">
          <div className="top_heading mb-4">
            <h2 className="text_dark h1">Booking Terms</h2>
            <p>
              Booking Reference:
              <span className="mx-1">{payByBankDetail?.Reference}</span>
            </p>
            <p className="big">Let's do this!</p>
            <p>
              You just need to put down a £{payByBankDetail?.deposit} deposit
              for each place to confirm them - then they are yours and no-one
              can steal them away!
            </p>
            <p>
              Now, there are few conditions as you'd expect so please read
              through and tick to confirm you are happy with them.
            </p>
            <p>
              Or alternatively you can pay in full for your party - a total of
              <span className="badge badge_primary">
                {' '}
                £{payByBankDetail?.ticket_price_total}{' '}
              </span>
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
                              {payByBankDetail?.ProvisionalPlaces}
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
                          validationSchema={BookingTermsSchema}
                          onSubmit={values => {
                            navigate(`/booking/${id}`);
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
                                      label="I confirm that I am aware the published
                                      ticket prices may exclude VAT and the
                                      remaining balance must be paid no later than
                                      six weeks prior to the party date."
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
                                  <p></p>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label={`I confirm I am aware the deposit of £${payByBankDetail?.deposit}
                                      per person is due to confirm the booking and
                                      that any pre-payments will be non-refundable
                                      and non-transferrable.`}
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
                                  <p></p>
                                </li>
                                <li>
                                  <div className="checkbox_wrapper">
                                    <Form.Check
                                      label={
                                        <div>
                                          {' '}
                                          I have read the{' '}
                                          <Link
                                            to={`/about/booking-terms/${payByBankDetail?.booking_terms}`}
                                            target="_blank"
                                          >
                                            <span className="text_primary text-decoration-underline">
                                              Terms and Conditions
                                            </span>
                                          </Link>
                                          of Booking and agree that I, and all
                                          my participants, shall abide by them.
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
                                      type="checkbox"
                                      label={`I understand a ${payByBankDetail?.vat}% (inc VAT) surcharge can be
                                      added if paying by corporate/fleet credit
                                      card (no charge for personal credit cards or
                                      any debit cards).`}
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
                        <div className="table_design_two mb-3 bacs">
                          <Table>
                            <thead>
                              <tr>
                                <th colSpan={2}>
                                  <h3 className="mb-2 text_light">
                                    Paying by Bank Transfer/BACS?
                                  </h3>
                                  <p>
                                    If you are planning on paying by Bank
                                    Transfer/BACS please use the following
                                    information. Please use the below reference
                                    number to avoid delays in processing your
                                    payment.
                                  </p>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="w-50">Reference:</td>
                                <td className="w-50">
                                  {payByBankDetail?.Reference}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Account Name:</td>
                                <td className="w-50">
                                  {payByBankDetail?.Account_Name}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Sort Code:</td>
                                <td className="w-50">
                                  {payByBankDetail?.Sort_Code}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Account Number:</td>
                                <td className="w-50">
                                  {payByBankDetail?.Account_Number}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
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
                                  {payByBankDetail?.Venue}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Date:</td>
                                <td className="w-50">
                                  {moment(payByBankDetail?.Date).format(
                                    'dddd, Do MMMM  YYYY',
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Provisional Places:</td>
                                <td className="w-50">
                                  {payByBankDetail?.ProvisionalPlaces}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-50">Deposits to Pay:</td>
                                <td className="w-50 bg_primary text_white">
                                  £{payByBankDetail?.DepositsToPay?.toFixed(2)}
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

export default BookingTerms;

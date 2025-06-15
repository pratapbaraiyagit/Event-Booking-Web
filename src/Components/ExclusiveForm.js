import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { MultiSelect } from 'primereact/multiselect';

import TestimonialLogo4 from '../Assets/img/sage.jpeg';
import TestimonialLogo1 from '../Assets/img/bat-logo.png';
import TestimonialLogo6 from '../Assets/img/NHS-RGB.jpeg';
import TestimonialLogo2 from '../Assets/img/logo-accenture.jpeg';
import TestimonialLogo5 from '../Assets/img/john-lewis-logo.jpeg';
import TestimonialLogo3 from '../Assets/img/1267_William_Reed_blue.jpeg';

import { getVenueAllListData } from 'store/reducers/Venue/venue.slice';
import {
  sendEnquires,
  setIsEnquiresUpdated,
} from 'store/reducers/Enquires/enquires.slice';

import 'swiper/css';
import 'swiper/css/pagination';
import Loader from './Common/Loader';

export default function ExclusiveForm() {
  const dispatch = useDispatch();
  const { venueAllList } = useSelector(({ venue }) => venue);
  const { isEnquiresUpdated, enquiresLoading } = useSelector(
    ({ enquires }) => enquires,
  );
  const initialValues = {
    first_name: '',
    last_name: '',
    email_primary: '',
    phone_number: '',
    venue: '',
    number_of_people: '',
    company_name: '',
    cost: '',
    is_exclusive: true,
  };
  useEffect(() => {
    dispatch(getVenueAllListData());
  }, [dispatch]);

  const exclusiveSchema = Yup.object().shape({
    first_name: Yup.string().required('*First name is a required field'),
    last_name: Yup.string().required('*Last name is a required field'),
    email_primary: Yup.string()
      .email('Invalid email')
      .required('*Email address is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
    company_name: Yup.string().required('*Company name is a required field'),
    phone_number: Yup.string().required(
      '*Telephone number is a required field',
    ),
    venue: Yup.array().of(Yup.string()).required('*Venue is required field'),
    number_of_people: Yup.string().required(
      '*Number Of Guests is a required field',
    ),
    cost: Yup.string().required('*Budget/Cost  is a required field'),
  });

  const venueOptions = venueAllList?.map(venue => ({
    label: venue?.public_name,
    value: venue._id,
  }));

  useEffect(() => {
    if (isEnquiresUpdated) {
      dispatch(setIsEnquiresUpdated(false));
    }
  }, [dispatch]);
  return (
    <div className="exclusive_form_Wrapper">
      {enquiresLoading && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Welcome to Best Parties Ever</h1>
        </div>
      </div>
      {isEnquiresUpdated ? (
        <div className="contact_modal_wrap enquires contact_wrapper_inner  pt-120 pb-120">
          <h2 className="text-center">
            Thank you for your enquiry one of our team will <br />
            get back to you shortly.
          </h2>
          <div className="enquires_social_icon">
            <ul>
              <li className="facebook">
                <Link
                  to="https://www.facebook.com/BestPartiesEver"
                  target="_blank"
                >
                  <i className="pi pi-facebook"> </i>F O L L O W on F A C E B O
                  O K
                </Link>
              </li>
              <li className="twitter">
                <Link to="https://twitter.com/BestPartiesEver" target="_blank">
                  <i className="pi pi-twitter"></i>F O L L O W on T W I T T E R
                </Link>
              </li>
              <li className="instagram">
                <Link
                  to="https://www.instagram.com/bestpartieseveruk/"
                  target="_blank"
                >
                  <i className="pi pi-instagram"></i>F O L L O W on I N S T A G
                  R A M
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="exclusive_form_inner pt-120 pb-120">
          <div className="container">
            <h3>WELCOME TO BEST PARTIES EVER</h3>
            <h4>YOUR EXCLUSIVE CHRISTMAS PARTY BOOKING STARTS HERE</h4>
            <div className="welcome_part_exclusive_form">
              <Row>
                <Col md={6}>
                  <p>
                    With 20 venues around the UK, our exclusive packages offer
                    something for everyone.
                  </p>
                  <p>
                    Browse our venues and discover our latest themes and
                    entertainment! With optional all inclusive drinks packages,
                    exquisite four course menus, entertainment, dancing and
                    more, our exclusive parties never fail to wow audiences.
                  </p>
                  <p>
                    Our exclusive parties are for sole use and private hire
                    events, if your booking numbers are for less than 300 guests
                    (or 100 at Bristol) please contact{' '}
                    <Link to="mailto:exclusives@bestpartiesever.com">
                      exclusives@bestpartiesever.com
                    </Link>
                    .
                  </p>
                  <p>
                    To find out more and speak to one of our dedicated Exclusive
                    Account Managers please complete the form below:
                  </p>
                </Col>
                <Col md={6}>
                  <p>Your Christmas Party includes:</p>
                  <ul className="list_ul">
                    <li>
                      <i class="fa-regular fa-gem"></i> TAILORED PACKAGES
                    </li>
                    <li>
                      <i class="fa-solid fa-file-contract"></i> MENU UPGRADES
                    </li>
                    <li>
                      <i class="fa-solid fa-thumbs-up"></i> PRIORITY BOOKING
                    </li>
                    <li>
                      <i class="fa-solid fa-calendar-days"></i> PERSONALISED
                      DATE SELECTION
                    </li>
                    <li>
                      <i class="fa-solid fa-user"></i> DEDICATED ACCOUNT MANAGER
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
            <div className="exclusive_form_button">
              <Row>
                <Col md={6}>
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={exclusiveSchema}
                    onSubmit={values => {
                      dispatch(sendEnquires({ ...values }));
                    }}
                  >
                    {({ handleSubmit, setFieldValue, values }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>First name*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            value={values?.first_name}
                            onChange={e =>
                              setFieldValue('first_name', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="first_name" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Last name*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            value={values?.last_name}
                            onChange={e =>
                              setFieldValue('last_name', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="last_name" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Email address*</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email address"
                            name="email_primary"
                            value={values?.email_primary}
                            onChange={e =>
                              setFieldValue('email_primary', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="email_primary" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Company Name*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Company Name"
                            name="company_name"
                            value={values?.company_name}
                            onChange={e =>
                              setFieldValue('company_name', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="company_name" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Telephone Number*</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Telephone Number"
                            name="phone_number"
                            value={values?.phone_number}
                            onChange={e =>
                              setFieldValue('phone_number', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="phone_number" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group multiselect_wrap">
                          <Form.Label>
                            Please select the venues you are interested in*
                          </Form.Label>
                          <MultiSelect
                            value={values?.venue}
                            onChange={e => {
                              setFieldValue('venue', e.target.value);
                            }}
                            options={venueOptions}
                            name="venue"
                            optionLabel="label"
                            filter
                            display="chip"
                            placeholder="Select Venue"
                            className="w-full md:w-20rem"
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="venue" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Number of guests*</Form.Label>
                          <small className="d-block text_dark mb-2">
                            Exclusive hire is only available to parties of over
                            100 guests (or 300 at many venues). For parties with
                            less than 100 guests please click{' '}
                            <span className="text_primary">"Party Venues"</span>{' '}
                            at the top, select your preferred venue and check
                            availability against your preferred date.
                          </small>
                          <Form.Control
                            type="number"
                            placeholder="Number of guests"
                            name="number_of_people"
                            value={values?.number_of_people}
                            onChange={e =>
                              setFieldValue('number_of_people', e.target.value)
                            }
                            min={100}
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="number_of_people" />
                          </span>
                        </Form.Group>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>
                            Are you working to a budget/cost and what is it?
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="budget/cost"
                            name="cost"
                            value={values?.cost}
                            onChange={e =>
                              setFieldValue('cost', e.target.value)
                            }
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="cost" />
                          </span>
                        </Form.Group>
                        <div className="submit_btn">
                          <Button className="btn_primary w-100" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Col>
                <Col md={6}>
                  <div className="testimonial_slider">
                    <Swiper
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo1} alt="" />
                          <p>
                            Thank you very much for an amazing party on Friday!!
                            We had a fantastic time and we received a lot of
                            great feedback!!
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo2} alt="" />
                          <p>
                            Our Christmas party was a resounding success...your
                            staff were fantastic, polite, courteous and so
                            helpful!
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo3} alt="" />
                          <p>
                            I just wanted to let you know that the party was
                            brilliant last night. Everyone I have spoken to has
                            not stopped talking about how much fun they had. So
                            much so that we would like to hold the same date for
                            next year.
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo4} alt="" />
                          <p>
                            The party was just fantastic and we’ve received
                            feedback that is was the ‘best one yet’, which
                            really says something. The layout of the venue, the
                            entertainment, and quality of food has been praised
                            by people here at Sage
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo5} alt="" />
                          <p>
                            What an amazing night! Entertainment, food and
                            service was exceptional...the best party we’ve ever
                            had!
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="testimonial_slide_wrap">
                          <img src={TestimonialLogo6} alt="" />
                          <p>
                            The event was absolutely fantastic! We have had
                            nothing but positive feedback about the venue,
                            entertainment, food and the event as a whole.
                          </p>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

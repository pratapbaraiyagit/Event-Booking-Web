import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import {
  setIsSignup,
  setSignupLoading,
  signupAction,
} from 'store/reducers/auths.slice';
import GetCookies from 'hooks/GetCookies';
import {
  getGooglePlaceListData,
  setGooglePlaceDetail,
} from 'store/reducers/googlePlaceApi.slice';
import Loader from 'Components/Common/Loader';
import {
  getContactSourceListData,
  getVenueAllListData,
} from 'store/reducers/Venue/venue.slice';

export default function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupLoading, isUserSignup } = useSelector(({ auth }) => auth);
  const { venueAllList, contactSourceList } = useSelector(({ venue }) => venue);
  const { googlePlaceDetail, googlePlaceLoading } = useSelector(
    ({ googlePlace }) => googlePlace,
  );
  const userData = GetCookies('UserSession');
  const userSession = userData ? JSON.parse(atob(userData)) : null;

  const [lookupAddress, setLookupAddress] = useState(false);
  const [autoSentenceCase, setAutoSentenceCase] = useState(true);
  const initialValues = {
    salutation: userSession?.title || '',
    first_name: userSession?.first_name || '',
    surname: userSession?.surname || '',
    email_primary: userSession?.email_primary || '',
    confirm_email_primary: userSession?.email_primary || '',
    address_line_1: userSession?.address_line_1 || '',
    telephone_primary: userSession?.telephone_primary || '',
    password: userSession?.password || '',
    confirm_password: userSession?.confirm_password || '',
    primary_event_location: userSession?.primary_event_location || '',
    post_code: userSession?.post_code || '',
    type: userSession?.type || '',
    city: userSession?.city || '',
    country: userSession?.country || '',
    source: userSession?.source || '',
    company_name: userSession?.company_name || '',
    address_line_2: userSession?.address_line_2 || '',
    address_line_3: userSession?.address_line_3 || '',
    _id: userSession?._id || '',
  };
  useEffect(() => {
    return () => {
      dispatch(setGooglePlaceDetail({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isUserSignup) {
      navigate('/login');
      dispatch(setIsSignup(false));
    }
  }, [isUserSignup]);
  // useEffect(() => {
  //   if (signupLoading) {
  //     setTimeout(() => {
  //       navigate(location?.pathname ? location.pathname : '/login', {
  //         replace: true,
  //       });
  //       dispatch(setSignupLoading(false));
  //     }, 1000);
  //   }
  // }, [signupLoading]);

  const signupSchema = Yup.object().shape({
    salutation: Yup.string().required('*Salutation is a required field'),
    first_name: Yup.string().required('*First name is a required field'),
    // .matches(/^[^\s]/, '*Name cannot include leading spaces')
    surname: Yup.string().required('*Last name is a required field'),
    email_primary: Yup.string()
      .email('Invalid email')
      .required('*Email address is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
    confirm_email_primary: Yup.string()
      .email('Invalid email')
      .oneOf([Yup.ref('email_primary'), null], `Email Don't Match!`)
      .required('*Confirm email address is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
    telephone_primary: Yup.string().required(
      '*Phone number is a required field',
    ),
    password: Yup.string().required('*Password is a required field'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], `Passwords Don't Match!`)
      .required('*Confirm password is a required field'),
    primary_event_location: Yup.string().required(
      '*Preferred venue is a required field',
    ),
    post_code: Yup.string().required('*Post code is a required field'),
    address_line_1: Yup.string().required(
      '*Address line 1 is a required field',
    ),
    type: Yup.string().required('*Type is a required field'),
    city: Yup.string().required('*City is a required field'),
    source: Yup.string().required('*Source is a required field'),
    country: Yup.string().required('*Country is a required field'),
  });

  function capitalizeSentence(sentence) {
    const firstLetter = sentence?.charAt(0)?.toUpperCase();
    const restOfSentence = sentence?.slice(1);
    return firstLetter + restOfSentence;
  }

  useEffect(() => {
    dispatch(getVenueAllListData());
    dispatch(getContactSourceListData());
  }, [dispatch]);
  return (
    <div className="login_wrapper register_wrapper">
      {(googlePlaceLoading || signupLoading) && <Loader />}
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>
            {userSession?._id ? 'Modify your Account' : 'Create an Account'}
          </h1>
        </div>
      </div>
      <div className="register_inner_wrapper pt-120 pb-120">
        <div className="container">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={values => {
              const capitalizedObject = {
                ...values,
                first_name: capitalizeSentence(values.first_name),
                surname: capitalizeSentence(values.surname),
              };
              let newValues = autoSentenceCase ? capitalizedObject : values;
              dispatch(signupAction({ ...newValues }));
            }}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="register_form">
                  <form action="">
                    <Form.Check
                      type="checkbox"
                      id="capital"
                      label="I always forget about capital letters - please fix it for me!"
                      autocomplete="off"
                      checked={autoSentenceCase}
                      onChange={() => {
                        setAutoSentenceCase(!autoSentenceCase);
                      }}
                    />
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Select
                            aria-label="Title"
                            name="salutation"
                            value={values.salutation}
                            onChange={handleChange}
                          >
                            <option>Please Select</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr">Dr</option>
                          </Form.Select>
                          <Form.Label>Title/Salutation*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="salutation" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="first_name"
                            value={
                              autoSentenceCase
                                ? capitalizeSentence(values.first_name)
                                : values.first_name
                            }
                            onChange={e =>
                              setFieldValue('first_name', e.target.value)
                            }
                          />
                          <Form.Label>First name*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="first_name" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="surname"
                            value={
                              autoSentenceCase
                                ? capitalizeSentence(values.surname)
                                : values.surname
                            }
                            onChange={e =>
                              setFieldValue('surname', e.target.value)
                            }
                          />
                          <Form.Label>Last name*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="surname" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="email"
                            placeholder="Enter email address"
                            name="email_primary"
                            value={values.email_primary}
                            onChange={handleChange}
                          />
                          <Form.Label>Email address*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="email_primary" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="email"
                            placeholder="Enter confirm email address"
                            name="confirm_email_primary"
                            value={values.confirm_email_primary}
                            onChange={handleChange}
                          />
                          <Form.Label>Confirm Email first</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="confirm_email_primary" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="number"
                            placeholder="Enter phone number"
                            className="hide_arrow"
                            name="telephone_primary"
                            value={values.telephone_primary}
                            onChange={handleChange}
                          />
                          <Form.Label>Phone number*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="telephone_primary" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            id="password"
                            data-placement="bottom"
                            data-toggle="popover"
                            data-container="body"
                            data-html="true"
                            autoComplete="false"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                          <Form.Label>Enter a secure password</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="password" />
                          </span>
                          {/* <div id="popover-password">
                      <div className="progress">
                        <div
                          id="password-strength"
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="40"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div> */}
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="password"
                            placeholder="Enter confirm password"
                            name="confirm_password"
                            value={values.confirm_password}
                            onChange={handleChange}
                          />
                          <Form.Label>Enter your Password first</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="confirm_password" />
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Select
                            aria-label="Title"
                            name="primary_event_location"
                            value={values.primary_event_location}
                            onChange={handleChange}
                          >
                            <option>Please Select</option>
                            {venueAllList?.map(item => {
                              return (
                                <option value={item?._id} key={item?._id}>
                                  {item?.public_name}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Label>Preferred venue*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="primary_event_location" />
                          </span>
                        </Form.Group>
                      </Col>
                    </Row>
                  </form>
                  <div className="address_lookup_wrap">
                    <h2 className="text-center mb-3">Your Address</h2>
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Postcode / Eircode"
                            name="post_code"
                            value={values?.post_code}
                            onChange={handleChange}
                          />
                          <Form.Label>Postcode / Eircode*</Form.Label>
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="post_code" />
                          </span>
                          <span className="note">
                            For Southern Ireland addresses please use the new
                            Eircode rather than your district code.
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Button
                          className="btn_primary"
                          onClick={() => {
                            dispatch(
                              getGooglePlaceListData({
                                postcode: values?.post_code,
                              }),
                            );
                            setLookupAddress(true);
                          }}
                        >
                          Lookup
                        </Button>
                      </Col>
                    </Row>
                    {googlePlaceDetail &&
                    Object.entries(googlePlaceDetail).length > 0 ? (
                      <div className="lookup_data_wrap">
                        <div className="lookup_data_inner">
                          {googlePlaceDetail?.map((data, index) => {
                            return (
                              <button
                                type="button"
                                key={index}
                                className="d-block lookup_data"
                                onClick={() => {
                                  setFieldValue(
                                    'company_name',
                                    data?.organisation_name,
                                  );

                                  setFieldValue('address_line_1', data?.line_1);
                                  setFieldValue('address_line_2', data?.line_2);
                                  setFieldValue('address_line_3', data?.line_3);
                                  setFieldValue('city', data?.post_town);
                                  setFieldValue('country', data?.county);
                                }}
                              >
                                {data?.line_1 +
                                  ', ' +
                                  data?.line_2 +
                                  ', ' +
                                  data?.line_3 +
                                  ', ' +
                                  data?.post_town}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {lookupAddress === true && (
                      <div className="account_edit_wrap">
                        <p>
                          <span>
                            Please select your closest address - then edit below
                          </span>
                        </p>
                        {googlePlaceDetail?.length === 0 && (
                          <p>Invalid postcode submitted</p>
                        )}
                        <p className="mb-1">
                          <span>
                            Please check and ensure the details below are
                            correct
                          </span>
                        </p>
                        <p>
                          <small>
                            Remember: if you want to manually control your
                            capital letters then untick the box at the top of
                            this page
                          </small>
                        </p>
                        <Row>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Select
                                aria-label="Title"
                                name="type"
                                value={values?.type}
                                onChange={handleChange}
                              >
                                <option>Please Select</option>
                                <option value="1">Company</option>
                                <option value="2">Private Customer</option>
                              </Form.Select>
                              <Form.Label>Account Type*</Form.Label>
                              <span className="d-block text-danger text_small">
                                <ErrorMessage name="type" />
                              </span>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                placeholder="Enter your organisation name"
                                name="company_name"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.company_name)
                                    : values.company_name
                                }
                                onChange={e =>
                                  setFieldValue('company_name', e.target.value)
                                }
                              />
                              <Form.Label>
                                Organisation Name (if applicable)
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                placeholder="Enter your street address"
                                name="address_line_1"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.address_line_1)
                                    : values.address_line_1
                                }
                                onChange={e => {
                                  setFieldValue(
                                    'address_line_1',
                                    e.target.value,
                                  );
                                }}
                              />
                              <Form.Label>Address 1*</Form.Label>
                              <span className="d-block text-danger text_small">
                                <ErrorMessage name="address_line_1" />
                              </span>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                name="address_line_2"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.address_line_2)
                                    : values.address_line_2
                                }
                                onChange={e =>
                                  setFieldValue(
                                    'address_line_2',
                                    e.target.value,
                                  )
                                }
                              />
                              <Form.Label>Address 2</Form.Label>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                name="address_line_3"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.address_line_3)
                                    : values.address_line_3
                                }
                                onChange={e =>
                                  setFieldValue(
                                    'address_line_3',
                                    e.target.value,
                                  )
                                }
                              />
                              <Form.Label>Address 3</Form.Label>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                name="city"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.city)
                                    : values.city
                                }
                                onChange={e =>
                                  setFieldValue('city', e.target.value)
                                }
                              />
                              <Form.Label>City</Form.Label>
                              <span className="d-block text-danger text_small">
                                <ErrorMessage name="city" />
                              </span>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Control
                                type="text"
                                placeholder="Enter your county"
                                name="country"
                                value={
                                  autoSentenceCase
                                    ? capitalizeSentence(values.country)
                                    : values.country
                                }
                                onChange={e =>
                                  setFieldValue('country', e.target.value)
                                }
                              />
                              <Form.Label>County*</Form.Label>
                              <span className="d-block text-danger text_small">
                                <ErrorMessage name="country" />
                              </span>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="mb-3 form-group">
                              <Form.Select
                                aria-label="Title"
                                name="source"
                                value={values.source}
                                onChange={handleChange}
                              >
                                <option>Please Select</option>
                                {contactSourceList?.map((item, index) => {
                                  return (
                                    <optgroup
                                      label={item?.source_category}
                                      key={index}
                                    >
                                      {item?.group_data?.map(
                                        (element, index) => {
                                          return (
                                            <option
                                              value={element?._id}
                                              key={index}
                                            >
                                              {element?.name}
                                            </option>
                                          );
                                        },
                                      )}
                                    </optgroup>
                                  );
                                })}
                              </Form.Select>
                              <Form.Label>
                                Where did you hear about us?*
                              </Form.Label>
                              <span className="d-block text-danger text_small">
                                <ErrorMessage name="source" />
                              </span>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}
                    <p>
                      <small>
                        Please note: by signing up below you agree to receiving
                        email communication from Best Parties Ever regarding
                        your booking and future promotions. You can unsubscribe
                        from future marketing at any point using the links
                        contained at the bottom of the emails you are sent.
                      </small>
                    </p>
                    <div className="text-center">
                      <Button type="submit" className="btn_primary">
                        Sign Up!
                        {signupLoading && (
                          <Spinner className="ms-2" size="sm" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

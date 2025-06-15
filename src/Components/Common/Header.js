import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';
import { SlideMenu } from 'primereact/slidemenu';

import Loader from './Loader';
import LocationPopup from './LocationPopup';

import GetCookies from 'hooks/GetCookies';
import RemoveCookies from 'hooks/RemoveCookies';

import { showMessage } from 'store/reducers/common.slice';
import { setIsUserLogin } from 'store/reducers/auths.slice';
import { sendEnquires } from 'store/reducers/Enquires/enquires.slice';
import { getVenueAllListData } from 'store/reducers/Venue/venue.slice';

import Logo from '../../Assets/img/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { venueAllList, venueList } = useSelector(({ venue }) => venue);
  const GetCookiesToken = GetCookies('Token');
  const { isEnquiresUpdated, enquiresLoading } = useSelector(
    ({ enquires }) => enquires,
  );
  const { aboutList, aboutLoading } = useSelector(({ about }) => about);
  const [warningModal, setWarningModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const setMenuOpenHandle = () => {
    setMenuOpen(!menuOpen);
  };

  const [enquire, setEnquire] = useState(false);

  const initialValues = {
    first_name: '',
    last_name: '',
    email_primary: '',
    pincode: '',
    phone_number: '',
    venue: '',
    number_of_people: '',
    cost: '',
    is_exclusive: false,
  };

  const aboutMenuData = aboutList?.map(itemData => {
    const data = {
      label: itemData?.name,
      icon: 'pi pi-check',
      className: 'menu_link',
      command: () => {
        navigate(`about/${itemData?.uri}/${itemData?._id}`);
        setMenuOpenHandle();
      },
    };
    return data;
  });

  const exclusiveSchema = Yup.object().shape({
    first_name: Yup.string().required('*First name is a required field'),
    last_name: Yup.string().required('*Last name is a required field'),
    email_primary: Yup.string()
      .email('Invalid email')
      .required('*Email address is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
    pincode: Yup.string().required('*Post Code is a required field'),
    phone_number: Yup.string().required(
      '*Telephone number is a required field',
    ),
    venue: Yup.string().required('*Venue is required field'),
    number_of_people: Yup.string().required(
      '*Number Of Guests is a required field',
    ),
    cost: Yup.string().required('*Budget/Cost  is a required field'),
  });

  const venueMenuData = venueList?.menuList?.map(itemData => {
    console.log('itemData', itemData);
    const data = {
      label: itemData?.region,
      className: 'clickabel_menu',
      items: itemData?.venues?.map(newItem => ({
        label: newItem?.public_name,
        icon: 'pi pi-fw pi-map-marker',
        className: 'menu_link',
        command: () => {
          navigate(
            `/christmas-parties/${newItem?.public_name?.split(' ')[0]}/${
              newItem?._id
            }`,
          );
          setMenuOpenHandle();
        },
      })),
    };
    return data;
  });

  const handleEnquire = () => {
    const pathname = location.pathname;
    const dynamicPatterns = [
      /^\/booking\/\w+$/,
      /^\/booking\/\w+\/confirm$/,
      /^\/booking\/\w+\/confirmterms$/,
    ];

    const shouldEnquire =
      dynamicPatterns.some(pattern => pattern.test(pathname)) ||
      [
        '/create-account',
        '/setup-account',
        '/forgot-password',
        '/account',
      ].includes(pathname);

    setEnquire(shouldEnquire);
  };

  const items = [
    {
      label: 'Home',
      command: () => {
        navigate('/');
        setMenuOpenHandle();
      },
    },
    {
      label: 'Venue',
      items: venueMenuData,
    },

    {
      separator: true,
    },
    {
      label: 'Exclusive Nights',
      command: () => {
        navigate('/exclusiveparties');
        setMenuOpenHandle();
      },
    },
    {
      label: 'About',
      className: 'clickabel_menu about_menu',
      items: [
        {
          label: 'Request a Brochure',
          icon: 'pi pi-check',
          className: 'menu_link',
          command: () => {
            navigate(`/request-brochures`);
            setMenuOpenHandle();
          },
        },
        ...aboutMenuData,
        {
          label: 'Non-Christmas Parties',
          className: 'menu_link',
          icon: 'pi pi-check',
          url: 'https://tapenade.co.uk/',
          target: '_blank',
        },
      ],
    },
  ];

  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('header').addClass('fixed');
        $('body').addClass('scroll');
      } else {
        $('header').removeClass('fixed');
        $('body').removeClass('scroll');
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getVenueAllListData());
  }, [dispatch]);

  return (
    <>
      {aboutLoading && <Loader />}
      <header className={menuOpen === true ? 'menu_collapse' : ''}>
        <Row className="align-items-center">
          <Col xxl={4} xl={3} xs={6}>
            <div className="left_hedaer">
              <div
                className="menu_toggle"
                onClick={() => setMenuOpenHandle(true)}
              >
                <i
                  className={menuOpen === true ? 'pi pi-times' : 'pi pi-bars'}
                ></i>
              </div>
              <div className="logo_wrap">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={9} xs={6}>
            <div className="right_header" onClick={() => setMenuOpen(false)}>
              {location.pathname === '/' ? (
                ''
              ) : (
                <>
                  <div className="search_box">
                    <div className="input_Wrapper">
                      <div
                        className="location_icon"
                        onClick={() => setVisible(true)}
                      >
                        <span className="material-symbols-outlined">
                          my_location
                        </span>
                      </div>
                      <div className="search_input">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Enter a location"
                        />
                      </div>
                    </div>
                    <div className="submit_button">
                      <button
                        className="btn_primary"
                        onClick={() => {
                          setWarningModal(true);
                          setVisible(true);
                        }}
                      >
                        <span className="material-symbols-outlined me-1">
                          search
                        </span>
                        Search
                      </button>
                    </div>
                    <LocationPopup
                      visible={visible}
                      setVisible={setVisible}
                      data={venueList}
                    />
                  </div>
                  <div className="search_mobile">
                    <Button
                      className="search_btn"
                      onClick={() => setVisible(true)}
                    >
                      <i className="pi pi-search"></i>
                    </Button>
                  </div>
                </>
              )}
              <ul>
                <li>
                  <Link to="tel:01932359900" className="call_link">
                    01932 359900
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="btn_border"
                    onClick={() => {
                      setVisibleModal(true);
                      handleEnquire();
                    }}
                  >
                    <i className="pi pi-envelope me-2"></i> ENQUIRE
                  </Link>
                </li>
                <li>
                  {GetCookiesToken ? (
                    <Link to="/account" className="btn_border_white">
                      <i className="pi pi-user me-2"></i> My Bookings
                    </Link>
                  ) : (
                    <Link to="/login" className="btn_border_white">
                      <i className="pi pi-user me-2"></i>{' '}
                      {location.pathname.includes('christmas-parties')
                        ? 'Book Now'
                        : 'Sign In / Bookings'}
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        {menuOpen === true && (
          <div className="menu_wrapper pt-120 pb-80">
            <div className="menu_inner">
              <SlideMenu
                model={items}
                viewportHeight={220}
                menuWidth={560}
              ></SlideMenu>
            </div>
            <div className="bottom_menu">
              <ul>
                <li>
                  <Link to="/account" onClick={() => setMenuOpenHandle()}>
                    <i className="pi pi-user"></i>Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request-brochures"
                    onClick={() => setMenuOpenHandle()}
                  >
                    <i className="pi pi-download"></i>Request a Brochure
                  </Link>
                </li>
                <li>
                  <Link to="mailto:sales@bestpartiesever.com">
                    <i className="pi pi-envelope"></i>sales@bestpartiesever.com
                  </Link>
                </li>
                <li>
                  <Link to="tel:01932359900">
                    <i className="pi pi-phone"></i>01932 359900
                  </Link>
                </li>
                {GetCookiesToken ? (
                  <li>
                    <Link
                      onClick={() => {
                        RemoveCookies('UserSession');
                        RemoveCookies('Token');
                        dispatch(setIsUserLogin(false));
                        setTimeout(() => {
                          dispatch(
                            showMessage({
                              message: 'Logged out Successfully',
                              varient: 'success',
                            }),
                          );
                          navigate('/login');
                        }, 1000);
                        setMenuOpen(false);
                      }}
                    >
                      <i className="pi pi-lock"></i>Logout
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          </div>
        )}
      </header>
      <Dialog
        header="Contact"
        visible={visibleModal}
        onHide={() => setVisibleModal(false)}
        style={{ width: '600px' }}
        draggable={false}
        resizable={false}
      >
        {enquire ? (
          <div className="contact_modal_wrap enquires">
            <p className="text-center">
              Thank you for your enquiry one of our team will get back to you
              shortly.
            </p>
            <div className="enquires_social_icon">
              <ul>
                <li className="facebook">
                  <Link
                    to="https://www.facebook.com/BestPartiesEver"
                    target="_blank"
                  >
                    <i className="pi pi-facebook"> </i>F O L L O W on F A C E B
                    O O K
                  </Link>
                </li>
                <li className="twitter">
                  <Link
                    to="https://twitter.com/BestPartiesEver"
                    target="_blank"
                  >
                    <i className="pi pi-twitter"></i>F O L L O W on T W I T T E
                    R
                  </Link>
                </li>
                <li className="instagram">
                  <Link
                    to="https://www.instagram.com/bestpartieseveruk/"
                    target="_blank"
                  >
                    <i className="pi pi-instagram"></i>F O L L O W on I N S T A
                    G R A M
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="contact_modal_wrap">
            <p>
              Please fill in the form below to send an enquiry to our team who
              will respond as soon as possible.
            </p>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={exclusiveSchema}
              onSubmit={values => {
                const customizedValues = {
                  ...values,
                  venue: [values?.venue],
                };
                dispatch(sendEnquires({ ...customizedValues }));
                if (isEnquiresUpdated) {
                  setEnquire(true);
                }
              }}
            >
              {({ handleSubmit, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm={6}>
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
                    </Col>
                    <Col sm={6}>
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
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Post Code*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Post Code"
                          name="pincode"
                          value={values?.pincode}
                          onChange={e =>
                            setFieldValue('pincode', e.target.value)
                          }
                        />
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="pincode" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
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
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Telephone Number*</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Telephone Number"
                          name="last_phone_numbername"
                          value={values?.phone_number}
                          onChange={e =>
                            setFieldValue('phone_number', e.target.value)
                          }
                        />
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="phone_number" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Venue*</Form.Label>
                        <Form.Select
                          id="Tertiaryvenue"
                          value={values?.venue}
                          onChange={e => {
                            setFieldValue('venue', e.target.value);
                          }}
                        >
                          <option value="">Please Select</option>
                          {venueAllList?.map(item => {
                            return (
                              <option value={item?._id} key={item?._id}>
                                {item?.public_name}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="venue" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Number of guests*</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number of guests"
                          name="number_of_people"
                          value={values?.number_of_people}
                          onChange={e =>
                            setFieldValue('number_of_people', e.target.value)
                          }
                        />
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="number_of_people" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Budget per head*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Budget/Cost"
                          name="cost"
                          value={values?.cost}
                          onChange={e => setFieldValue('cost', e.target.value)}
                        />
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="cost" />
                        </span>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="submit_btn text-end">
                    <Button className="btn_primary small" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Dialog>

      <Dialog
        header=""
        visible={warningModal}
        onHide={() => setWarningModal(false)}
        style={{ width: '600px' }}
        draggable={false}
        resizable={false}
        className="delete_popup"
      >
        <div className="delete_modal_wrap">
          <i
            className="pi pi-info-circle mb-4 text-warning"
            style={{ fontSize: '51px' }}
          ></i>
          <h3 className="mb-3 text_dark">Oops, something went wrong</h3>
          <p>
            It looks like the location search field is empty or invalid - try
            entering your closest city to get started.
          </p>
        </div>
        <Form>
          <div className="submit_btn text-center">
            <Button
              className="btn_primary small"
              onClick={() => setWarningModal(false)}
            >
              Ok
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
}

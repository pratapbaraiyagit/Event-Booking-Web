import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateBooking } from 'store/reducers/Booking/booking.slice';
import moment from 'moment';
import Loader from 'Components/Common/Loader';
export default function Overview({
  data,
  disableGuest,
  setDisableGuest,
  bookingLoading,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChangeForReference, SetIsChangeReference] = useState(true);
  const [isChangeForProvisional, SetIsChangeProvisional] = useState(true);
  const [referenceData, setRefrenceData] = useState('');
  const [provisionalData, setProvisionalData] = useState('');
  const [couponValue, setCouponValue] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState({
    dairy_free: 0,
    gluten_free: 0,
    halal: 0,
    nut_allergy: 0,
    vegan: 0,
    vegetarian: 0,
    wheelchair_user: 0,
  });
  useEffect(() => {
    if (Object.values(data)?.length > 0) {
      setSpecialRequirements({
        ...specialRequirements,
        dairy_free: data?.special_requirements?.dairy_free,
        gluten_free: data?.special_requirements?.gluten_free,
        halal: data?.special_requirements?.halal,
        nut_allergy: data?.special_requirements?.nut_allergy,
        vegan: data?.special_requirements?.vegan,
        vegetarian: data?.special_requirements?.vegetarian,
        wheelchair_user: data?.special_requirements?.wheelchair_user,
      });
    }
  }, [data]);

  const handleChange = e => {
    const { value, name } = e.target;
    setSpecialRequirements(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    navigate(`/booking/${id}/confirm`, { state: data });
  };
  return (
    <div className="overview_wrapper">
      {bookingLoading && <Loader />}
      <Row>
        <Col md={2}>
          <div className="overview_action_wrap">
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
                      <Link
                        to={{
                          pathname: `/booking/${id}/confirm`,
                        }}
                      >
                        <i className="pi pi-angle-double-right"></i> Pay Online
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={{ pathname: `/booking/${id}/confirmterms` }}>
                        <i className="pi pi-angle-double-right"></i> Pay by Bank
                        Transfer/BACS
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
        <Col md={5}>
          <div className="contact_detail mb-3">
            <div className="table_design_two">
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <i className="pi pi-user me-2"></i> Contact Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Your Reference:</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        {isChangeForReference === true ? (
                          <span>{data?.ref_number}</span>
                        ) : (
                          <input
                            type="text"
                            value={referenceData}
                            onChange={e => {
                              setRefrenceData(e.target.value);
                            }}
                          />
                        )}

                        <Button
                          className="btn_primary extra_small"
                          onClick={() => {
                            if (isChangeForReference === true) {
                              setRefrenceData(data?.ref_number);
                            } else {
                              dispatch(
                                updateBooking({
                                  _id: id,
                                  booking: { agent_ref_po_no: referenceData },
                                }),
                              );
                            }
                            SetIsChangeReference(!isChangeForReference);
                          }}
                        >
                          {isChangeForReference === true ? 'Change' : 'Update'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Organisation:</td>
                    <td>{data?.contact?.org_name}</td>
                  </tr>
                  <tr>
                    <td>Contact Name:</td>
                    <td>{data?.contact?.name}</td>
                  </tr>
                  <tr>
                    <td>Contact Email:</td>
                    <td>{data?.contact?.email}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="contact_detail">
            <div className="table_design_two">
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <i className="pi pi-tag me-2"></i> Coupons
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Add Coupon:</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <Form.Group className="form-group">
                          <Form.Control
                            type="text"
                            value={couponValue} // Bind the value to the couponValue
                            onChange={e => setCouponValue(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          className="btn_primary extra_small"
                          onClick={() => {
                            setCouponValue('');
                            dispatch(
                              updateBooking({
                                _id: id,
                                booking: { coupons: couponValue },
                              }),
                            );
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
        <Col md={5}>
          <div className="contact_detail">
            <div className="table_design_two">
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <i className="pi pi-calendar me-2"></i> Party Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Provisional Places:</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        {isChangeForProvisional === true ? (
                          <span>{data.provisional_places}</span>
                        ) : (
                          <input
                            type="text"
                            value={provisionalData}
                            onChange={e => {
                              setProvisionalData(e.target.value);
                            }}
                          />
                        )}

                        <Button
                          className="btn_primary extra_small"
                          onClick={() => {
                            if (isChangeForProvisional === true) {
                              setProvisionalData(data?.provisional_places);
                            } else {
                              dispatch(
                                updateBooking({
                                  _id: id,
                                  booking: {
                                    provisional_places: provisionalData,
                                  },
                                }),
                              );
                            }
                            SetIsChangeProvisional(!isChangeForProvisional);
                          }}
                        >
                          {isChangeForProvisional === true
                            ? 'Change'
                            : 'Update'}
                        </Button>
                        {isChangeForProvisional === true && (
                          <Button
                            className="btn_primary extra_small"
                            onClick={handleConfirm}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Party Date:</td>
                    <td>
                      {moment(data?.party_date).format('dddd, Do MMMM  YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td>Party Venue:</td>
                    <td>{data?.venue_public_name}</td>
                  </tr>
                  <tr>
                    <td>Party Theme:</td>
                    <td>{data?.theme_name}</td>
                  </tr>
                  <tr>
                    <td>Ticket Price:</td>
                    <td>
                      £{data?.price?.toFixed(2)} p/p{' '}
                      <span className="text_light text_small">
                        (£{data?.vat?.toFixed(2)} ex VAT)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Ticket Price::</td>
                    <td>
                      {data?.provisional_places} places
                      <b className="d-block text_big">
                        £{(data?.provisional_places * data?.price).toFixed(2)}
                      </b>
                      <span className="d-block text_light text_small">
                        (£{(data?.provisional_places * data?.vat).toFixed(2)} ex
                        VAT)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>

        {disableGuest === true && (
          <Col md={5} className="ms-auto">
            <div className="contact_detail">
              <div className="table_design_two">
                <Table>
                  <thead>
                    <tr>
                      <th colSpan={2}>
                        <i className="pi pi-calendar me-2"></i> Special
                        Requirements
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dairy Free:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="dairy_free"
                              value={specialRequirements.dairy_free}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Gluten Free:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="gluten_free"
                              value={specialRequirements.gluten_free}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Halal:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="halal"
                              value={specialRequirements.halal}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Nut Allergy:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="nut_allergy"
                              value={specialRequirements.nut_allergy}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>Vegan:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="vegan"
                              value={specialRequirements.vegan}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>Vegetarian:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="vegetarian"
                              value={specialRequirements.vegetarian}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Wheelchair User:</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Form.Group className="form-group">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="wheelchair_user"
                              value={specialRequirements.wheelchair_user}
                              onChange={e => handleChange(e)}
                            />
                          </Form.Group>
                        </div>
                      </td>
                    </tr>

                    {/* <div className="d-flex justify-content-between"> */}
                    <Button
                      className="btn_primary extra_small"
                      onClick={() =>
                        dispatch(
                          updateBooking({
                            _id: id,
                            booking: {
                              is_guest_system: false,
                              special_requirements: specialRequirements,
                            },
                          }),
                        )
                      }
                    >
                      Update Requirements
                    </Button>
                    {/* </div> */}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        )}
        <Col md={12}>
          {data?.notes && (
            <div className="table_design_two">
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <i className="pi pi-file me-2"></i> Booking Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {moment(data?.created_at).format('dddd MMM Do YYYY')}
                    </td>
                    <td>{data?.notes}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
          <div className="need_help_wrap ">
            <h2 className="text_dark fw_500 mb-3">I need help!</h2>
            <p>
              We are working hard to make our online booking management as easy
              as possible but we understand that sometimes it is just easier to
              talk to someone. So if you need help with your booking in any way
              please call us on{' '}
              <Link to="tel:01932359900" className="text_dark fw-bold">
                01932 359900{' '}
              </Link>
              or email{' '}
              <Link
                to="mailto:bookings@bestpartiesever.com"
                className="text_primary"
              >
                bookings@bestpartiesever.com
              </Link>
            </p>
            {/* && !data.special_requirements */}
            {disableGuest === false && (
              <p>
                If you do not want to manage your guests individually but need
                to inform us of dietary requirements then you can disable the
                Guest List facility however you will no longer be able to email
                your guests or manage etickets individually plus your guests
                will not be able to log in and download their own etickets. To
                disable your Guest List:{' '}
                <Button
                  className="btn_primary extra_small"
                  onClick={() => {
                    dispatch(
                      updateBooking({
                        _id: id,
                        booking: { is_guest_system: false },
                      }),
                    );
                    setDisableGuest(true);
                  }}
                >
                  Click Here
                </Button>
              </p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

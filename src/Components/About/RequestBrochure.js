import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRequestBrochureData,
  setRequestABrochureUpdated,
} from 'store/reducers/RequestABrochure/requestABrochure.slice';
import { getVenueAllListData } from 'store/reducers/Venue/venue.slice';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Loader from 'Components/Common/Loader';
import { useNavigate } from 'react-router-dom';

export default function RequestBrochure() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { venueAllList } = useSelector(({ venue }) => venue);
  const { requestABrochureLoading, requestABrochureUpdated } = useSelector(
    ({ requestABrochure }) => requestABrochure,
  );

  const initialValues = {
    venue_1: '',
    venue_2: '',
    venue_3: '',
    approx_places: '',
    remember: true,
  };

  const requestABrochureSchema = Yup.object().shape({
    venue_1: Yup.string().required('*Venue is required field'),
    approx_places: Yup.string().required('*Approx Places is a required field'),
  });

  useEffect(() => {
    dispatch(getVenueAllListData());
  }, [dispatch]);

  useEffect(() => {
    if (requestABrochureUpdated) {
      navigate('/login');
      dispatch(setRequestABrochureUpdated(false));
    }
  }, [requestABrochureUpdated]);

  return (
    <>
      {requestABrochureLoading && <Loader />}
      <div className="request_brochure_wrapper">
        <div className="inner_banner login_banner">
          <div className="container">
            <h1>Request A Brochure</h1>
          </div>
        </div>
        <div className="request_brochure_inner pt-120 pb-120">
          <div className="container">
            <p>You can select up to 3 venues to request a brochure for.</p>
            <p>
              Please select your preferred venue as the primary venue and if you
              would like any extra brochures please add them as secondary or
              tertiary venues.
            </p>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={requestABrochureSchema}
              onSubmit={values => {
                dispatch(getRequestBrochureData({ ...values }));
              }}
            >
              {({ handleSubmit, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Form.Group className="form-group mb-3">
                        <Form.Select
                          id="Primaryvenue"
                          value={values?.venue_1}
                          onChange={e => {
                            setFieldValue('venue_1', e.target.value);
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
                        <Form.Label for="Primaryvenue">
                          Primary venue*
                        </Form.Label>
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="venue_1" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="form-group mb-3">
                        <Form.Select
                          id="Tertiaryvenue"
                          value={values?.venue_2}
                          onChange={e => {
                            setFieldValue('venue_2', e.target.value);
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
                        <Form.Label for="Tertiaryvenue">
                          Tertiary venue (optional)
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="form-group mb-3">
                        <Form.Select
                          id="Tertiaryvenue"
                          value={values?.venue_3}
                          onChange={e => {
                            setFieldValue('venue_3', e.target.value);
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
                        <Form.Label for="Tertiaryvenue">
                          Secondary venue (optional)
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="form-group mb-3">
                        <Form.Control
                          type="number"
                          placeholder="Approx Places"
                          name="approx_places"
                          value={values?.approx_places}
                          onChange={e =>
                            setFieldValue('approx_places', e.target.value)
                          }
                        />
                        <Form.Label for="Tertiaryvenue">
                          Approx Places*
                        </Form.Label>
                        <span className="d-block text-danger text_small">
                          <ErrorMessage name="approx_places" />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="form-group mb-3">
                        <Form.Check
                          id="remember"
                          label="I always forget about capital letters - please fix it for me!"
                          checked={values?.remember}
                          onChange={e =>
                            setFieldValue('remember', e.target.checked)
                          }
                        />
                      </Form.Group>
                      <div className="submit_btn">
                        <Button className="btn_primary w-100" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

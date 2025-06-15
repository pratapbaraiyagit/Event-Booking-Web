import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';

export const NeverMiss = () => {
  const dispatch = useDispatch();

  const initialValues = {
    first_name: '',
    last_name: '',
    email_primary: '',
  };

  const signupSchema = Yup.object().shape({
    first_name: Yup.string().required('*First name is a required field'),
    last_name: Yup.string().required('*Last name is a required field'),
    email_primary: Yup.string()
      .email('Invalid email')
      .required('*Email address is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
  });
  return (
    <div className="container">
      <Row>
        <Col md={8}>
          <div className="newsletter_inner">
            <h2>NEVER MISS A BEAT</h2>
            <p className="mb-4">
              Join our mailing list, and be the first to know about last minute
              deals and new venues we release.
            </p>
            <div className="newsletter_form">
              <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={values => {
                  // console.log('values', values);
                  //   dispatch(signupAction(values));
                }}
              >
                {({ handleSubmit, handleChange, setFieldValue, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="first_name"
                            value={values.first_name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="First Name"
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="first_name" />
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Last Name"
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="last_name" />
                          </span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email_primary"
                            value={values.email_primary}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email"
                          />
                          <span className="d-block text-danger text_small">
                            <ErrorMessage name="email_primary" />
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <div className="submit_btn">
                      <Button type="submit" className="btn_border">
                        <i className="pi pi-envelope me-2"></i> Sign Up
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from 'store/reducers/auths.slice';
import { Formik, ErrorMessage } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginLoading, isUserLogin } = useSelector(({ auth }) => auth);
  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isUserLogin) {
      navigate('/account');
    }
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('*Email is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
    password: Yup.string().required('*Password is a required field'),
  });

  return (
    <div className="login_wrapper">
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Sign In</h1>
        </div>
      </div>
      <div className="login_inner pt-120 pb-120">
        <div className="container">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const obj = {
                email: values.email,
                password: values.password,
              };
              dispatch(loginAction(obj));
            }}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="login_form">
                  <h3 className="fw_400">Please sign in</h3>
                  <Form.Group className="mb-3 form-group">
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={e => {
                        handleChange('email')(e.target.value);
                      }}
                    />
                    <span className="text_primary">
                      <ErrorMessage name="email" />
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={e => {
                        handleChange('password')(e.target.value);
                      }}
                    />
                    <span className="text_primary">
                      <ErrorMessage name="password" />
                    </span>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn_primary w-100 mb-3"
                    // onClick={() => navigate('/account')}
                  >
                    Sign In
                    {loginLoading && <Spinner className="ms-2" size="sm" />}
                  </Button>
                  <div className="forgot_pass">
                    <Link to="/forgot-password">
                      Forgot your password? Click Here
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="dont_have_account_wrap">
            <Row className="g-4">
              <Col md={6}>
                <div className="text-center">
                  <h2>Booked over the phone?</h2>
                  <p>
                    If you booked over the phone then Just click the button
                    below:
                  </p>
                  <Link to="/setup-account" className="btn_border">
                    Setup Password
                  </Link>
                </div>
              </Col>
              <Col md={6}>
                <div className="text-center">
                  <h2>Don't have an account?</h2>
                  <p>
                    No problems - it is really quick and easy to create one.
                    Just click the button below:
                  </p>
                  <Link to="/create-account" className="btn_border">
                    Create New Account
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

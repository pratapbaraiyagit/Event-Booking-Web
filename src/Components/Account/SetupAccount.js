import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import {
  forgotPasswordAction,
  setForgotPasswordLoading,
  setIsForgotPassword,
} from 'store/reducers/auths.slice';

export default function SetupAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { forgotPasswordLoading, isUserForgotPassword } = useSelector(
    ({ auth }) => auth,
  );

  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('*Email is a required field')
      .matches(/^\w+([.]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email'),
  });

  useEffect(() => {
    if (forgotPasswordLoading) {
      setTimeout(() => {
        navigate(location?.pathname ? location.pathname : '/login', {
          replace: true,
        });
        dispatch(setForgotPasswordLoading(false));
      }, 1000);
    }
  }, [forgotPasswordLoading]);

  useEffect(() => {
    if (isUserForgotPassword) {
      setTimeout(() => {
        navigate('/login');
        dispatch(setIsForgotPassword(false));
      }, 1000);
    }
  }, [isUserForgotPassword]);

  return (
    <div className="login_wrapper setup_wrapper">
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Set your Password</h1>
        </div>
      </div>
      <div className="setup_account_wrap pt-120 pb-120">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const obj = {
              email: values.email,
            };
            dispatch(forgotPasswordAction(obj));
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="container">
                <h2 className="h1">Set an Account Password</h2>
                <p>
                  If you made a provisional booking over the phone and have not
                  setup a password to access your booking online then please
                  enter your email address below and we'll ping you over a quick
                  email just to confirm your address and give you a unique,
                  secure link where you can set your own password.
                </p>
                <p>OK? Then let's go! Enter your email below:</p>
                <Form.Group className="mb-4 form-group">
                  <Form.Control
                    type="email"
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
                <Button type="submit" className="btn_primary mb-3">
                  Send me the link
                  {forgotPasswordLoading && (
                    <Spinner className="ms-2" size="sm" />
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

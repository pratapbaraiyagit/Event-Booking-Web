import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  forgotPasswordAction,
  setForgotPasswordLoading,
  setIsForgotPassword,
} from 'store/reducers/auths.slice';
import { Formik, ErrorMessage } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  let reportParamData = Object.fromEntries([...searchParams]);

  const { forgotPasswordLoading, isUserForgotPassword } = useSelector(
    ({ auth }) => auth,
  );

  const initialValues = {
    email: reportParamData?.e || '',
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
    <div className="login_wrapper forgot_wrapper">
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Reset your Password</h1>
        </div>
      </div>
      <div className="forgot_wrap pt-120 pb-120">
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
                <h2>Reset your Password</h2>
                <div className="forgot_form">
                  <Form.Group className="mb-3 form-group">
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
                  <Button type="submit" className="btn_primary w-100 mb-3">
                    Reset{' '}
                    {forgotPasswordLoading && (
                      <Spinner className="ms-2" size="sm" />
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

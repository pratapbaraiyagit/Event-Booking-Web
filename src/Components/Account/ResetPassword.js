import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  resetPasswordAction,
  setResetPasswordLoading,
} from 'store/reducers/auths.slice';
import { Formik, ErrorMessage } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { resetPasswordLoading } = useSelector(({ auth }) => auth);

  const initialValues = {
    password: '',
    confirmpassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('*Password is a required field'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], `Passwords Don't Match!`)
      .required('*Confirm password is a required field'),
  });

  useEffect(() => {
    if (resetPasswordLoading) {
      setTimeout(() => {
        navigate(
          location?.state?.prevRoute?.pathname
            ? location.state.prevRoute.pathname
            : '/login',
          { replace: true },
        );
        dispatch(setResetPasswordLoading(false));
      }, 1000);
    }
  }, [resetPasswordLoading]);

  return (
    <div className="login_wrapper">
      <div className="inner_banner login_banner">
        <div className="container">
          <h1>Reset Password</h1>
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
                password: values.password,
                confirmpassword: values.confirmpassword,
              };
              dispatch(resetPasswordAction({ token: location?.search, obj }));
            }}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="login_form">
                  {/* <h3 className="fw_400">Reset Password</h3> */}
                  <Form.Group className="mb-3 form-group">
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                      value={values.password}
                      onChange={e => {
                        handleChange('password')(e.target.value);
                      }}
                    />
                    <span className="text_primary">
                      <ErrorMessage name="password" />
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Control
                      type="password"
                      placeholder="Enter confirm password"
                      value={values.confirmpassword}
                      onChange={e => {
                        handleChange('confirmpassword')(e.target.value);
                      }}
                    />
                    <span className="text_primary">
                      <ErrorMessage name="confirmpassword" />
                    </span>
                  </Form.Group>
                  <Button type="submit" className="btn_primary w-100 mb-3">
                    Set Password
                    {resetPasswordLoading && (
                      <Spinner className="ms-2" size="sm" />
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

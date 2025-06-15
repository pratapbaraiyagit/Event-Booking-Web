import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from 'store/reducers/common.slice';
import { Toast } from 'primereact/toast';

function ToastNotification() {
  const toast = useRef(null);
  const { showMessage, message, varient } = useSelector(({ common }) => common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showMessage === true) {
      toast.current.show({
        severity: varient == 'success' ? 'success' : 'info',
        detail: message,
      });
      setTimeout(s => {
        dispatch(hideMessage());
      }, 3000);
    }
  }, [dispatch, showMessage]);

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
    </div>
  );
}
export default ToastNotification;

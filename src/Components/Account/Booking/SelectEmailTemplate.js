import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog';
import Loader from 'Components/Common/Loader';
import {
  getGuestMailTemplateData,
  getGuestMailTemplateListData,
  sendEmail,
  setGuestEmailDetail,
} from 'store/reducers/Booking/guest.slice';

export default function SelectEmailTemplate({
  emailTemplateHandleChange,
  onSelectEmail,
  results,
  data,
}) {
  const dispatch = useDispatch();
  const [emailTemplate, setEmailTemplate] = useState();
  const { guestMailTemplateList, guestLoading, guestEmailDetail } = useSelector(
    ({ guest }) => guest,
  );

  const [emailStatus, setEmailStatus] = useState(false);
  const [popupModal, setPopupModal] = useState(false);

  useEffect(() => {
    dispatch(getGuestMailTemplateListData({}));
  }, [dispatch]);

  const handleEditEmail = () => {
    setEmailStatus(!emailStatus);
    onSelectEmail(!emailStatus);
    emailTemplate
      ? dispatch(
          getGuestMailTemplateData({
            transactional_email_id: emailTemplate,
          }),
        )
      : dispatch(setGuestEmailDetail({}));
  };

  const handleSendEmail = () => {
    let payload = {
      from_name: 'Best Parties Ever',
      send_from: 'sales@bestpartiesever.email',
      subject: guestEmailDetail?.subject,
      from_email: data?.contact?.email,
      to_email: results?.filter(i => i.isChecked === true)?.map(i => i.email),
      email_body: guestEmailDetail?.email_contents,
      attachments: guestEmailDetail?.attachments,
      ref_type: 6,
      ref_id: results?.filter(i => i.isChecked === true)?.map(i => i.email),
    };
    // setPopupModal(true);

    results?.filter(i => i.isChecked === true)?.length === 0
      ? setPopupModal(true)
      : dispatch(
          sendEmail({
            payload,
          }),
        );
  };

  return (
    <div className="select_email_template mb-3">
      {guestLoading && <Loader />}
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-envelope me-2"></i> Select Email Template
        </h4>
        <Button
          className="btn_primary small"
          onClick={() => {
            emailTemplateHandleChange(false);
            onSelectEmail(false);
          }}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>

      <div className="p-3">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="form-group">
              <Form.Select
                aria-label="Default select example"
                value={emailTemplate}
                onChange={e => {
                  setEmailTemplate(e.target.value);
                }}
              >
                <option value="">Please Select Email Template</option>
                {guestMailTemplateList?.map((item, index) => {
                  return (
                    <option value={item?._id} key={index}>
                      {item?.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <div className="d-flex flex-wrap">
              <Button
                className="btn_primary small me-3 mb-1"
                onClick={handleEditEmail}
              >
                <i className="pi pi-file-edit me-2"></i> Edit Email
              </Button>
              <Button
                className="btn_primary small mb-1"
                onClick={handleSendEmail}
              >
                <i className="pi pi-send me-2"></i> Send Email
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Dialog
        header=""
        visible={popupModal}
        onHide={() => setPopupModal(false)}
        style={{ width: '600px' }}
        draggable={false}
        resizable={false}
        className="delete_popup"
      >
        <div className="delete_modal_wrap">
          <p>You havent selected any guests to email.</p>
        </div>
      </Dialog>
    </div>
  );
}

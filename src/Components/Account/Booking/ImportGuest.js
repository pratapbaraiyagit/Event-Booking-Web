import { useCallback, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FileUpload } from 'primereact/fileupload';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import {
  getImportGuestsListData,
  setImportGuestsListData,
} from 'store/reducers/Booking/guest.slice';

export default function ImportGuest({ importGuestHandleChange }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [totalSize, setTotalSize] = useState(0);

  const downloadExample = () => {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('My Sheet', {});
    const staticValues = [
      ['Joe', 'Bloggs', 'joebloggs@example.com'],
      ['Jane', 'Doe', 'janedoe@example.com'],
      ['Gordon', 'Bennett', 'gb@example.com'],
      ['Mr', 'Bus', 'mrbus@example.com'],
      ['Annette', 'Curtains', 'ac@example.com'],
      ['Eileen', 'Dover', 'edover@example.com'],
      ['Amanda', 'Huggenkiss', 'amanda@example.com'],
      ['Sue', 'Flay', 'sueflay@example.com'],
    ];
    staticValues.forEach(row => {
      worksheet.addRow(row);
    });
    workbook.xlsx.writeBuffer().then(function (buffer) {
      const blob = new Blob([buffer], { type: 'applicationi/xlsx' });
      saveAs(blob, 'myexcel.xlsx');
    });
  };

  const onUpload = useCallback(
    async event => {
      const uploadedFile = event.files[0];
      const reader = new FileReader();

      reader.onload = async e => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const updated = jsonData?.filter(x => x?.length > 0);

        const convertedData = updated.map(([first_name, last_name, email]) => ({
          first_name,
          last_name,
          email,
        }));

        dispatch(
          getImportGuestsListData({ booking_id: id, payload: convertedData }),
        );
      };

      reader.readAsArrayBuffer(uploadedFile);
    },
    [dispatch, id],
  );

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };
  const itemTemplate = (file, props) => {
    return (
      <div className="p-fileupload-row file-uploded-wrap">
        <div className="file-inner-wrap">
          <div className="file-uploded fw-bold">{file?.name}</div>
        </div>
        <div className="file-clos-btn">
          <button
            type="button"
            className="p-button p-component p-button-danger p-button-text p-button-rounded p-button-icon-only"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          >
            <span className="p-button-icon p-c pi pi-times"></span>
            <span className="p-button-label p-c">&nbsp;</span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="import_gueast_wrap">
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-upload me-2"></i> Import Guests
        </h4>
        <Button
          className="btn_primary small"
          onClick={() => {
            importGuestHandleChange(false);
            dispatch(setImportGuestsListData([]));
          }}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>
      <div className="import_gueast_body">
        <Row>
          <Col md={3}>
            <div className="file_upload">
              <FileUpload
                name="demo[]"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                customUpload={true}
                maxFileSize={1000000}
                uploadHandler={onUpload}
                itemTemplate={itemTemplate}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="center_content p-3">
              <p>
                If you have lots of guests to add then add them all to an Excel
                spreadsheet with First Name in the first column, Surname in the
                second column and Email address in the third.{' '}
                <span className="text_primary">
                  Email addresses need to be unique or set to "none".
                </span>
              </p>
            </div>
          </Col>
          <Col md={3}>
            <div className="download_Wrap_right">
              <Button
                className="btn_primary small mb-2"
                onClick={() => {
                  downloadExample();
                }}
              >
                <i className="pi pi-download me-2"></i> Download Example
              </Button>
              <p>
                Download an example spreadsheet template you can update and
                upload.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

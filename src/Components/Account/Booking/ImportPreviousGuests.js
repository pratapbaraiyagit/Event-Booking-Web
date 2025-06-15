import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';

import { importPreviousGuest } from 'store/reducers/Booking/guest.slice';

export default function ImportPreviousGuests({
  importStatusHandleChange,
  results,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [popupModal, setPopupModal] = useState(false);

  return (
    <div className="import_prev_guest_wrap mb-3">
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-file-import me-2"></i> Import Previous guests
        </h4>
        <Button
          className="btn_primary small"
          onClick={importStatusHandleChange}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>
      <div className="p-3">
        <Button
          className="btn_primary small"
          onClick={() =>
            results?.filter(i => i.checked === true)?.length === 0
              ? setPopupModal(true)
              : dispatch(
                  importPreviousGuest({
                    booking_id: id,
                    data: results
                      ?.filter(i => i.checked === true)
                      ?.map(i => i._id),
                  }),
                )
          }
        >
          <i className="pi pi-file-import me-2"></i> Import
        </Button>
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
          <p>You havent selected any guests to import.</p>
        </div>
      </Dialog>
    </div>
  );
}

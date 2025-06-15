import Loader from 'Components/Common/Loader';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function SearchForGuest({
  searchGuestsHandleChange,
  onSearch,
  listData,
}) {
  const [searchForGuests, setSearchForGuests] = useState('');
  const { guestLoading } = useSelector(({ guest }) => guest);
  const handleSearchGuests = e => {
    const results = listData.filter(item => {
      return (
        item.first_name.toLowerCase().includes(searchForGuests.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchForGuests.toLowerCase()) ||
        item.email.toLowerCase().includes(searchForGuests.toLowerCase())
      );
    });
    onSearch(results);
  };

  const handleClearSearch = () => {
    setSearchForGuests('');
    onSearch(listData);
  };

  return (
    <div className="search_for_guest_wrap mb-3">
      {guestLoading && <Loader />}
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-search me-2"></i> Search For Guests
        </h4>
        <Button
          className="btn_primary small"
          onClick={() => {
            searchGuestsHandleChange(false);
            onSearch(listData);
          }}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>
      <div className="search_for_guest_inner p-3">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group className="form-group">
              <Form.Control
                type="search"
                placeholder="Search for guests"
                value={searchForGuests}
                onChange={e => {
                  setSearchForGuests(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <div className="d-flex flex-wrap">
              <Button
                className="btn_primary small me-3 mb-1"
                onClick={handleSearchGuests}
              >
                <i className="pi pi-search me-2"></i> Search Guests
              </Button>
              <Button
                className="btn_primary small mb-1"
                onClick={handleClearSearch}
              >
                <i className="pi pi-times me-2"></i> Clear Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

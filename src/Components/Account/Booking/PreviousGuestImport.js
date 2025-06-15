import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Table, Form } from 'react-bootstrap';

import FilterGuest from './FilterGuest';
import SearchForGuest from './SearchForGuest';
import ImportPreviousGuests from './ImportPreviousGuests';

import Loader from 'Components/Common/Loader';
import { getPreviousGuestListData } from 'store/reducers/Booking/guest.slice';

const PreviousGuestImport = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { previousGuestList, guestLoading, isGuestImported } = useSelector(
    ({ guest }) => guest,
  );
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [importStatus, setImportStatus] = useState(false);
  const [filterGuests, setFilterGuests] = useState(false);
  const [searchGuests, setSearchGuests] = useState(false);
  const [selectAllStatus, setSelectAllStatus] = useState(false);

  const handleCheckboxChange = (index, checked) => {
    const updatedCheckboxes = [...results];
    updatedCheckboxes[index].checked = checked;
    setResults(updatedCheckboxes);
    setIsActive(!isActive);
  };

  const handleSearchResult = result => {
    let prevGuestListArray = [];
    result.map(i => {
      prevGuestListArray.push({ ...i, checked: false });
      return prevGuestListArray;
    });
    setResults(prevGuestListArray);
  };

  const searchGuestsHandleChange = () => {
    setSearchGuests(!searchGuests);
  };

  const filterGuestsHandleChange = () => {
    setFilterGuests(!filterGuests);
  };

  const importStatusHandleChange = () => {
    setImportStatus(!importStatus);
  };

  const handleFilterResult = result => {
    let prevGuestListArray = [];
    result.map(i => {
      prevGuestListArray.push({ ...i, checked: false });
      return prevGuestListArray;
    });
    setResults(prevGuestListArray);
  };

  useEffect(() => {
    if (id || isGuestImported) {
      dispatch(getPreviousGuestListData({ booking_id: id }));
    }
  }, [dispatch, id, isGuestImported]);

  useEffect(() => {
    if (previousGuestList) {
      let prevGuestListArray = [];
      previousGuestList.map(i => {
        prevGuestListArray.push({ ...i, checked: false });
        return prevGuestListArray;
      });
      setResults(prevGuestListArray);
    }
  }, [previousGuestList]);

  return (
    <div className="guest_list_wrapper">
      {guestLoading && <Loader />}
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="text_dark fw_500 m-0">Previous Guest Import</h2>
        </Col>
        <Col md={6}>
          <div className="filter_button_right">
            <ul>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    importStatusHandleChange();
                    setSearchGuests(false);
                    setFilterGuests(false);
                  }}
                >
                  <i className="pi pi-book"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    searchGuestsHandleChange();
                    setFilterGuests(false);
                    setImportStatus(false);
                  }}
                >
                  <i className="pi pi-search"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setImportStatus(false);
                    setSearchGuests(false);
                    filterGuestsHandleChange();
                  }}
                >
                  <i className="pi pi-filter"></i>
                </Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      {searchGuests === true && (
        <SearchForGuest
          searchGuestsHandleChange={searchGuestsHandleChange}
          onSearch={handleSearchResult}
          listData={previousGuestList}
        />
      )}

      {filterGuests === true && (
        <FilterGuest
          filterGuestsHandleChange={filterGuestsHandleChange}
          onFilter={handleFilterResult}
          listData={previousGuestList}
          checkCondition={false}
        />
      )}
      {importStatus === true && (
        <ImportPreviousGuests
          importStatusHandleChange={importStatusHandleChange}
          results={results}
        />
      )}

      <div className="guest_list_table_wrap">
        <div className="table_design_two">
          <Table>
            <thead>
              <tr>
                <th>
                  <i className="pi pi-users me-2"></i> Guest List
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="no_data">
                    (click on guest\s to select for import)
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="guest_list_table_wrap mb-3">
        <div className="text-end mb-3">
          <Button
            className="btn btn-success small"
            onClick={() => {
              setSelectAllStatus(!selectAllStatus);
              let prevGuestListArray = [];
              previousGuestList.map(i => {
                prevGuestListArray.push({
                  ...i,
                  checked: selectAllStatus ? false : true,
                });
                return prevGuestListArray;
              });
              setResults(prevGuestListArray);
            }}
          >
            {selectAllStatus ? 'De-select All' : 'Select All'}
          </Button>
        </div>
        <div className="text-end">
          <Button
            className="btn_primary small"
            onClick={() => {
              setImportStatus(false);
              setSearchGuests(false);
              filterGuestsHandleChange();
            }}
          >
            <i className="pi pi-filter me-2"></i> Filter Guest
          </Button>
        </div>
      </div>
      <div className="table_design_one guest_table_wrapper">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Selected</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>
                <i className="fa-solid fa-wheelchair-move"></i>
              </th>
              <th>
                <i className="fa-solid fa-utensils"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {results?.map((item, index) => {
              return (
                <tr
                  key={item?._id}
                  onClick={() => handleCheckboxChange(index, !isActive)}
                >
                  <td className="selected">
                    <div>
                      <Form.Check
                        type="checkbox"
                        id={`capital-${index}`}
                        label="&nbsp;"
                        checked={results[index]?.checked || false}
                        onChange={e => {
                          handleCheckboxChange(index, e.target.checked);
                        }}
                      />
                    </div>
                  </td>
                  <td className="first_name">{item?.first_name}</td>
                  <td className="last_name">{item?.last_name}</td>
                  <td className="email_address">{item?.email}</td>
                  <td className="wheelchair">
                    {item?.requirements?.find(
                      i => i.title === 'Wheelchair User',
                    )?.is_selected === true && (
                      <i className="pi pi-check fw-bold"></i>
                    )}
                  </td>
                  <td className="vegetarian">
                    {item?.requirements?.find(
                      i => i.title !== 'Wheelchair User',
                    )?.is_selected === true && (
                      <i className="pi pi-check fw-bold"></i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PreviousGuestImport;

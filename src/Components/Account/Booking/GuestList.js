import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Table } from 'react-bootstrap';

import Loader from 'Components/Common/Loader';
import {
  getGuestListData,
  setImportGuestsListData,
} from 'store/reducers/Booking/guest.slice';

import AddNewGuest from './AddNewGuest';
import FilterGuest from './FilterGuest';
import ImportGuest from './ImportGuest';
import SearchForGuest from './SearchForGuest';

export default function GuestList({
  data,
  importPreviousGuestsHandleChange,
  setImportPreviousGuests,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { guestList, guestLoading, isGuestUpdated } = useSelector(
    ({ guest }) => guest,
  );

  let noOfPlacesBooked = data?.provisional_places
    ? data?.provisional_places
    : 0;
  let noOfGuests = guestList ? guestList?.length : 0;
  let noOfPlacesAccepted = guestList
    ? guestList?.filter(i => i?.is_attending === 0)?.length
    : 0;

  const [results, setResults] = useState([]);
  const [importGuests, setImportGuests] = useState(false);
  const [searchGuests, setSearchGuests] = useState(false);
  const [filterGuests, setFilterGuests] = useState(false);
  const [addNewGuest, setAddNewGuest] = useState(false);

  const handleSearchResult = result => {
    setResults(result);
  };
  const handleFilterResult = result => {
    setResults(result);
  };

  const importGuestHandleChange = () => {
    setImportGuests(!importGuests);
  };

  const searchGuestsHandleChange = () => {
    setSearchGuests(!searchGuests);
  };

  const filterGuestsHandleChange = () => {
    setFilterGuests(!filterGuests);
  };

  const addNewGuestHandleChange = () => {
    setAddNewGuest(!addNewGuest);
    dispatch(setImportGuestsListData([]));
  };

  const onCloseTabHandler = tabDetail => {
    let guestListData = [...results];
    guestListData = guestListData.map(item => {
      if (tabDetail._id === item._id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setResults(guestListData);
    dispatch(setImportGuestsListData([]));
  };

  useEffect(() => {
    if (id || isGuestUpdated) {
      dispatch(getGuestListData({ booking_id: id }));
    }
  }, [dispatch, id, isGuestUpdated]);

  useEffect(() => {
    if (guestList?.length > 0) {
      const guestListData = guestList.map(item => {
        return { ...item, isOpen: false };
      });
      setResults(guestListData);
    }
  }, [guestList]);

  return (
    <div className="guest_list_wrapper">
      {guestLoading && <Loader />}
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="text_dark fw_500 m-0">Guest List Management</h2>
        </Col>
        <Col md={6}>
          <div className="filter_button_right">
            <ul>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setSearchGuests(false);
                    setFilterGuests(false);
                    setAddNewGuest(false);
                    setImportPreviousGuests(false);
                    importGuestHandleChange();
                    dispatch(setImportGuestsListData([]));
                  }}
                >
                  <i className="pi pi-upload"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setSearchGuests(false);
                    setFilterGuests(false);
                    setAddNewGuest(false);
                    setImportGuests(false);
                    importPreviousGuestsHandleChange();
                    dispatch(setImportGuestsListData([]));
                  }}
                >
                  <i className="pi pi-user-plus"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setImportGuests(false);
                    setFilterGuests(false);
                    setAddNewGuest(false);
                    setImportPreviousGuests(false);
                    searchGuestsHandleChange();
                    dispatch(setImportGuestsListData([]));
                  }}
                >
                  <i className="pi pi-search"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setSearchGuests(false);
                    setImportGuests(false);
                    setAddNewGuest(false);
                    setImportPreviousGuests(false);
                    filterGuestsHandleChange();
                    dispatch(setImportGuestsListData([]));
                  }}
                >
                  <i className="pi pi-filter"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setSearchGuests(false);
                    setImportGuests(false);
                    setFilterGuests(false);
                    setImportPreviousGuests(false);
                    addNewGuestHandleChange();
                    dispatch(setImportGuestsListData([]));
                  }}
                >
                  <i className="pi pi-user-plus me-2"></i> Add Guest
                </Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <div className="guest_total_wrap mb-3">
        <ul>
          <li>
            No of places booked:
            <span>{noOfPlacesBooked}</span>
          </li>
          <li>
            No of guests:<span>{noOfGuests}</span>
          </li>
          <li>
            No of places accepted:
            <span>{noOfPlacesAccepted}</span>
          </li>
          <li>
            Left to accept:
            <span>{noOfPlacesAccepted - noOfPlacesBooked}</span>
          </li>
        </ul>
      </div>
      {importGuests === true && (
        <ImportGuest importGuestHandleChange={importGuestHandleChange} />
      )}
      {searchGuests === true && (
        <SearchForGuest
          searchGuestsHandleChange={searchGuestsHandleChange}
          onSearch={handleSearchResult}
          listData={guestList}
        />
      )}
      {filterGuests === true && (
        <FilterGuest
          filterGuestsHandleChange={filterGuestsHandleChange}
          onFilter={handleFilterResult}
          listData={guestList}
        />
      )}
      {addNewGuest === true && (
        <AddNewGuest handleSubmit={addNewGuestHandleChange} />
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
                  <p className="no_data">(click on guest to edit)</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="guest_list_table_wrap mb-3">
        <div className="text-end">
          <Button
            className="btn_primary small"
            onClick={() => {
              setSearchGuests(false);
              setImportGuests(false);
              setAddNewGuest(false);
              setImportPreviousGuests(false);
              filterGuestsHandleChange();
            }}
          >
            <i className="pi pi-filter me-2"></i> Filter Guest
          </Button>
        </div>
      </div>
      <div className="table_design_one guest_table_wrapper">
        <Table striped hover>
          <thead>
            <tr>
              <th>Places</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Managed By</th>
              <th>
                <i className="pi pi-envelope me-1"></i> Invited
              </th>
              <th>
                <i className="pi pi-check-square me-1"></i> Attending
              </th>
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
                <React.Fragment key={index}>
                  <tr
                    onClick={() => onCloseTabHandler(item)}
                    className={item?.managed_by ? 'highlight' : ''}
                  >
                    <td className="places">
                      {item?.is_manager === true && (
                        <i className="pi pi-users"></i>
                      )}
                      {item?.managed_by && <i className="pi pi-arrow-up"></i>}
                    </td>
                    <td className="first_name">{item?.first_name}</td>
                    <td className="last_name">{item?.last_name}</td>
                    <td className="manage_by">{item?.managed_by}</td>
                    <td className="invited">{item?.is_imported}</td>
                    <td className="attending">
                      {item?.is_attending === 0 ? (
                        <i className="pi pi-check fw-bold"></i>
                      ) : item?.is_attending === 1 ? (
                        <i
                          className="pi pi-times fw-bold"
                          style={{ color: 'red' }}
                        ></i>
                      ) : (
                        <i className="pi pi-question fw-bold"></i>
                      )}
                    </td>
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
                  {item.isOpen && (
                    <tr className="expanded">
                      <td colSpan={8}>
                        <AddNewGuest
                          data={item}
                          handleSubmit={() => onCloseTabHandler(item)}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

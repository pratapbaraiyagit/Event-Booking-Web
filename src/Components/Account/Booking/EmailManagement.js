import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';

import FilterGuest from './FilterGuest';
import SearchForGuest from './SearchForGuest';
import SelectEmailTemplate from './SelectEmailTemplate';

import Loader from 'Components/Common/Loader';
import {
  getGuestListData,
  setGuestEmailDetail,
} from 'store/reducers/Booking/guest.slice';

export default function EmailManagement({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchGuests, setSearchGuests] = useState(false);
  const [results, setResults] = useState([]);
  const [selectAllStatus, setSelectAllStatus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEmailStatus, setIsEmailStatus] = useState(false);
  const {
    guestMailTemplateList,
    guestLoading,
    guestEmailDetail,
    guestList,
    isSendEmail,
  } = useSelector(({ guest }) => guest);

  const searchGuestsHandleChange = () => {
    setSearchGuests(!searchGuests);
  };

  const [filterGuests, setFilterGuests] = useState(false);
  const filterGuestsHandleChange = () => {
    setFilterGuests(!filterGuests);
  };
  const [emailTemplate, setEmailTemplate] = useState(false);

  const emailTemplateHandleChange = () => {
    setEmailTemplate(!emailTemplate);
  };

  useEffect(() => {
    if (id || isSendEmail) {
      dispatch(getGuestListData({ booking_id: id }));
    }
  }, [dispatch, id, isSendEmail]);

  const handleFilterResult = result => {
    let guestListArray = [];
    result.map(i => {
      guestListArray.push({ ...i, isChecked: false });
      return guestListArray;
    });
    setResults(guestListArray);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedEmailManagementChecked = [...results];
    updatedEmailManagementChecked[index].isChecked = isChecked;
    setResults(updatedEmailManagementChecked);
    setIsActive(!isActive);
  };

  const handleSearchResult = result => {
    let guestListArray = [];
    result.map(i => {
      guestListArray.push({ ...i, isChecked: false });
      return guestListArray;
    });
    setResults(guestListArray);
  };

  useEffect(() => {
    if (guestList) {
      let guestListArray = [];
      guestList.map(i => {
        guestListArray.push({ ...i, isChecked: false });
        return guestListArray;
      });
      setResults(guestListArray);
    }
  }, [guestList]);

  const handleSelectEmailTemplate = data => {
    setIsEmailStatus(data);
  };
  return (
    <div className="email_management_wrap">
      {guestLoading && <Loader />}
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="text_dark fw_500 m-0">Email Management</h2>
        </Col>
        <Col md={6}>
          <div className="filter_button_right">
            <ul>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setFilterGuests(false);
                    setSearchGuests(false);
                    emailTemplateHandleChange();
                  }}
                >
                  <i className="pi pi-envelope"></i>
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => {
                    setFilterGuests(false);
                    setEmailTemplate(false);
                    searchGuestsHandleChange();
                    dispatch(setGuestEmailDetail({}));
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
                    setEmailTemplate(false);
                    filterGuestsHandleChange();
                    dispatch(setGuestEmailDetail({}));
                  }}
                >
                  <i className="pi pi-filter"></i>
                </Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      {emailTemplate === true && (
        <SelectEmailTemplate
          emailTemplateHandleChange={emailTemplateHandleChange}
          onSelectEmail={handleSelectEmailTemplate}
          results={results}
          data={data}
        />
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
      {isEmailStatus && guestEmailDetail?.email_contents ? (
        <div
          dangerouslySetInnerHTML={{ __html: guestEmailDetail?.email_contents }}
        />
      ) : (
        ''
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
                    (click on guest\s to select for email)
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
              let guestListArray = [];
              guestList.map(i => {
                guestListArray.push({
                  ...i,
                  isChecked: selectAllStatus ? false : true,
                });
                return guestListArray;
              });
              setResults(guestListArray);
            }}
          >
            {selectAllStatus ? 'De-select All' : 'Select All'}
          </Button>
        </div>
        <div className="text-end">
          <Button
            className="btn_primary small"
            onClick={() => {
              setSearchGuests(false);
              setEmailTemplate(false);
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
                        checked={results[index]?.isChecked || false}
                        onChange={e => {
                          handleCheckboxChange(index, e.target.checked);
                        }}
                      />
                    </div>
                  </td>
                  <td className="first_name">{item?.first_name}</td>
                  <td className="last_name">{item?.last_name}</td>
                  <td className="email_address">{item?.email}</td>
                  <td className="invited ">
                    {item?.is_invited === true && (
                      <i className="pi pi-check fw-bold me-2"></i>
                    )}

                    <i className="pi pi-envelope"></i>
                  </td>
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
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

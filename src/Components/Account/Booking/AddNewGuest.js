import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';

import Loader from 'Components/Common/Loader';
import {
  createUpdateBookingGuest,
  deleteGuest,
} from 'store/reducers/Booking/guest.slice';

export default function AddNewGuest({ handleSubmit, data }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { guestLoading } = useSelector(({ guest }) => guest);

  const [deleteModal, setDeleteModal] = useState(false);
  const [guestManager, setGuestManager] = useState(false);
  const [autoSentenceCase, setAutoSentenceCase] = useState(true);
  const [specialRequirementsList, setSpecialRequirementsList] = useState([]);
  const [managedBy, setManagedBy] = useState('');
  const [assignedGuests, setAssignedGuests] = useState(null);
  const [createGuestData, setCreateGuestData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    is_attending: 2,
    guest_id: '',
    is_manager: true,
    requirements: [],
    assigned_guests: [],
    managed_by: null,
    deleted: false,
  });

  const guestManagerHandle = () => {
    setGuestManager(!guestManager);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const newValue =
      name === 'is_manager'
        ? value === 'true'
        : name === 'is_attending'
        ? parseInt(value)
        : value;
    setCreateGuestData(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleChecked = event => {
    const { name, checked } = event.target;

    setSpecialRequirementsList(prevState => {
      const requirementIndex = prevState.findIndex(data => data.title === name);
      if (requirementIndex !== -1) {
        return prevState.map((requirement, index) =>
          index === requirementIndex
            ? { ...requirement, is_selected: checked }
            : requirement,
        );
      } else {
        return [...prevState, { title: name, is_selected: checked }];
      }
    });
  };

  const handleAddNewGuest = () => {
    let createPayload = {
      first_name: autoSentenceCase
        ? capitalizeSentence(createGuestData?.first_name)
        : createGuestData?.first_name,
      last_name: autoSentenceCase
        ? capitalizeSentence(createGuestData?.last_name)
        : createGuestData?.last_name,
      email: createGuestData?.email,
      is_attending: createGuestData?.is_attending,
      is_manager: createGuestData?.is_manager,
      requirements: specialRequirementsList,
      assigned_guests: createGuestData?.assigned_guests,
      managed_by: createGuestData?.managed_by,
    };

    let updatePayload = {
      first_name: autoSentenceCase
        ? capitalizeSentence(createGuestData?.first_name)
        : createGuestData?.first_name,
      last_name: autoSentenceCase
        ? capitalizeSentence(createGuestData?.last_name)
        : createGuestData?.last_name,
      email: createGuestData?.email,
      is_attending: createGuestData?.is_attending,
      guest_id: createGuestData?.guest_id,
      is_manager: createGuestData?.is_manager,
      requirements: specialRequirementsList,
      assigned_guests: managedBy
        ? [managedBy]
        : assignedGuests?.map(item => item?._id),
      managed_by: createGuestData?.managed_by,
      deleted: createGuestData?.deleted,
    };

    dispatch(
      createUpdateBookingGuest({
        booking_id: id,
        booking: data ? updatePayload : createPayload,
      }),
    );

    setCreateGuestData({
      first_name: '',
      last_name: '',
      email: '',
      is_attending: '',
      is_manager: '',
      guest_id: '',
      requirements: [],
      assigned_guests: [],
      managed_by: null,
    });
    setSpecialRequirementsList([]);
  };

  function capitalizeSentence(sentence) {
    const firstLetter = sentence?.charAt(0)?.toUpperCase();
    const restOfSentence = sentence?.slice(1);
    return firstLetter + restOfSentence;
  }

  useEffect(() => {
    if (data) {
      setCreateGuestData({
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        is_attending: data?.is_attending,
        guest_id: data?._id,
        is_manager: data?.is_manager,
        assigned_guests: [],
        managed_by: data?.managed_by,
      });

      setSpecialRequirementsList(data?.requirements);
    }
  }, [data]);

  const handleDelete = () => {
    dispatch(deleteGuest({ booking_id: id, guest_id: data?._id }));
    setDeleteModal(false);
  };

  return (
    <div className="add_new_guest_wrap mb-3">
      {guestLoading && <Loader />}
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-user-plus me-2"></i> {data ? 'Edit' : 'Add New'}{' '}
          Guest
        </h4>
        <Button className="btn_primary small" onClick={handleSubmit}>
          <i className="pi pi-times"></i>
        </Button>
      </div>
      <div className="add_new_guest_inner p-3">
        <Row className="g-5">
          <Col xl={4} lg={6}>
            <div className="checkbox_wrapper">
              <Form.Check
                type="checkbox"
                id="capital"
                label="I always forget about capital letters - please fix it for me!"
                autoComplete="off"
                checked={autoSentenceCase}
                onChange={() => {
                  setAutoSentenceCase(!autoSentenceCase);
                }}
              />
            </div>
            <Form.Group className="mb-3 form-group">
              <Form.Label>First name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="first_name"
                value={
                  autoSentenceCase
                    ? capitalizeSentence(createGuestData.first_name)
                    : createGuestData.first_name
                }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Last name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="last_name"
                value={
                  autoSentenceCase
                    ? capitalizeSentence(createGuestData.last_name)
                    : createGuestData.last_name
                }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Email address*</Form.Label>
              <small className="d-block mb-1 text_light">
                This will be used as a login username so{' '}
                <span className="text_primary">need to be unique</span>*
              </small>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={createGuestData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="note_wrapper">
              <p>
                <small>
                  *If this guest does not have an email address{' '}
                  <b>please enter the word "none"</b>. Please:
                </small>
              </p>
              <ul>
                <li className="text_dark">
                  do not use the same email address as used for another person
                  (use "none")
                </li>
                <li className="text_dark">
                  do not use fake email addresses (use "none")
                </li>
              </ul>
              <p>
                <small>
                  <span className="text_primary">Note:</span> by not providing
                  an email address your guest will not be able to log in and
                  manage their place, plus you will not be able to send them
                  invites or party tickets by email.
                </small>
              </p>
            </div>
          </Col>
          <Col xl={4} lg={6}>
            <div className="guest_attending_wrap">
              <h4>
                Is Guest Attending
                <i className="pi pi-question-circle ms-2"></i>
              </h4>
              <div className="radio_wrapper mb-4">
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  id="Yes"
                  className="check"
                  name="is_attending"
                  value={0}
                  checked={createGuestData?.is_attending === 0}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  id="No"
                  className="cross"
                  name="is_attending"
                  value={1}
                  checked={createGuestData?.is_attending === 1}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Don't Know"
                  type="radio"
                  id="DontKnow"
                  className="question"
                  name="is_attending"
                  value={2}
                  checked={createGuestData?.is_attending === 2}
                  onChange={handleChange}
                />
              </div>
              <h4 className="mb-4" onClick={() => guestManagerHandle()}>
                Guest Manager
                <i className="pi pi-angle-down ms-2"></i>
              </h4>

              {guestManager === true && data?.is_manager === true ? (
                <>
                  <h6 className="text_dark">Assign Guests</h6>
                  <p>
                    If you wish to add further guests for this manager to manage
                    please select them from the list below
                  </p>
                  <MultiSelect
                    value={assignedGuests}
                    options={data?.managerGuests}
                    onChange={e => {
                      setAssignedGuests(e.value);
                    }}
                    optionLabel="name"
                    placeholder="Select options"
                    maxSelectedLabels={3}
                    style={{ width: '100%' }}
                  />
                </>
              ) : guestManager === true && data?.managed_by ? (
                <>
                  <h6 className="text_dark">Managed By</h6>
                  <p>
                    If you want this person to be managed by another guest then
                    please select the manager below
                  </p>
                  <Form.Select
                    aria-label="assigned_guests"
                    name="assigned_guests"
                    value={managedBy}
                    onChange={e => {
                      setManagedBy(e.target.value);
                    }}
                  >
                    <option value={[]}>Please Select</option>
                    {data?.managerGuests?.map(item => {
                      return (
                        <option value={item?._id} key={item?._id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </>
              ) : (
                guestManager === true && (
                  <>
                    <div className="guest_manager">
                      <h6 className="text_dark">Make this Guest a Manager</h6>
                      <p>
                        If you want this person to be able to manage other
                        guests then please select "Can Manage" below
                      </p>
                      <div className="radio_wrapper mb-4">
                        <Form.Check
                          inline
                          label="Yes"
                          name="is_manager"
                          type="radio"
                          id="Yes1"
                          className="check"
                          value={true}
                          checked={createGuestData?.is_manager === true}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="is_manager"
                          type="radio"
                          id="No1"
                          className="cross"
                          value={false}
                          checked={createGuestData?.is_manager === false}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {data && (
                      <>
                        <h6 className="text_dark">Managed By</h6>
                        <p>
                          If you want this person to be managed by another guest
                          then please select the manager below
                        </p>
                        <Form.Select
                          aria-label="assigned_guests"
                          name="assigned_guests"
                          value={managedBy}
                          onChange={e => {
                            setManagedBy(e.target.value);
                          }}
                        >
                          <option value={[]}>Please Select</option>
                          {data?.managerGuests?.map(item => {
                            return (
                              <option value={item?._id} key={item?._id}>
                                {item?.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </>
                    )}
                  </>
                )
              )}
            </div>
          </Col>
          <Col xl={4} lg={12}>
            <h6 className="text_dark">Special Requirements</h6>
            <p>
              If this guest has any special requirements please select them
              here. For more complex requirements please contact a member of the
              Best Parties Ever office team on 01932 359900.
            </p>
            <Row>
              <Col sm={6}>
                <h6 className="text_dark">Dietary Requirements</h6>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    id="DairyFree"
                    name="Dairy Free"
                    label="Dairy Free"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Dairy Free' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="GlutenFree"
                    label="Gluten Free"
                    name="Gluten Free"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Gluten Free' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="Halal"
                    label="Halal"
                    name="Halal"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Halal' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="NutAllergy"
                    label="Nut Allergy"
                    name="Nut Allergy"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Nut Allergy' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="Vegan"
                    label="Vegan"
                    name="Vegan"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Vegan' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="Vegetarian"
                    label="Vegetarian"
                    name="Vegetarian"
                    checked={specialRequirementsList.some(
                      data => data.title === 'Vegetarian' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <h6 className="text_dark">Accessibility</h6>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    id="WheelchairUser"
                    label="Wheelchair User"
                    name="Wheelchair User"
                    checked={specialRequirementsList.some(
                      data =>
                        data.title === 'Wheelchair User' && data.is_selected,
                    )}
                    onChange={e => handleChecked(e)}
                  />
                </div>
              </Col>
            </Row>
            <div className="guest_btn_wrap mt-3">
              <div className="d-flex flex-wrap">
                <Button className="btn_primary small me-3">
                  <i className="pi pi-times me-2"></i> Cancel
                </Button>
                <Button
                  className="btn_primary small"
                  onClick={handleAddNewGuest}
                >
                  <i className="pi pi-user-plus me-2"></i>
                  {data ? 'Upload' : 'Add Guest'}
                </Button>
              </div>
            </div>
            {data?.deleted === true && (
              <div className="checkbox_wrapper mt-3">
                <Form.Check
                  type="checkbox"
                  id="deleted"
                  label="Delete Guest (this cannot be undone)"
                  name="deleted"
                  checked={deleteModal}
                  onChange={() => {
                    setDeleteModal(true);
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>

      <Dialog
        header=""
        visible={deleteModal}
        onHide={() => setDeleteModal(false)}
        style={{ width: '600px' }}
        draggable={false}
        resizable={false}
        className="delete_popup"
      >
        <div className="delete_modal_wrap">
          <h3 className="mb-3 text_dark">Are you sure ?</h3>
          <p>
            Do you really want to delete these records? This process can note be
            undone.
          </p>
        </div>
        <Form>
          <div className="submit_btn text-center">
            <Button
              className="btn_border small me-2"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button className="btn_primary small" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
}

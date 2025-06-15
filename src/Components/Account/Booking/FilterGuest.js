import Loader from 'Components/Common/Loader';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function FilterGuest({
  filterGuestsHandleChange,
  onFilter,
  listData,
  checkCondition = true,
}) {
  // const [byStatus, setByStatus] = useState(false);
  const { guestLoading } = useSelector(({ guest }) => guest);

  const handleFilterByStatus = status => {
    const filtered = listData.filter(item => {
      if (status === 'All Guests') {
        return true;
      } else if (status === 'Invited') {
        return item.is_imported === true;
      } else if (status === 'Not Invited') {
        return item.is_imported === false;
      } else if (status === 'Attending') {
        return item.is_attending === 0;
      } else if (status === 'Not Attending') {
        return item.is_attending === 1;
      } else if (status === 'Dont Know') {
        return item.is_attending === 2;
      }
      return false;
    });
    onFilter(filtered);
  };

  const handleFilterByRequirement = requirement => {
    const filtered = listData.filter(item => {
      return item.requirements.some(
        req => req.title === requirement && req.is_selected,
      );
    });
    onFilter(filtered);
  };

  return (
    <div className="filter_guest_wrap mb-3">
      {guestLoading && <Loader />}
      <div className="table_header_wrap">
        <h4 className="m-0">
          <i className="pi pi-filter me-2"></i> Filter Guests
        </h4>
        <Button
          className="btn_primary small"
          onClick={() => {
            filterGuestsHandleChange();
            onFilter(listData);
          }}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>
      <div className="filter_guest_inner p-3">
        <h4>By Status</h4>
        <ul className="mb-3">
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByStatus('All Guests')}
            >
              <i className="pi pi-users me-2"></i> All Guests
            </Button>
          </li>
          {checkCondition === true && (
            <>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => handleFilterByStatus('Invited')}
                >
                  <i className="pi pi-calendar-plus me-2"></i> Invited
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => handleFilterByStatus('Not Invited')}
                >
                  <i className="pi pi-calendar-times me-2"></i> Not Invited
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => handleFilterByStatus('Attending')}
                >
                  <i className="pi pi-check-circle me-2"></i> Attending
                </Button>
              </li>
              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => handleFilterByStatus('Not Attending')}
                >
                  <i className="pi pi-times-circle me-2"></i> Not Attending
                </Button>
              </li>

              <li>
                <Button
                  className="btn_primary small"
                  onClick={() => handleFilterByStatus('Dont Know')}
                >
                  <i className="pi pi-question-circle me-2"></i> Dont Know
                </Button>
              </li>
            </>
          )}
        </ul>
        <h4>By Requirement</h4>
        <ul>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Dairy Free')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Dairy Free
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Gluten Free')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Gluten Free
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Halal')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Halal
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Nut Allergy')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Nut Allergy
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Vegan')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Vegan
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Vegetarian')}
            >
              <i className="fa-solid fa-utensils me-2"></i> Vegetarian
            </Button>
          </li>
          <li>
            <Button
              className="btn_primary small"
              onClick={() => handleFilterByRequirement('Wheelchair User')}
            >
              <i className="fa-solid fa-wheelchair-move me-2"></i> Wheelchair
              User
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

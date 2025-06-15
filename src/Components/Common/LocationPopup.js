import React, { useEffect, useState } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { LocationData } from './LocationData';
import { Map } from './Map';
import Futurum from '../../Assets/img/futurum.jpeg';
import { useSelector } from 'react-redux';

export default function LocationPopup({ visible, setVisible }) {
  const { venueList } = useSelector(({ venue }) => venue);

  const navigate = useNavigate();

  const [items, setItems] = useState(venueList?.searchList);
  const handleShowAllClick = () => {
    const bounds = new window.google.maps.LatLngBounds();

    venueList?.searchList.forEach(itemData => {
      bounds.extend(
        new window.google.maps.LatLng(itemData.latitude, itemData.longitude),
      );
    });

    const center = {
      lat: (bounds.getNorthEast().lat() + bounds.getSouthWest().lat()) / 2,
      lng: (bounds.getNorthEast().lng() + bounds.getSouthWest().lng()) / 2,
    };

    setItems(venueList?.searchList);
    setActive('showAll');
    setMapPosition(center);
    setMapZoom(7);
  };

  const [active, setActive] = useState('showAll');
  const [mapPosition, setMapPosition] = useState(null);
  const [mapZoom, setMapZoom] = useState(7);

  useEffect(() => {
    setItems(venueList?.searchList);
  }, [venueList?.searchList]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal_open');
    } else {
      document.body.classList.remove('modal_open');
    }
  }, [visible]);

  const filterItem = cateItem => {
    const updateItems = venueList?.searchList.filter(curElem => {
      return curElem.primary_region === cateItem;
    });
    setItems(updateItems);
    setActive(cateItem);
  };

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      fullScreen
      className="location_sidebar"
    >
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <span
            className={active === 'showAll' ? 'nav-link active' : 'nav-link'}
            onClick={handleShowAllClick}
          >
            Show All
          </span>
        </li>
        {venueList?.searchList?.map(itemData => (
          <li className="nav-item">
            <span
              className={
                active === itemData?.primary_region
                  ? 'nav-link active'
                  : 'nav-link'
              }
              onClick={() => {
                filterItem(itemData?.primary_region);
                setMapPosition({
                  lat: itemData?.latitude,
                  lng: itemData?.longitude,
                });
                setMapZoom(11);
              }}
            >
              {itemData?.primary_region}
            </span>
          </li>
        ))}
      </ul>
      <div className="location_wrapper">
        <Row className="g-0">
          <Col xxl={5} lg={6} md={12}>
            <div className="location_box_inner">
              {items?.map(elem => {
                const { _id, public_name, image, theme_name } = elem;

                return (
                  <div
                    className="location_box"
                    id={_id}
                    onClick={() => {
                      navigate(
                        `/christmas-parties/${
                          public_name?.split(' ')[0]
                        }/${_id}`,
                      );
                      setVisible(false);
                    }}
                  >
                    <div className="location_img">
                      <img
                        className="img-fluid"
                        src={Futurum}
                        alt={public_name}
                      />
                    </div>
                    <div className="Location_content">
                      <h6>{public_name}</h6>
                      <p>{theme_name}</p>
                      <span>
                        Find out more <i className="pi pi-angle-right ms-1"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xxl={7} lg={6} className="d-none d-lg-block">
            <div className="map_wrapper">
              <Map
                items={items}
                mapPosition={mapPosition}
                mapZoom={mapZoom}
                setVisible={setVisible}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Sidebar>
  );
}

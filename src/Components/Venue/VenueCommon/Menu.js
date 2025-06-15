import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MenuPlate from '../../../Assets/img/example_plate.jpeg';
import OneFeedLogo from '../../../Assets/img/one-feeds-two.png';

export default function Menu({ data }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="menu_wrapper pt-120 pb-80">
      <div className="container">
        <div className="text-center mb-5">
          <h2>MENU</h2>
          <p className="big">
            Our exclusive, award winning caterer focuses on locally sourced,
            seasonal and fairtrade produce. All our dishes are prepared freshly
            on site.
          </p>
        </div>
      </div>
      <div className="container-fluid p-md-0">
        <Row className="g-4 g-md-0 align-items-center">
          <Col md={6}>
            <div className="menu_img">
              <img src={MenuPlate} alt="example plate" />
            </div>
          </Col>
          <Col md={6}>
            <div className="menu_content">
              <p>{data?.menuPretext}</p>
              <p>
                Please note that this is a set menu, with options available for
                those with the dietary requirements, as stated against the menu
                options.
              </p>
              <ul className="list_ul inline mb-3">
                <li>V – Vegetarian</li>
                <li>VE – Vegan</li>
                <li>GF – Gluten free</li>
                <li>DF – Dairy free</li>
              </ul>
              <h4>STARTER</h4>
              <ul className="list_ul mb-3">
                <li>
                  Twice baked Hereford Hop Souffle, Tomato Salad, Toasted
                  Pumpkin Seeds, Balsamic Fig Dressing (V)(GF)
                </li>
                <li>
                  Spiced Butternut Squash, Spinach and Kale Falafel, Tomato
                  Salad, Toasted Pumpkin Seeds, Balsamic Fig Dressing (VE)
                </li>
              </ul>
              <h4>MAIN COURSE</h4>
              <ul className="list_ul mb-3">
                <li>
                  Seared Breast of Chicken, Potato and Cheese Gratin, Savoy
                  Cabbage, Leek and Pea Fricassee, Glazed Carrot, Mulled Wine
                  Jus (GF)
                </li>
              </ul>
              <h4>VEGETARIAN/VEGAN MAIN COURSE</h4>
              <ul className="list_ul mb-3">
                <li>
                  Sweet Potato, Wild Mushroom, Chestnut and Cranberry
                  Wellington, Savoy Cabbage, Leek and Pea Fricassee, Mulled Wine
                  Jus (VE)
                </li>
              </ul>
              <h4>DESSERT PLATTERS</h4>
              <ul className="list_ul">
                <li>Salt Caramel Beignets</li>
                <li>Plant based Chocolate Brownie with Cherry Gel (VE)(GF)</li>
                <li>Treacle Tart with Candied Orange</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container">
        <div className="one_feed_banner">
          <div className="one_feed_logo">
            <img src={OneFeedLogo} alt="" />
          </div>
          <div className="one_feed_content">
            <h3>What if good food didn't just taste good, but did good?</h3>
            <p>
              What if you could help a hungry child by simply helping yourself?
              Well now you can.
            </p>
            <p>
              Best Parties are really proud to be supporting "One Feeds Two" at
              our {currentYear} Christmas parties. For every guest we cater for,
              we donate the cost of a school meal to a child living in some of
              the worlds poorest communities via our charity partner, One Feeds
              Two.
            </p>
          </div>
          <div className="one_feed_btn">
            <Link to="/one-feeds-two" className="btn_border_white">
              Find out more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

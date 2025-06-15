import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MenuPlate from '../../../Assets/img/example_plate.jpeg';
import OneFeedLogo from '../../../Assets/img/one-feeds-two.png';

export default function MenuBooking({ data }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="menu_tab_wrap pt-3">
      <div className="text-center mb-5">
        <h2 className="text_primary">MENU</h2>
        <p className="big">
          Our exclusive, award winning caterer focuses on locally sourced,
          seasonal and fairtrade produce. All our dishes are prepared freshly on
          site.
        </p>
      </div>
      {data?.is_tabacoo === true ? (
        <Row>
          <Col md={6}>
            <img src={MenuPlate} alt="MenuImage" />
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
                  Twice baked Hereford Hop Cheese Souffle, Tomato and Herb
                  Salad, Toasted Pumpkin Seeds, Balsamic Fig Dressing (V)(GF)
                </li>
                <li>
                  Butternut Squash, Spinach and Kale Falafel, Tomato and Herb
                  Salad, Toasted Pumpkin Seeds, Balsamic Fig Dressing (VE)
                </li>
              </ul>
              <h4>MAIN COURSE</h4>
              <ul className="list_ul mb-3">
                <li>
                  Seared Breast of Chicken, Potato and Cheese Gratin, Savoy
                  Cabbage, Leek and Pea Fricassee, Glazed Carrot, Mulled Wine
                  Jus (GF) (DF option available)
                </li>
              </ul>
              <h4>MAIN COURSE VEGAN/VEGETARIAN OPTION</h4>
              <ul className="list_ul mb-3">
                <li>
                  Sweet Potato, Wild Mushroom and Cranberry Wellington, Savoy
                  Cabbage, Leek and Pea Fricassee, Mulled Wine Jus (VE) (GF
                  option available)
                </li>
              </ul>
              <h4>DESSERT</h4>
              <ul className="list_ul mb-3">
                <li>Salted Caramel Beignets</li>
                <li>Plant based Chocolate Brownie with Cherry Gel (VE)(GF)</li>
                <li>Treacle Tart with Candied Orange</li>
                <li>
                  <span className="fw-bold">Crumble Station:</span>
                  <ul className="list_ul ms-2">
                    <li>Apple, Cinnamon and Toffee</li>
                    <li>Poached Plum, Pear and Blackberry</li>
                    <li>
                      Topped with a choice of Buttery Crumble or Festive Oat
                      Crunch (GF)
                    </li>
                    <li className="pb-0">Vanilla Custard or Double Cream</li>
                  </ul>
                </li>
                <li>
                  Pan ‘n’ Ice: Interactive Ice Cream Station with a selection of
                  toppings to include Cookies and Cream
                </li>
                <li>Doughnut Wall: Selection of Iced Doughnuts</li>
              </ul>
              <h4>LATE NIGHT SURVIVORS' BREAKFAST</h4>
              <ul className="list_ul mb-3">
                <li>
                  Hot Bacon Brioche Rolls or Plant Based Sausages in a Brioche
                  bun (Gluten Free available on request)
                </li>
              </ul>
              <span className="fst-italic text_light">
                Please note that this is subject to change
              </span>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={6}>
            <img src={MenuPlate} alt="MenuImage" />
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
                  Twice baked Hereford Hop Cheese Souffle, Tomato and Herb
                  Salad, Toasted Pumpkin Seeds, Balsamic Fig Dressing (V)(GF)
                </li>
                <li>
                  Butternut Squash, Spinach and Kale Falafel, Tomato and Herb
                  Salad, Toasted Pumpkin Seeds, Balsamic Fig Dressing (VE)
                </li>
              </ul>
              <h4>MAIN COURSE</h4>
              <ul className="list_ul mb-3">
                <li>
                  Seared Breast of Chicken, Potato and Cheese Gratin, Savoy
                  Cabbage, Leek and Pea Fricassee, Glazed Carrot, Mulled Wine
                  Jus (GF) (DF option available)
                </li>
              </ul>
              <h4>MAIN COURSE VEGAN/VEGETARIAN OPTION</h4>
              <ul className="list_ul mb-3">
                <li>
                  Sweet Potato, Wild Mushroom and Cranberry Wellington, Savoy
                  Cabbage, Leek and Pea Fricassee, Mulled Wine Jus (VE) (GF
                  option available)
                </li>
              </ul>
              <h4>DESSERT</h4>
              <ul className="list_ul mb-3">
                <li>Salted Caramel Beignets</li>
                <li>Plant based Chocolate Brownie with Cherry Gel (VE)(GF)</li>
                <li>Treacle Tart with Candied Orange</li>
                <li>
                  <span className="fw-bold">Crumble Station:</span>
                  <ul className="list_ul ms-2">
                    <li>Apple, Cinnamon and Toffee</li>
                    <li>Poached Plum, Pear and Blackberry</li>
                    <li>
                      Topped with a choice of Buttery Crumble or Festive Oat
                      Crunch (GF)
                    </li>
                    <li className="pb-0">Vanilla Custard or Double Cream</li>
                  </ul>
                </li>
                <li>
                  Pan ‘n’ Ice: Interactive Ice Cream Station with a selection of
                  toppings to include Cookies and Cream
                </li>
                <li>Doughnut Wall: Selection of Iced Doughnuts</li>
              </ul>
              <h4>LATE NIGHT SURVIVORS' BREAKFAST</h4>
              <ul className="list_ul mb-3">
                <li>
                  Hot Bacon Brioche Rolls or Plant Based Sausages in a Brioche
                  bun (Gluten Free available on request)
                </li>
              </ul>
              <span className="fst-italic text_light">
                Please note that this is subject to change
              </span>
            </div>
          </Col>
        </Row>
      )}
      <div className="one_feed_banner">
        <div className="one_feed_logo">
          <img src={OneFeedLogo} alt="OneFeedimage" />
        </div>
        <div className="one_feed_content">
          <h3 className="text_dark">
            What if good food didn't just taste good, but did good?
          </h3>
          <p>
            What if you could help a hungry child by simply helping yourself?
            Well now you can.
          </p>
          <p>
            Best Parties are really proud to be supporting "One Feeds Two" at
            our {currentYear} Christmas parties. For every guest we cater for,
            we donate the cost of a school meal to a child living in some of the
            worlds poorest communities via our charity partner, One Feeds Two.
          </p>
        </div>
        <div className="one_feed_btn">
          <Link className="btn_border_white">Find out more</Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import OneFeedLogo from '../../Assets/img/one-feeds-two.png';

export default function OneFeedsTwo() {
  return (
    <div className="one_feeds_two_wrapper">
      <div className="inner_banner one_feeds_two__banner">
        <div className="container">
          <h1>Best Parties Ever supporting One Feeds Two</h1>
        </div>
      </div>
      <div className="one_feeds_two_inner pt-120 pb-120">
        <div className="container">
          <div className="one_feed_banner justify-content-center p-3 mb-4 mt-0">
            <img src={OneFeedLogo} alt="" />
          </div>
          <div className="one_feed_two_content">
            <p>
              In 2023 Best Parties Ever (as part of the Eventist Group) are once
              again partnering with the inspirational charity One Feeds Two, so
              that for each ticket sold for our Christmas parties, we donate a
              school meal to a child living in poverty.
            </p>
            <p>
              We're proud to be partnering with this 'one for one' model and
              together with our customers we hope to give over 150,000 meals to
              children in Malawi! Furthermore, not only does this give a child a
              free meal, it's also getting them back into education which is
              cruicial to furthering their development through life.
            </p>
            <p className="big text_orange mb-5">
              Changing one child's life, one meal at a time.
            </p>
            <div className="mb-3">
              <Link
                to="https://www.bestpartiesever.com/download/pdf/One_Feeds_Two_Brochure"
                className="btn_primary"
              >
                Read more (pdf)
              </Link>
            </div>
            <Link to="https://www.onefeedstwo.org/" target="_blank">
              One Feeds Two | Join the movement for happier meals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

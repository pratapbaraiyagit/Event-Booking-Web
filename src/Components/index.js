import React, { useCallback, useRef, useState } from 'react';

import { Button, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocationPopup from 'Components/Common/LocationPopup';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import SharedImg from '../Assets/img/indulge-shared-bg.jpeg';
import ExclusiveImg from '../Assets/img/indulge-exclusive-bg.jpeg';
import '../Assets/css/lightgallery-bundle.css';
import { Dialog } from 'primereact/dialog';
import { NeverMiss } from './NeverMiss';

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const lightGallery = useRef(null);
  const [items, setItems] = useState([
    {
      id: '1',
      size: '1400-933',
      src: 'https://player.vimeo.com/video/809827258',
      thumb: 'https://player.vimeo.com/video/809827258',
    },
  ]);

  const onInit = useCallback(detail => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const getItems = useCallback(() => {
    return items.map(item => {
      return (
        <div key={item.id} className="full_screen_btn" data-src={item.src}>
          <Button>
            <span className="material-symbols-outlined me-2">open_in_full</span>
            PLAY FULL SCREEN
          </Button>
        </div>
      );
    });
  }, [items]);

  return (
    <div className="home_wrapper">
      <section className="banner_wrapper">
        <div className="banner_video">
          <iframe
            src="https://player.vimeo.com/video/809827258?background=1&amp;autoplay=1&amp;loop=1&amp;byline=0&amp;title=0"
            frameborder="0"
            webkitallowfullscreen=""
            mozallowfullscreen=""
            allowfullscreen=""
            loop={true}
            allow="autoplay; fullscreen; loop;"
            title="banner_video"
          ></iframe>
        </div>
        <LightGallery
          plugins={[
            lgVideo,
            lgZoom,
            lgThumbnail,
            lgFullscreen,
            lgAutoplay,
            lgShare,
          ]}
          elementClassNames="Gallery_image_wrapper"
          onInit={onInit}
          closable={true}
        >
          {getItems()}
        </LightGallery>
        <div className="banner_text_wrap">
          <h1>The World’s Greatest Christmas Parties</h1>
          <p className="h4">Find your nearest venue</p>
          <div className="search_box">
            <div className="input_Wrapper">
              <div className="location_icon" onClick={() => setVisible(true)}>
                <span className="material-symbols-outlined">my_location</span>
              </div>
              <div className="search_input">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Enter a location"
                />
              </div>
            </div>
            <div className="submit_button">
              <button
                className="btn_primary"
                onClick={() => {
                  setWarningModal(true);
                  setVisible(true);
                }}
              >
                <span className="material-symbols-outlined me-1">search</span>{' '}
                Search
              </button>
            </div>
            <LocationPopup visible={visible} setVisible={setVisible} />
          </div>
          <div className="social_icon">
            <ul>
              <li>
                <Link
                  to="https://www.facebook.com/BestPartiesEver"
                  target="_blank"
                >
                  <i className="pi pi-facebook"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/bestpartieseveruk/"
                  target="_blank"
                >
                  <i className="pi pi-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="https://twitter.com/BestPartiesEver" target="_blank">
                  <i className="pi pi-twitter"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/company/best-parties-ever-limited/?originalSubdomain=uk"
                  target="_blank"
                >
                  <i className="pi pi-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <button className="mouse_scroll">
          <div className="mouse-icon">
            <span className="mouse-wheel"></span>
          </div>
          Scroll
        </button>
      </section>

      <section className="about_wrap pt-120 pb-120">
        <div className="container-fluid">
          <div className="about_title">
            <h2 className="h1">INDULGE. AMAZE. EXCITE.</h2>
            <p className="big">
              Experience our spectacular themes, mesmerising entertainment and
              seamless service. Let Best Parties Ever indulge, amaze and excite
              with an unforgettably magical Christmas experience.
            </p>
          </div>
          <Row className="g-4">
            <Col md={6}>
              <div className="about_box">
                <img src={SharedImg} alt="" />
                <h2>SHARED</h2>
                <h3>CHRISTMAS PARTIES</h3>
                <p>
                  Our popular shared parties are a perfect option for smaller
                  groups seeking a festive extravaganza with a magical
                  atmosphere.
                </p>
                <Button
                  className="btn_primary"
                  onClick={() => setVisible(true)}
                >
                  OUR SHARED PARTIES
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <div className="about_box">
                <img src={ExclusiveImg} alt="" />
                <h2>EXCLUSIVE</h2>
                <h3>CHRISTMAS PARTIES</h3>
                <p>
                  Our exclusive parties are perfect for larger businesses who
                  are looking for a fully staffed, all inclusive Christmas party
                  with a twist.
                </p>
                <Link to="/exclusiveparties" className="btn_primary">
                  OUR EXCLUSIVE PARTIES
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="testimonial_wrap pt-120 pb-80">
        <div className="container">
          <div className="testimonial_inner">
            <div className="rating">
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
            </div>
            <p className="big">
              “Thank you very much, our team had an awesome night. It was a
              super event and all went seamlessly”
            </p>
            <h4>AON</h4>
          </div>
        </div>
      </section>

      <section className="parties_wrapper pt-120 pb-80">
        <div className="container">
          <div className="parties_title mb-5">
            <h2>WHAT MAKES A</h2>
            <h2 className="h1">BEST PARTIES EVER</h2>
            <h2>CHRISTMAS PARTY?</h2>
          </div>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="parties_box thiming">
                <h3>THEMING</h3>
                <p>
                  Forget the snowflakes and elves, our inventive party themes
                  are a little more on the wild side. Think Burlesque, Rio
                  Carnival and Dream Circus.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="parties_box entertainment">
                <h3>ENTERTAINMENT</h3>
                <p>
                  Fire juggling, acrobatics, live music, pirates… when it comes
                  to entertaining, Best Parties Ever know how to put on a show.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="parties_box dinner">
                <h3>DINNER</h3>
                <p>
                  Our sumptuous meals will set you up for an enjoyable South
                  West. We have talented chefs in the kitchens at all of our
                  venues.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="parties_box dancing">
                <h3>DANCING</h3>
                <p>
                  No party is complete without a bit of a boogie. With both live
                  music and DJs, you will be shaking your tail feathers on the
                  dancefloor in no time!
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="parties_box dodgems">
                <h3>DODGEMS</h3>
                <p>
                  Feeling a little merry? We have even more entertainment
                  following your meal so join us on the thrilling dodgems.
                </p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="parties_box casino">
                <h3>CASINO</h3>
                <p>
                  Feeling like a flutter? We have even more entertainment
                  following your meal. Join us at our pop up casino.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="newsletter_wrap">
        <NeverMiss />
      </section>

      <Dialog
        header=""
        visible={warningModal}
        onHide={() => setWarningModal(false)}
        style={{ width: '600px' }}
        draggable={false}
        resizable={false}
        className="delete_popup"
      >
        <div className="delete_modal_wrap">
          <i
            className="pi pi-info-circle mb-4 text-warning"
            style={{ fontSize: '51px' }}
          ></i>
          <h3 className="mb-3 text_dark">Oops, something went wrong</h3>
          <p>
            It looks like the location search field is empty or invalid - try
            entering your closest city to get started.
          </p>
        </div>
        <Form>
          <div className="submit_btn text-center">
            <Button
              className="btn_primary small"
              onClick={() => setWarningModal(false)}
            >
              Ok
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
}

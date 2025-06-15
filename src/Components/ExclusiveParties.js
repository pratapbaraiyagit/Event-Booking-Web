import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import '../Assets/css/lightgallery-bundle.css';
import $ from 'jquery';
import { NeverMiss } from './NeverMiss';

export default function ExclusiveParties() {
  const lightGallery = useRef(null);
  const [items, setItems] = useState([
    {
      id: '1',
      size: '1400-933',
      src: 'https://player.vimeo.com/video/547927304',
      thumb: 'https://player.vimeo.com/video/547927304',
    },
  ]);

  const onInit = useCallback(detail => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  useEffect(() => {
    $('.pagination_left li').on('click', 'a[href^="#"]', function (e) {
      // target element id
      var id = $(this).attr('href');

      // target element
      var $id = $(id);
      if ($id.length === 0) {
        return;
      }

      // prevent standard hash navigation (avoid blinking in IE)
      e.preventDefault();

      // top position relative to the document
      var pos = $id.offset().top;
      var offset2 = 50;
      // animated top scrolling
      $('body, html').animate({ scrollTop: pos - offset2 }, 100);
    });

    $(document).ready(function () {
      var bh = $('.pagination_left').height();
      $('section').height(bh - 20);
    });

    $(window)
      .scroll(function () {
        var scrollpos = $(window).scrollTop();
        // Assign active class to nav links while scolling
        $('section').each(function (i) {
          if ($(this).position().top <= scrollpos + 100) {
            $('.pagination_left li a.act').removeClass('act');
            $('.pagination_left li a').eq(i).addClass('act');

            var viewportheight = $('section').height();

            var licount2 = $('.pagination_left li').length;
            $('.pagination_left').animate(
              { scrollTop: scrollpos / licount2 },
              0,
            );
          }
        });
      })
      .scroll();
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
    <div className="exclusive_partie_wrapper">
      <section className="height-auto pagination_left">
        <ul>
          <li>
            <a href="#banner">
              <span>Theme</span>
            </a>
          </li>
          <li>
            <a href="#booking_start">
              <span>The Experience</span>
            </a>
          </li>
          <li>
            <a href="#testimonial">
              <span>The Night</span>
            </a>
          </li>
          <li>
            <a href="#package">
              <span>Package</span>
            </a>
          </li>
        </ul>
      </section>
      <section
        className="height-auto banner_wrapper exclusive_banner"
        id="banner"
      >
        <div className="banner_video">
          <iframe
            src="https://player.vimeo.com/video/547927304?background=1&amp;autoplay=1&amp;loop=1&amp;byline=0&amp;title=0"
            frameborder="0"
            webkitallowfullscreen=""
            mozallowfullscreen=""
            allowfullscreen=""
            allow="autoplay; fullscreen; loop;"
            title="Crismas-party-london"
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
        >
          {getItems()}
        </LightGallery>
        <div className="exclusive_banner_text">
          <h1>EXCLUSIVE VENUE HIRE</h1>
          <p className="big">
            Create a memorable and unique event exclusively for your guests
          </p>
          <Link to="/exclusive-form" className="btn_primary">
            ENQUIRE NOW
          </Link>
        </div>
      </section>
      <section
        className="height-auto booking_start_wrapper pt-120 pb-80"
        id="booking_start"
      >
        <div className="container">
          <div className="text-center">
            <h2 className="h1">
              YOUR EXCLUSIVE CHRISTMAS PARTY BOOKING STARTS HERE
            </h2>
            <h3 className="fw_300 mb-4">
              WITH OVER 20 YEARS EXPERIENCE OF DELIVERING THE BEST CHRISTMAS
              PARTIES, LEAVE IT TO US TO CREATE A YOUR PERFECT EVENT.
            </h3>
            <p>
              Our exclusive use parties include a range of exciting and great
              value upgrade packages for the ultimate in bespoke party
              experience. All our exclusive use clients have a dedicated account
              manager to work with them to meet specific individual
              requirements.
            </p>
            <p>
              In addition we will be happy to accommodate specific requests such
              as speeches, awards or combined conference and evening gala
              events. Offering adaptable venue spaces and a full event
              management team your Christmas party can transform into business
              and corporate events too, saving time, money and set up costs.
              Just talk to your account manager to tailor your evening and
              entertainment around your ideal itinerary.
            </p>
          </div>
        </div>
      </section>
      <section
        className="height-auto testimonial_wrap pt-120 pb-80"
        id="testimonial"
      >
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
              “Everyone had an absolutely brilliant time, you so live up to your
              website and it definitely was the best party ever!”
            </p>
            <h4>JOHN LEWIS</h4>
          </div>
        </div>
      </section>
      <section
        className="height-auto package_wrapper pt-120 pb-120"
        id="package"
      >
        <div className="container">
          <div className="text-center">
            <h2 className="mb-3">EXAMPLE PACKAGE INCLUDES</h2>
            <h3 className="fw_400 mb-5">
              Bespoke nights tailored around our core features
            </h3>
          </div>
          <Row>
            <Col md={4}>
              <ul className="list_ul">
                <li>
                  VIP red carpet entrance with paparazzi photo opportunities
                </li>
                <li>
                  Free Cloakroom and on-site First Aid provision – just in case
                </li>
                <li>World class entertainment to excite and amaze</li>
                <li>Spectacular instagrammable themed parties</li>
              </ul>
            </Col>
            <Col md={4}>
              <ul className="list_ul">
                <li>Feature LED table-centres</li>
                <li>Interactive dessert stations and survivor’s breakfast</li>
                <li>Fully stocked bars and stylish cocktail lounge</li>
                <li>Exclusive champagne and Gin bars</li>
                <li>Interactive games and state of the art lighting</li>
              </ul>
            </Col>
            <Col md={4}>
              <ul className="list_ul">
                <li>Thrilling dodgem rides</li>
                <li>
                  Blackjack and Roulette casino for NHS Charities Together
                </li>
                <li>
                  DJ, signature dancefloor and separate Silent Disco... two
                  styles of music so something for everyone!
                </li>
                <li>Free car-parking and helpful security team</li>
              </ul>
            </Col>
          </Row>
        </div>
      </section>

      <section className="height-auto know_more_wrap pb-120">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4">WANT TO KNOW MORE?</h2>
            <p>
              GET IN TOUCH WITH US FOR MORE INFORMATION AND TO DISCUSS YOUR
              SPECIFIC REQUIREMENTS
            </p>
            <p>
              CALL OUR EXCLUSIVE TEAM ON 01932 359900 OR EMAIL US AT
              exclusives@bestpartiesever.com
            </p>
            <Link to="/exclusive-form" className="btn_primary">
              ENQUIRE NOW
            </Link>
          </div>
        </div>
      </section>
      <section className="height-auto newsletter_wrap">
        <NeverMiss />
      </section>
    </div>
  );
}

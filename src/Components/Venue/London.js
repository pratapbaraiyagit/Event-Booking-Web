import React, { useCallback, useEffect, useRef, useState } from 'react';
import ThemeLogo from '../../Assets/img/theme-logo.png';
import Experience from './VenueCommon/Experience';
import DatePrices from './VenueCommon/DatePrices';
import TheNight from './VenueCommon/TheNight';
import Package from './VenueCommon/Package';
import Menu from './VenueCommon/Menu';
import Drinks from './VenueCommon/Drinks';
import Location from './VenueCommon/Location';
import HotelDetail from './VenueCommon/HotelDetail';
import Faqs from './VenueCommon/Faqs';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import '../../Assets/css/lightgallery-bundle.css';
import { Button } from 'react-bootstrap';
import Tab from './VenueCommon/Tab';
import Pagination from './VenueCommon/Pagination';
import $ from 'jquery';
import MobileBgBanner from '../../Assets/img/london-bg.jpeg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVenueData } from 'store/reducers/Venue/venue.slice';
import Loader from 'Components/Common/Loader';

export default function London() {
  const { venueId } = useParams();

  const dispatch = useDispatch();

  const { venueDetail, venueLoading } = useSelector(({ venue }) => venue);

  useEffect(() => {
    if (venueId) {
      dispatch(getVenueData(venueId));
    }
  }, [dispatch, venueId]);

  const lightGallery = useRef(null);
  const [items, setItems] = useState([
    {
      id: '1',
      size: '1400-933',
      src: 'https://player.vimeo.com/video/810076826',
      thumb: 'https://player.vimeo.com/video/810076826',
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

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      $('.banner_wrapper').addClass('mobile');
      $('.Gallery_image_wrapper').addClass('mobile');
    }
  }, []);

  return (
    <>
      {venueLoading && <Loader />}
      <div className="value_page_wrapper">
        <section className="banner_wrapper vanue_banner">
          <div className="banner_video">
            <iframe
              src="https://player.vimeo.com/video/810076826?background=1&amp;autoplay=1&amp;loop=1&amp;byline=0&amp;title=0"
              frameborder="0"
              webkitallowfullscreen=""
              mozallowfullscreen=""
              allowfullscreen=""
              allow="autoplay; fullscreen; loop;"
              title="Crismas-party-london"
            ></iframe>
          </div>
          <div className="banner_bg_mobile">
            <img src={MobileBgBanner} alt="" />
          </div>
          <div className="banner_img">
            <img src={ThemeLogo} alt="" />
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
          <button className="mouse_scroll">
            <div className="mouse-icon">
              <span className="mouse-wheel"></span>
            </div>
            Scroll
          </button>
        </section>
        <Tab data={venueDetail} />
        <Pagination />
        <article className="scroll_section" id="Experience">
          <Experience data={venueDetail} />
        </article>
        <article className="scroll_section" id="date">
          <DatePrices data={venueDetail} />
        </article>
        <article className="scroll_section" id="Night">
          <TheNight data={venueDetail} />
        </article>
        <article className="scroll_section" id="Package">
          <Package data={venueDetail} />
        </article>
        <article className="scroll_section" id="Menu">
          <Menu data={venueDetail} />
        </article>
        <article className="scroll_section" id="Drinks">
          <Drinks data={venueDetail} />
        </article>
        <article className="scroll_section" id="Location">
          <Location data={venueDetail} />
        </article>
        <article className="scroll_section" id="Hotels">
          <HotelDetail data={venueDetail} />
        </article>
        <article className="scroll_section" id="Faqs">
          <Faqs data={venueDetail} />
        </article>
      </div>
    </>
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ThemeLogo8 from '../../Assets/img/theme-logo8.png';
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
import MobileBgBanner from '../../Assets/img/st-albans-bg.jpeg';

export default function StAlbans() {
  const lightGallery = useRef(null);
  const [items, setItems] = useState([
    {
      id: '1',
      size: '1400-933',
      src: 'https://player.vimeo.com/video/809826067',
      thumb: 'https://player.vimeo.com/video/809826067',
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
    <div className="value_page_wrapper">
      <section className="banner_wrapper vanue_banner">
        <div className="banner_video">
          <iframe
            src="https://player.vimeo.com/video/809826067?background=1&autoplay=1&loop=1&byline=0&title=0"
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
          <img src={ThemeLogo8} alt="" />
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
      <Tab />
      <Pagination />
      <article className="scroll_section" id="Experience">
        <Experience />
      </article>
      <article className="scroll_section" id="date">
        <DatePrices />
      </article>
      <article className="scroll_section" id="Night">
        <TheNight />
      </article>
      <article className="scroll_section" id="Package">
        <Package />
      </article>
      <article className="scroll_section" id="Menu">
        <Menu />
      </article>
      <article className="scroll_section" id="Drinks">
        <Drinks />
      </article>
      <article className="scroll_section" id="Location">
        <Location />
      </article>
      <article className="scroll_section" id="Hotels">
        <HotelDetail />
      </article>
      <article className="scroll_section" id="Faqs">
        <Faqs />
      </article>
    </div>
  );
}

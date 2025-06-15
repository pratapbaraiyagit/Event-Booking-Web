import React from 'react';
import ThemeLogo7 from '../../Assets/img/theme-logo7.png';
import Experience from './VenueCommon/Experience';
import DatePrices from './VenueCommon/DatePrices';
import TheNight from './VenueCommon/TheNight';
import Package from './VenueCommon/Package';
import Menu from './VenueCommon/Menu';
import Drinks from './VenueCommon/Drinks';
import Location from './VenueCommon/Location';
import HotelDetail from './VenueCommon/HotelDetail';
import Faqs from './VenueCommon/Faqs';
import '../../Assets/css/lightgallery-bundle.css';
import Tab from './VenueCommon/Tab';
import Pagination from './VenueCommon/Pagination';

export default function Southampton() {
  return (
    <div className="value_page_wrapper">
      <section className="banner_wrapper vanue_banner">
        <div className="banner_video southampton_bg_img"></div>
        <div className="banner_img">
          <img src={ThemeLogo7} alt="" />
        </div>
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

import React, { useEffect } from 'react';
import $ from 'jquery';

export default function Tab({ venueDetail }) {
  useEffect(() => {
    $('.tab_wrapper li').on('click', 'a[href^="#"]', function (e) {
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
      var offset = 50;
      // animated top scrolling
      $('body, html').animate({ scrollTop: pos - offset }, 100);
    });

    $(document).ready(function () {
      var bh = $('.pagination_left').height();
      $('article').height(bh - 20);
    });

    $(window)
      .scroll(function () {
        var scrollpos = $(window).scrollTop();
        // Assign active class to nav links while scolling
        $('article').each(function (i) {
          if ($(this).position().top <= scrollpos + 100) {
            $('.tab_wrapper li a.act').removeClass('act');
            $('.tab_wrapper li a').eq(i).addClass('act');

            var viewportheight = $('article').height();
            var licount = $('.tab_wrapper li').length;
            $('.tab_wrapper').animate({ scrollTop: scrollpos / licount }, 0);
          }
        });
      })
      .scroll();
  }, []);

  return (
    <section className="tab_wrapper">
      <nav>
        <ul>
          <li>
            <a href="#Experience">Experience</a>
          </li>
          <li>
            <a href="#date">date</a>
          </li>
          <li>
            <a href="#Night">Night</a>
          </li>
          <li>
            <a href="#Package">Package</a>
          </li>
          <li>
            <a href="#Menu">Menu</a>
          </li>
          <li>
            <a href="#Drinks">Drinks</a>
          </li>
          <li>
            <a href="#Location">Location</a>
          </li>
          <li>
            <a href="#Hotels">Hotels</a>
          </li>
          <li>
            <a href="#Faqs">Faqs</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

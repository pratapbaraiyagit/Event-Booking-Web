import React, { useEffect } from 'react';
import $ from 'jquery';

export default function Pagination() {
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
      $('article').height(bh - 20);
    });

    $(window)
      .scroll(function () {
        var scrollpos = $(window).scrollTop();
        // Assign active class to nav links while scolling
        $('article').each(function (i) {
          if ($(this).position().top <= scrollpos + 100) {
            $('.pagination_left li a.act').removeClass('act');
            $('.pagination_left li a').eq(i).addClass('act');

            var viewportheight = $('article').height();
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
  return (
    <section className="pagination_left">
      <ul>
        <li>
          <a href="#Experience">
            <span>Experience</span>
          </a>
        </li>
        <li>
          <a href="#date">
            <span>date</span>
          </a>
        </li>
        <li>
          <a href="#Night">
            <span>Night</span>
          </a>
        </li>
        <li>
          <a href="#Package">
            <span>Package</span>
          </a>
        </li>
        <li>
          <a href="#Menu">
            <span>Menu</span>
          </a>
        </li>
        <li>
          <a href="#Drinks">
            <span>Drinks</span>
          </a>
        </li>
        <li>
          <a href="#Location">
            <span>Location</span>
          </a>
        </li>
        <li>
          <a href="#Hotels">
            <span>Hotels</span>
          </a>
        </li>
        <li>
          <a href="#Faqs">
            <span>Faqs</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

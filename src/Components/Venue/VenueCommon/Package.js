import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default function Package({ data }) {
  useEffect(() => {
    $('.book_event_button .btn_primary').click(function () {
      var offset = 100;
      $('html, body').animate(
        {
          scrollTop: $('#date').offset().top - offset,
        },
        100,
      );
      return false;
    });
  }, []);
  return (
    <div className="package_wrapper pt-120 pb-80">
      <div className="container">
        <h2 className="mb-3 text-center">THE PACKAGE</h2>
        <div
          className="contact_wrapper_innrr"
          dangerouslySetInnerHTML={{ __html: data?.the_package }}
        ></div>

        <div className="text-center mt-5 book_event_button">
          <Link to="#date" className="btn_primary">
            BOOK YOUR EVENT NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

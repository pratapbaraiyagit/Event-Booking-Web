import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="contact_us_wrap">
      <div className="inner_banner contact_banner">
        <div className="container">
          <h1>Oops!</h1>
          <h3 style={{ fontWeight: '400' }}>We couldn't find that page</h3>
        </div>
      </div>
      <div className="contact_wrapper_inner pt-120 pb-120">
        <div className="container">
          <p>
            Sorry - the page you have requested no longer exists - please use
            the <b>Party Venues</b> navigation bar above to find our current
            range of parties.
          </p>
          <p>
            For more information please call the our office on 01932 359900 or
            email{' '}
            <Link to="mailto:bookings@bestpartiesever.com">
              bookings@bestpartiesever.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

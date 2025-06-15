import React from 'react';

export default function HotelDetail() {
  return (
    <div className="hotel_detail_Wrapper">
      <h2 className="text_dark">Hotel Deals</h2>
      <p>
        Best Parties Ever has negotiated the best rates with Booking.com for our
        party guests. To find a suitable hotel at the best rate available please
        use our Instant Hotel Search form:
      </p>
      <div className="hotelSearchBox">
        <ins
          className="bookingaff"
          data-aid="1840961"
          data-target_aid="1840961"
          data-prod="nsb"
          data-width="95%"
          data-height="250"
          data-lang="en"
          data-dest_id=""
          data-dest_type="city"
          data-df_num_properties="3"
          data-bk-touched="true"
        >
          <iframe
            src="https://www.booking.com/flexiproduct.html?product=nsb&w=95%25&h=250&lang=en&aid=1840961&target_aid=1840961&dest_type=city&df_num_properties=3&fid=1692077367950&"
            width="95%"
            height="250"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            frameborder="0"
            allowtransparency="true"
            id="booking_widget__1840961__1682911687733"
            data-responsive="false"
            title="booking"
          ></iframe>
        </ins>
      </div>
    </div>
  );
}

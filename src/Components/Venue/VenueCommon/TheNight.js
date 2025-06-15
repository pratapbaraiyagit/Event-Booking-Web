import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, A11y } from 'swiper';

export default function TheNight({ data }) {
  const tableHTML = data?.the_night;

  const tempDiv = document?.createElement('div');
  tempDiv.innerHTML = tableHTML;

  const table = tempDiv?.querySelector('table');

  const eventTimings = [];

  const rows = table?.querySelectorAll('tbody tr');
  rows?.forEach(row => {
    const columns = row?.querySelectorAll('td');

    const time = columns[0]?.querySelector('strong')?.textContent;
    const event = columns[1]?.textContent;

    eventTimings.push({ time, event });
  });

  return (
    <div className="night_wrapper pt-120 pb-80">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4">THE NIGHT</h2>
        </div>
        <div className="night_slider_wrapper">
          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={'auto'}
            slideToClickedSlide={true}
            navigation
            FreeMode
            scrollbar={{
              draggable: true,
              type: 'progressbar',
            }}
            centeredSlides={true}
            shortSwipes={true}
            onSwiper={swiper => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {eventTimings?.map((itemData, indexData) => {
              return (
                <SwiperSlide key={indexData}>
                  <div className="night_slide">
                    <div className="night_time">
                      <h5>{itemData?.time}</h5>
                    </div>
                    <div className="night_text">{itemData?.event}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import LightGallery from 'lightgallery/react';
import Futurum1 from '../../../Assets/img/futurum_1.jpeg';
import Futurum2 from '../../../Assets/img/futurum_2.jpeg';
import Futurum3 from '../../../Assets/img/futurum_3.jpeg';
import Futurum4 from '../../../Assets/img/futurum_4.jpeg';
import Futurum5 from '../../../Assets/img/futurum_5.jpeg';
import Futurum6 from '../../../Assets/img/futurum_6.jpeg';
import Futurum7 from '../../../Assets/img/futurum_7.jpeg';
import Futurum8 from '../../../Assets/img/futurum_8.jpeg';
import Futurum9 from '../../../Assets/img/futurum_9.jpeg';
import Futurum10 from '../../../Assets/img/futurum_10.jpeg';
import Futurum11 from '../../../Assets/img/futurum_11.jpeg';
import Futurum12 from '../../../Assets/img/futurum_12.jpeg';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import '../../../Assets/css/lightgallery-bundle.css';

export default function Gallery() {
  const lightGallery = useRef(null);
  const [items, setItems] = useState([
    {
      id: '1',
      size: '1400-933',
      src: Futurum1,
      thumb: Futurum1,
    },
    {
      id: '2',
      size: '1400-933',
      src: Futurum2,
      thumb: Futurum2,
    },
    {
      id: '3',
      size: '1400-933',
      src: Futurum3,
      thumb: Futurum3,
    },
    {
      id: '4',
      size: '1400-933',
      src: Futurum4,
      thumb: Futurum4,
    },
    {
      id: '5',
      size: '1400-933',
      src: Futurum5,
      thumb: Futurum5,
    },
    {
      id: '6',
      size: '1400-933',
      src: Futurum6,
      thumb: Futurum6,
    },
    {
      id: '7',
      size: '1400-933',
      src: Futurum7,
      thumb: Futurum7,
    },
    {
      id: '8',
      size: '1400-933',
      src: Futurum8,
      thumb: Futurum8,
    },
    {
      id: '9',
      size: '1400-933',
      src: Futurum9,
      thumb: Futurum9,
    },
    {
      id: '10',
      size: '1400-933',
      src: Futurum10,
      thumb: Futurum10,
    },
    {
      id: '11',
      size: '1400-933',
      src: Futurum11,
      thumb: Futurum11,
    },
    {
      id: '12',
      size: '1400-933',
      src: Futurum12,
      thumb: Futurum12,
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
        <div key={item.id} className="gallery-item" data-src={item.src}>
          <img className="img-responsive" src={item.thumb} alt="" />
          <i className="pi pi-search-plus"></i>
        </div>
      );
    });
  }, [items]);

  useEffect(() => {
    lightGallery.current.refresh();
  }, [items]);

  return (
    <div className="account_gallery_wrapper">
      <div className="account_gallery_title text-center mb-4">
        <h2 className="text-dark">FUTURUM</h2>
        <h4 className="text-dark">Gallery</h4>
      </div>
      <div className="gallery_wrapper">
        <div className="image_lightbox">
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
        </div>
      </div>
    </div>
  );
}

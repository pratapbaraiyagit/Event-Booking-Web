import Loader from 'Components/Common/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAboutData } from 'store/reducers/About/about.slice';

export default function Contact() {
  const dispatch = useDispatch();
  const { aboutId } = useParams();

  const { aboutDetail, aboutLoading } = useSelector(({ about }) => about);

  useEffect(() => {
    if (aboutId) {
      dispatch(getAboutData(aboutId));
    }
  }, [dispatch, aboutId]);

  return (
    <>
      {aboutLoading && <Loader />}
      <div className="contact_us_wrap">
        <div className="inner_banner contact_banner">
          <div className="container">
            <h1>{aboutDetail[0]?.title}</h1>
          </div>
        </div>
        <div className="contact_wrapper_inner pt-120 pb-120">
          <div className="container">
            <div
              className="h2 text_dark"
              dangerouslySetInnerHTML={{ __html: aboutDetail[0]?.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

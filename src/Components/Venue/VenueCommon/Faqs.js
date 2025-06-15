import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function Faqs({ data }) {
  const [showMore, setShowMore] = useState(false);
  const showMoreHandle = () => {
    setShowMore(!showMore);
  };
  const closeHandle = () => {
    setShowMore(false);
  };
  return (
    <div className="faq_wrapper pt-120 pb-80">
      <div className="container">
        <div className="text-center">
          <h2>FAQS</h2>
          <p>Some of the most frequently asked questions we receive</p>
        </div>
        <div className="faq_inner_wrap">
          <div className="more_content">
            <div className="text-center">
              <div onClick={() => showMoreHandle()} className="show_more_btn">
                <i className="pi pi-angle-down me-2"></i> <span>Show All</span>
              </div>
            </div>
            {showMore === true && (
              <div className="more_content_innner mt-4">
                <div className="close_btn" onClick={() => closeHandle()}>
                  <i className="pi pi-times"></i>
                </div>
                {data?.FAQ?.map((item, index) => {
                  return (
                    <div className="accordian_wrapper" key={index}>
                      <h4>{item?.category}</h4>
                      {item?.FAQ?.map((itemData, indexData) => {
                        return (
                          <Accordion multiple key={indexData}>
                            <AccordionTab header={itemData?.question}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: itemData?.answer,
                                }}
                              ></div>
                              {/* <p>{itemData?.answer}</p> */}
                            </AccordionTab>
                          </Accordion>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

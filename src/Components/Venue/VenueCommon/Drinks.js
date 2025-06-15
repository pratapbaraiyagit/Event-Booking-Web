import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

export default function Drinks({ data }) {
  const [showDrinkList, setShowDrinkList] = useState(false);
  const showDrinkListHandle = () => {
    setShowDrinkList(!showDrinkList);
  };

  return (
    <div className="drink_wrapper pt-120">
      <div className="container">
        <div className="text-center">
          <h2>DRINKS</h2>
          <p>*Prices are subject to change.</p>
          <p dangerouslySetInnerHTML={{ __html: data?.drinks_section_text }} />
        </div>
        <div className="drink_list_wrapper">
          <div className="view_drink_list">
            <span onClick={() => showDrinkListHandle()}>VIEW DRINKS LIST</span>
          </div>
          {showDrinkList === true && (
            <div className="drink_list_inner">
              {data?.product?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <h5 className="fw_500">{item?.category}</h5>
                    <ul>
                      {item?.product?.map((element, index) => {
                        return (
                          <li key={index}>
                            <div className="package_left_content">
                              <h5>{element?.public_name}</h5>
                              <Button
                                tooltip={element?.sales_rules[0]?.description}
                                tooltipOptions={{ position: 'top' }}
                                className="tooltip_btn"
                              >
                                <i className="pi pi-question-circle me-1"></i> (
                                {element?.sales_rules[0]?.public_name})
                              </Button>
                              <p>{element?.description}</p>
                            </div>
                            <div className="package_price">
                              <h6>£{element?.gross_price} inc VAT</h6>
                              <p>£{element?.net_price} excl VAT</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="testimonial_wrap pt-120 pb-80">
        <div className="container">
          <div className="testimonial_inner">
            <div className="rating">
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
              <i className="pi pi-star-fill"></i>
            </div>
            <p className="big">
              "Fabulous! The best ever, has WOW factor all night, thank you for
              a memorable evening with great food, wonderful entertainment and
              perfect organisation!”
            </p>
            <h4>Arla Foods</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

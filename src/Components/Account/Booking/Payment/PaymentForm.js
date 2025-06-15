import React, { useEffect, useState } from 'react';
// import './payment.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Visa from '../../../../Assets/img/visa.svg';
import MasterCard from '../../../../Assets/img/Mastercard.svg';
import Maestro from '../../../../Assets/img/Maestro.svg';
import DInternation from '../../../../Assets/img/DInternation.svg';
import AmericanExpress from '../../../../Assets/img/americanExpress.svg';
import JCB from '../../../../Assets/img/Jcb.svg';
import truck from '../../../../Assets/img/TruckPay.png';
import InternationalShiPIcon from '../../../../Assets/img/InternationalShiPIcon.png';
import ReturnUp from '../../../../Assets/img/ReturnUp.png';
import SecurePayment from '../../../../Assets/img/SecurePayment.png';

function PaymentForm() {
  const { state } = useLocation();

  const integrationKey = 'gmof99yDahpmiqlKuejX9Nl0K8z2l6DiBGZrMyKS7OcbC6bEon';
  const integrationPassword =
    'rZVY9GDsaKwPVALMpehxAe6zFx4pTafbX2LQXODTgsaXelVbL8i6lNmypGpx5XrMX';
  const credentials = btoa(`${integrationKey}:${integrationPassword}`);

  const [merchantSessionKey, setMerchantSessionKey] = useState('');
  console.log('merchantSessionKey', merchantSessionKey);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function createMerchantSessionKey() {
      try {
        const response = await axios.post(
          'https://pi-test.sagepay.com/api/v1/merchant-session-keys',
          {
            vendorName: 'eventisttest',
          },
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-type': 'application/json',
            },
          },
        );
        setMerchantSessionKey(response.data.merchantSessionKey);
      } catch (error) {
        console.error('Error creating merchant session key:', error);
      }
    }

    createMerchantSessionKey();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const transactionData = {
        transactionType: 'Payment',
        paymentMethod: {
          card: {
            merchantSessionKey: merchantSessionKey,
            cardIdentifier: '', // Replace with your cardIdentifier
          },
        },
        vendorTxCode: 'demotransaction-', // Replace with your unique reference
        amount: state?.data?.deposite_to_pay, // Replace with your transaction amount
        currency: 'GBP',
        description: 'Demo transaction',
        apply3DSecure: 'UseMSPSetting',
        customerFirstName: 'Sam',
        customerLastName: 'Jones',
        billingAddress: {
          address1: '407 St. John Street',
          city: 'London',
          postalCode: 'EC1V 4AB',
          country: 'GB',
        },
        entryMethod: 'Ecommerce',
        strongCustomerAuthentication: {
          website:
            'https://ec2-16-171-40-243.eu-north-1.compute.amazonaws.com:3001',
          notificationURL: 'https://notification.url',
          browserIP: '10.68.21.21',
          browserAcceptHeader: 'text/html, application/json',
          browserJavascriptEnabled: true,
          browserJavaEnabled: false,
          browserLanguage: 'en-GB',
          browserColorDepth: '16',
          browserScreenHeight: '768',
          browserScreenWidth: '1200',
          browserTZ: '+300',
          browserUserAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0',
          challengeWindowSize: 'Small',
          threeDSRequestorChallengeInd: '02',
          requestSCAExemption: false,
          transType: 'GoodsAndServicePurchase',
          threeDSRequestorDecReqInd: 'N',
        },
      };

      const response = await axios.post(
        'https://pi-test.sagepay.com/api/v1/transactions',
        transactionData,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-type': 'application/json',
          },
        },
      );

      setResponse(response.data);
      console.log('Response:', response);
      // Replace with your payment form submission logic
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div>
      <div className="pay_main">
        <h2>Payment details</h2>
        <h3>
          <span>TOTAL</span> £{state?.data?.deposite_to_pay?.toFixed(2)} GBP
        </h3>
        <ul>
          <li>
            <img src={Visa} alt="" />
          </li>
          <li>
            <img src={MasterCard} alt="" />
          </li>
          <li>
            <img src={Maestro} alt="" />
          </li>
          <li>
            <img src={DInternation} alt="" />
          </li>
          <li>
            <img src={AmericanExpress} alt="" />
          </li>
          <li>
            <img src={JCB} alt="" />
          </li>
        </ul>
        <div id="sp-container"></div>
        <div id="submit-container">
          <button
            type="submit"
            className="pay_btn"
            onClick={() => {
              if (merchantSessionKey) {
                const script = document.createElement('script');
                script.src = 'https://pi-test.sagepay.com/api/v1/js/sagepay.js';
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                  window
                    .sagepayCheckout({
                      merchantSessionKey,
                      containerSelector: '#sp-container',
                    })
                    .form();
                };

                script.onerror = error => {
                  console.error('Error loading SagePay script:', error);
                  // Handle the error, e.g., show an error message to the user
                };

                return () => {
                  document.body.removeChild(script);
                };
              }
            }}
          >
            Pay now
          </button>
        </div>
        <div className="bottom_box">
          <ul>
            <li>
              <div className="bottom_img">
                <img src={truck} alt="" />
              </div>
              <div className="bottom_txt">
                <p>FREE & TRUSTED COURIER SERVICE</p>
              </div>
            </li>
            <li>
              <div className="bottom_img">
                <img src={InternationalShiPIcon} alt="" />
              </div>
              <div className="bottom_txt">
                <p>INTERNATIONAL SHIPPING</p>
              </div>
            </li>
            <li>
              <div className="bottom_img">
                <img src={ReturnUp} alt="" />
              </div>
              <div className="bottom_txt">
                <p>RETURN UP TO 30 DAYS</p>
              </div>
            </li>
            <li>
              <div className="bottom_img">
                <img src={SecurePayment} alt="" />
              </div>
              <div className="bottom_txt">
                <p>Secured by 256bit SSL</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;

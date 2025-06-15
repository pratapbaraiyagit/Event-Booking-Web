import ExclusiveForm from 'Components/ExclusiveForm';
import React, { lazy, useEffect, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import { useDispatch } from 'react-redux';
import { getSessionValue } from 'utils/common';
import Loader from 'Components/Common/Loader';
import Header from 'Components/Common/Header';
import Footer from 'Components/Common/Footer';
const Home = lazy(() => import('Components/index'));
const London = lazy(() => import('Components/Venue/London'));
const Sussex = lazy(() => import('Components/Venue/Sussex'));
const Billericay = lazy(() => import('Components/Venue/Billericay'));
const Hampshire = lazy(() => import('Components/Venue/Hampshire'));
const Maidstone = lazy(() => import('Components/Venue/Maidstone'));
const Reading = lazy(() => import('Components/Venue/Reading'));
const Southampton = lazy(() => import('Components/Venue/Southampton'));
const StAlbans = lazy(() => import('Components/Venue/StAlbans'));
const Windsor = lazy(() => import('Components/Venue/Windsor'));
const Bristol = lazy(() => import('Components/Venue/Bristol'));
const Bicester = lazy(() => import('Components/Venue/Bicester'));
const MiltonKeynes = lazy(() => import('Components/Venue/MiltonKeynes'));
const Nottingham = lazy(() => import('Components/Venue/Nottingham'));
const Liverpool = lazy(() => import('Components/Venue/Liverpool'));
const Manchester = lazy(() => import('Components/Venue/Manchester'));
const Newcastle = lazy(() => import('Components/Venue/Newcastle'));
const SyonWestLondon = lazy(() => import('Components/Venue/SyonWestLondon'));
const ExclusiveParties = lazy(() => import('Components/ExclusiveParties'));
const Login = lazy(() => import('Components/Account/Login'));
const CreateAccount = lazy(() => import('Components/Account/CreateAccount'));
const SetupAccount = lazy(() => import('Components/Account/SetupAccount'));
const ForgotPassword = lazy(() => import('Components/Account/ForgotPassword'));
const ResetPassword = lazy(() => import('Components/Account/ResetPassword'));
const MyAccount = lazy(() => import('Components/Account/MyAccount'));
const Booking = lazy(() => import('Components/Account/Booking/Index'));
const Confirm = lazy(() =>
  import('Components/Account/Booking/ConfirmYourPlaces'),
);
const PaymentForm = lazy(() =>
  import('Components/Account/Booking/Payment/PaymentForm'),
);
const BookingTerms = lazy(() =>
  import('Components/Account/Booking/BookingTerms'),
);
const RequestBrochure = lazy(() => import('Components/About/RequestBrochure'));
const Contact = lazy(() => import('Components/About/Contact'));
const NotFoundPage = lazy(() => import('Components/NotFoundPage'));
const OneFeedsTwo = lazy(() => import('Components/About/OneFeedsTwo'));
const BookPlaces = lazy(() => import('Components/Account/BookPlaces'));

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    getSessionValue();
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="main_wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route
            path="/christmas-parties/:routes/:venueId"
            element={<London />}
          />
          <Route path="/christmas-parties-sussex" element={<Sussex />} />
          <Route
            path="/christmas-parties-billericay"
            element={<Billericay />}
          />
          <Route path="/christmas-parties-hampshire" element={<Hampshire />} />
          <Route path="/christmas-parties-maidstone" element={<Maidstone />} />
          <Route path="/christmas-parties-reading" element={<Reading />} />
          <Route
            path="/christmas-parties-southampton"
            element={<Southampton />}
          />
          <Route path="/christmas-parties-st-albans" element={<StAlbans />} />
          <Route
            path="/christmas-parties-syon-west-london"
            element={<SyonWestLondon />}
          />
          <Route path="/christmas-parties-windsor" element={<Windsor />} />
          <Route path="/christmas-parties-bristol" element={<Bristol />} />
          <Route path="/christmas-parties-bicester" element={<Bicester />} />
          <Route
            path="/christmas-parties-milton-keynes"
            element={<MiltonKeynes />}
          />
          <Route
            path="/christmas-parties-nottingham"
            element={<Nottingham />}
          />
          <Route path="/christmas-parties-liverpool" element={<Liverpool />} />
          <Route
            path="/christmas-parties-manchester"
            element={<Manchester />}
          />
          <Route path="/christmas-parties-newcastle" element={<Newcastle />} />
          <Route path="/exclusiveparties" element={<ExclusiveParties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/setup-account" element={<SetupAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bpe-user/reset-password" element={<ResetPassword />} />
          <Route path="/about/:routes/:aboutId" element={<Contact />} />
          <Route path="/exclusive-form" element={<ExclusiveForm />} />
          <Route path="/one-feeds-two" element={<OneFeedsTwo />} />
          <Route path="/pagenotfound" element={<NotFoundPage />} />
          <Route
            exact
            path="/book-places"
            element={
              <PrivateRouter>
                <BookPlaces />
              </PrivateRouter>
            }
          />
          {/* protected start */}
          <Route
            exact
            path="/account"
            element={
              <PrivateRouter>
                <MyAccount />
              </PrivateRouter>
            }
          />
          <Route
            exact
            path="/booking/:id"
            element={
              <PrivateRouter>
                <Booking />
              </PrivateRouter>
            }
          />
          <Route
            exact
            path="/booking/:id/confirm"
            element={
              <PrivateRouter>
                <Confirm />
              </PrivateRouter>
            }
          />
          <Route
            exact
            path="/booking/:id/confirmterms"
            element={
              <PrivateRouter>
                <BookingTerms />
              </PrivateRouter>
            }
          />
          <Route
            exact
            path="/request-brochures"
            element={
              <PrivateRouter>
                <RequestBrochure />
              </PrivateRouter>
            }
          />
          <Route
            exact
            path="/payment"
            element={
              <PrivateRouter>
                <PaymentForm />
              </PrivateRouter>
            }
          />
          {/* protected end */}
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

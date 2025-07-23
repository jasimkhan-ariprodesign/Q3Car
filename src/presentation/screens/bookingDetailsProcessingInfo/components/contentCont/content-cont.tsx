import React, {useState} from 'react';
import {BookingProcessingComp, DriverInfoComp} from '..';

const ContentCont = () => {
  const [bookingProcessTracker, setBookingProcessTracker] = useState<
    'bookingProcessing' | 'driverInfo'
  >('bookingProcessing');

  const _handleChange = () => {
    setBookingProcessTracker('driverInfo');
  };

  const _renderBookingProcessingComponent = () => {
    return <BookingProcessingComp onSlide={_handleChange} />;
  };

  const _renderDriverInfoComp = () => {
    return <DriverInfoComp />;
  };

  return (
    <>
      {/* booking processing comp */}
      {bookingProcessTracker === 'bookingProcessing' && _renderBookingProcessingComponent()}

      {/* booking driver info response data component */}
      {bookingProcessTracker === 'driverInfo' && _renderDriverInfoComp()}
    </>
  );
};

export default ContentCont;

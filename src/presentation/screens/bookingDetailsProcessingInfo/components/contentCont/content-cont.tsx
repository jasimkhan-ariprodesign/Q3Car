import React from 'react';
import BookingProcessingComponent from './components/bookingProcessingComponent/booking-processing-component';

const ContentCont = () => {
  const _renderBookingProcessingComponent = () => {
    return <BookingProcessingComponent />;
  };

  return (
    <>
      {/* booking processing comp */}
      {_renderBookingProcessingComponent()}
    </>
  );
};

export default ContentCont;

import { useState } from 'react';

export const useShowCountryCodePicker = () => {
  const [showCountryCodeUiState, setShowCountryCodeUiState] = useState({
    visible: false,
  });

  const showCountryCodePicker = () => {
    setShowCountryCodeUiState(prev => ({
      ...prev,
      visible: true,
    }));
  };

  const hideCountryCodePicker = () =>
    setShowCountryCodeUiState(prev => ({
      ...prev,
      visible: false,
    }));

  return {
    showCountryCodeUiState,
    showCountryCodePicker,
    hideCountryCodePicker,
  };
};

export interface UiState<T> {
  isLoading: boolean;
  data: T | undefined;
  error: any | undefined;
}

// Function to get the default Ui state data
export function getDefaultUiState<T>(): UiState<T> {
  return {
    isLoading: false,
    data: undefined,
    error: undefined,
  };
}

// Function to get the initial loading state
export function getInitialLoadingState<T>(previousData: T | undefined = undefined): UiState<T> {
  return {
    isLoading: true,
    data: previousData,
    error: undefined,
  };
}

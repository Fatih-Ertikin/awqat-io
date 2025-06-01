type UseGeoLocationParams = {
  onSuccess: (position: GeolocationPosition) => void;
  onError: (error: GeolocationPositionError) => void;
};

export function useGeoLocation(params: UseGeoLocationParams) {
  const { onSuccess, onError } = params;

  const requestLocation = () => {
    if (!navigator.geolocation) {
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  };

  return {
    requestLocation,
  };
}

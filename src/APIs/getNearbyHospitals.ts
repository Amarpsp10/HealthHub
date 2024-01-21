import {AxiosResponse} from 'axios';
import Api from '.';

export type Location = {
  business_status: 'OPERATIONAL';
  geometry: {
    location: {lat: number; lng: number};
  };
  name: string;
  place_id: string;
  rating: number;
  vicinity: string;
};

export type NearbyHospitalsResponse = {
  html_attributions: [];
  results: Location[];
  status: 'OK';
};

// api to get location details from place id, return postal code, city, state, country & locality
export const getNearbyHospitals = async (
  latitude: number,
  longitude: number,
): Promise<Location[] | null> => {
  try {
    const response: AxiosResponse<NearbyHospitalsResponse> = await Api.get(
      `/nearbysearch/json?type=hospital&location=${latitude},${longitude}&radius=5000`,
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

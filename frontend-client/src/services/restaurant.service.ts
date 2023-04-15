import axios from "axios";
import { IRestaurant } from "../models/entities/restaurant.entity";
import authHeader from "../utils/auth-header";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const getCurrentRestaurant = (id: string) => {
  return axios.get<IRestaurant>(API_URL + `/admin/restaurants/${id}`, {
    headers: authHeader(),
  });
};

export const checkTableAvailability = (id: string, headCount: number) => {
  return axios.get<string>(
    API_URL + `/admin/restaurants/checkForAvailability/${id}`,
    {
      headers: authHeader(),
      params: { headCount },
    }
  );
};

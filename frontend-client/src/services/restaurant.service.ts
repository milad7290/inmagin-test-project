import axios from "axios";
import { IRestaurant } from "../models/entities/restaurant.entity";
import authHeader from "../utils/auth-header";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const getCurrentRestaurant = (name: string) => {
  return axios.get<IRestaurant>(API_URL + `/restaurants/${name}`, {
    headers: authHeader(),
  });
};

export const checkTableAvailability = (id: string, headCount: number) => {
  return axios.get<string>(
    API_URL + `/restaurants/checkForAvailability/${id}`,
    {
      headers: authHeader(),
      params: { headCount },
    }
  );
};

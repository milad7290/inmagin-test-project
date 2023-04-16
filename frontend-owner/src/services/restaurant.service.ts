import axios from "axios";
import { UpdateRestaurantDto } from "../models/dtos/restaurant/update-restaurant.dto";
import { IRestaurant } from "../models/entities/restaurant.entity";
import authHeader from "../utils/auth-header";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const getCurrentRestaurant = (id: string) => {
  return axios.get<IRestaurant>(API_URL + `/admin/restaurants/${id}`, {
    headers: authHeader(),
  });
};

export const updateCurrentRestaurant = (data: UpdateRestaurantDto) => {
  return axios.patch<IRestaurant>(API_URL + `/admin/restaurants`, data, {
    headers: authHeader(),
  });
};

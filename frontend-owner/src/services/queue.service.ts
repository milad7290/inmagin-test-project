import axios from "axios";
import { IRestaurant } from "../models/entities/restaurant.entity";
import authHeader from "../utils/auth-header";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const removeFromQueue = (queueId: string) => {
  return axios.delete<IRestaurant>(API_URL + `/admin/queues/${queueId}`, {
    headers: authHeader(),
  });
};

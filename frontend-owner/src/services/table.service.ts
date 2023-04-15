import axios from "axios";
import { CreateTableDto } from "../models/dtos/auth/table/create-table.dto";
import { IRestaurant } from "../models/entities/restaurant.entity";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const createNewTable = (data: CreateTableDto) => {
  return axios.post<IRestaurant>(API_URL + `/admin/tables`, data);
};

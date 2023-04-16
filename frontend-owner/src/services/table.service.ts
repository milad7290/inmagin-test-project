import axios from "axios";
import { CreateTableDto } from "../models/dtos/table/create-table.dto";
import { SetAsAvailableTableDto } from "../models/dtos/table/set-as-available-table.dto";
import { IRestaurant } from "../models/entities/restaurant.entity";
import authHeader from "../utils/auth-header";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const createNewTable = (data: CreateTableDto) => {
  return axios.post<IRestaurant>(API_URL + `/admin/tables`, data, {
    headers: authHeader(),
  });
};

export const setTableAsAvailable = (data: SetAsAvailableTableDto) => {
  return axios.patch<[IRestaurant, string]>(
    API_URL + `/admin/tables/setTableAsAvailable`,
    data,
    {
      headers: authHeader(),
    }
  );
};

export const removeTable = (tableId: string) => {
  return axios.delete<IRestaurant>(API_URL + `/admin/tables/${tableId}`, {
    headers: authHeader(),
  });
};

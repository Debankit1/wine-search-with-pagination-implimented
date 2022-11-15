import axios from "axios";
import { GET_WINE } from "./CONSTANTS";

export const getWines = () => {
  return axios.get(GET_WINE);
};

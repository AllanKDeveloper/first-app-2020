import axios from "axios";

/* 
  API from rapidapi, returns the schedule races from formula 1
  More: https://rapidapi.com/warlock1372/api/f1-race-schedule/
*/
export const api = axios.create({
  baseURL: "https://f1-race-schedule.p.rapidapi.com/api",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "f1-race-schedule.p.rapidapi.com",
    "x-rapidapi-key": "d4d65c17b1mshcee3200b27a2535p161e06jsnb148f3cc728e",
  },
});
export default {
  findEvent: (id: number) =>
    api({
      method: "GET",
      url: "https://f1-race-schedule.p.rapidapi.com/api/race/" + id,
    }),
};

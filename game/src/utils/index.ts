// import { couldStartTrivia } from "typescript";

import { FiltersProps, CarProps } from "@/type";

export async function fetchCar(filters: FiltersProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

  // const url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "770ba231ddmshee2d3f379ca99aep18019fjsn656a0ae402dc",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    // console.log("000000000000000000");
  }
}
export const couldStartTrivia = (car: CarProps, angle?: string) => {
  console.log("1");
};
// fetchCar();

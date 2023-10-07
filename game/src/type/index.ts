import { MouseEventHandler } from "react";

export interface CustomBotton {
  title?: string;
  containerStyle?: string;
  handleclick?: MouseEventHandler;
  btntype?: "button" | "submit";
  textStyle?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerprops {
  manufacturer?: string;
  setmanufacturer?: (manufacturer: string) => void;
}

export interface CarProps {
  city_mpg?: number;
  class?: string;
  combination_mpg?: number;
  cylinders?: number;
  displacement?: number;
  drive?: string;
  fuel_type?: string;
  highway_mpg?: number;
  make?: string;
  model?: string;
  transmission?: string;
  year?: number;
}
export interface FiltersProps {
  manufacturer?: string;
  year?: number;
  fuel?: string;
  limit?: 10;
  model?: string;
}

export interface HomeProps {
  // model?: string;
  searchParams?: FiltersProps;
  // searchParams?: {
  //   manufacturer?: string;
  //   year?: number;
  //   fuel?: string;
  //   limit?: 10;
  //   model?: string;
  // };
}

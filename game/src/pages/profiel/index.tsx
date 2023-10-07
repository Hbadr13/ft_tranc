import { json } from "stream/consumers";
import { CustomFilter, Hero, SearchBar, CarCard } from "../../components/profiel/index"
import { fetchCar } from '../../utils/index'
import { useState, useEffect } from "react";
import { CarProps, FiltersProps } from "@/type";
import { HomeProps } from "@/type";


interface ArrayCarProps {
  allcarss: Array<CarProps>;
}

const CompnontFoundCars = ({ allcarss }: ArrayCarProps) => {
  return (
    <section>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
        {allcarss.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </section>
  )
}

const CompnontNotFoundCars = ({ allcarss }: { allcarss: any }) => {
  return (
    <div className="mt-16 flex justify-center items-center flex-col gap-2">
      <h2>Ops , no results</h2>
      <p className="text-black text-xl font-blod">{allcarss?.message}</p>
    </div>
  )
}
const choise = [CompnontNotFoundCars, CompnontFoundCars]


export default function Index({ searchParams }: HomeProps) {
  const [allCars, setallCars] = useState([]);
  const [isDataEmpty, setisDataEmpty] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const _allCars = await fetchCar({
        manufacturer: searchParams?.model || "",
        year: searchParams?.year || 2022,
        fuel: searchParams?.manufacturer || "",
        limit: searchParams?.limit || 10,
        model: searchParams?.fuel || "",
      }
      );
      console.log(typeof (_allCars))
      setallCars(_allCars)
      setisDataEmpty(Array.isArray(_allCars) && _allCars.length > 0 && _allCars != null)
      console.log(isDataEmpty)
    };
    fetchData();
  }, [isDataEmpty]);
  const ComponentChoise = choise[Number(isDataEmpty)]
  console.log(Number(isDataEmpty))
  return (
    <main className="overflow-hidden">
      <div>
      </div>
      <Hero></Hero>
      <div className="h-[200px]"></div>
      <div className="mt-12 px-20">
        <div className="flex flex-col items-start justify-start gap-y-2.5 text-black-100">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>explort the cars might like</p>
        </div>

        <div className="flex items-center justify-between mt-8">
          <SearchBar />
          <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        <div>
          <ComponentChoise allcarss={allCars} />
        </div>
      </div>
    </main >
  );
}

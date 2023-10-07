import { SearchManufacturer } from "."
import React, { useState } from 'react'
import Image from "next/image"
import Router, { useRouter } from "next/router"
// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url"
const SearchButton = (otherClass: { otherClass: string }) => {
    return (
        <>
            <button type="submit" className={`-ml-3 z-10 ${otherClass}`}>
                <Image width={40} height={40}
                    src='magnifying-glass.svg'
                    alt='magnifying'
                    className="object-contain"></Image>
            </button >
        </>
    )
}


const SearchBar = () => {
    const [manufacturer, setmanufacturer] = useState('')
    const [model, setmodel] = useState('')
    const router = useRouter()
    const updataSearchParms = (model: string, manufacturer: string) => {
        const SearchParmas = new URLSearchParams(window.location.search)
        if (model)
            SearchParmas.set("model", model)
        else
            SearchParmas.delete("model")
        if (manufacturer)
            SearchParmas.set("manufacturer", manufacturer)
        else
            SearchParmas.delete("manufacturer")
        console.log("-----" + SearchParmas.toString())
        router.push(`${window.location.pathname}?${SearchParmas.toString()}`)
    }
    const handelSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()// for the element form don't reload page
        if (model === '' && manufacturer === '') { alert('hi'); return }
        updataSearchParms(model.toLowerCase(),
            manufacturer.toLowerCase())
    }
    return (
        <form className='flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl' onSubmit={handelSearch}>
            <div>
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setmanufacturer={setmanufacturer} />
                {/* <div>-{manufacturer}-</div> */}
                <SearchButton otherClass='sm:hidden' />
            </div>
            <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
                <Image
                    src='/model-icon.png'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt='car model'
                />
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setmodel(e.target.value)}
                    placeholder='Tiguan...'
                    className='w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm'
                />
                <SearchButton otherClass='sm:hidden' />
            </div>
        </form>
    )
}

export default SearchBar
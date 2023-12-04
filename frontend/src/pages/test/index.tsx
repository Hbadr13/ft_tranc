import React from 'react'

export default function index() {
    return (
        <div className='bg-center text-center w-[50%] h-[50%] '>
            <select>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
        </div>
    )
}

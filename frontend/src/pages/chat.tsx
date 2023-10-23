import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function MyComponent() {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <>
      <div className="">
        <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
          Toggle
        </button>

        <Transition
          show={isShowing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button className={`bg-red-200 w-[250px] h-[170px]   rounded-3xl p-3 duration-200 `}>hello</button>

        </Transition>

      </div>
    </>
  )
}

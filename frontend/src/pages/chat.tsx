
// import { useEffect, useState } from 'react';

// const ThemeSwitcher = () => {



//   const toggleTheme = () => {
//     // setDarkMode((prevMode) => !prevMode);
//     document.body.classList.toggle('dark');
//   };
//   return (
//     <div className="">
//       <div className="test  ">
//         <button onClick={toggleTheme}>
//           Toggle Theme
//         </button>
//       </div>
//       <h1 className="text-3xl dark:text-white">Hello, world!</h1>
//       <p className="dark:bg-gray-800">This is a dark mode element.</p>
//     </div>
//   );
// };

// export default ThemeSwitcher;
import { useState, useEffect, useRef } from 'react';

const HideOnClickOutside = () => {
  const [isVisible, setIsVisible] = useState(true);
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  const handleClickOutside1 = (event: any) => {
    setIsVisible(true)
    if (ref1.current && !ref1.current.contains(event.target)) {
    }
  };
  const handleClickOutside2 = (event: any) => {
    if (ref2.current && !ref2.current.contains(event.target) && !ref1.current.contains(event.target)) {
      setIsVisible(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside2);

  }, []);

  return (
    <div className="relative">
      <button ref={ref1} onClick={handleClickOutside1}>Toggle Div</button>

      {isVisible ? (
        <div ref={ref2} className="bg-blue-500 text-white p-4 absolute top-0 left-0 mt-10">
          This is the div you want to hide.
        </div>
      ) : null}
    </div>
  );
};

export default HideOnClickOutside;

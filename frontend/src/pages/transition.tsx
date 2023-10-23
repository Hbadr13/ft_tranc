

// import { useState } from 'react';

// const SlideComponent = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => {
//     setIsVisible(prev => !prev);
//   };

//   return (
//     <div>
//       <button onClick={toggleVisibility}>Toggle Visibility</button>

//       <div className={`transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} duration-500`} id="myDiv">
//         Content here
//       </div>
//     </div>
//   );
// };

// export default SlideComponent;




// import { useState } from 'react';

// const FadeComponent = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   const toggleVisibility = () => {
//     setIsVisible(prev => !prev);
//   };

//   return (
//     <div>
//       <button onClick={toggleVisibility}>Toggle Visibility</button>

//       <div className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'} duration-300`} id="myDiv">
//         Content here
//       </div>
//     </div>
//   );
// };

// export default FadeComponent;



// import { useState } from 'react';

// const ScaleComponent = () => {
//     const [isVisible, setIsVisible] = useState(false);

//     const toggleVisibility = () => {
//         setIsVisible(prev => !prev);
//     };

//     return (
//         <div>
//             <button onClick={toggleVisibility}>Toggle Visibility</button>

//             <div className={`transition-transform ${isVisible ? 'scale-100' : 'scale-0'} duration-500`} id="myDiv">
//                 Content here
//             </div>
//         </div>
//     );
// };

// export default ScaleComponent;




// import { useState } from 'react';

// const RotateComponent = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => {
//     setIsVisible(prev => !prev);
//   };

//   return (
//     <div>
//       <button onClick={toggleVisibility}>Toggle Visibility</button>

//       <div className={`transition-transform ${isVisible ? 'rotate-0' : 'rotate-45'} duration-500`} id="myDiv">
//         Content here
//       </div>
//     </div>
//   );
// };

// export default RotateComponent;










// import { useState } from 'react';

// const FlexHiddenComponent = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => {
//     setIsVisible(prev => !prev);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <button onClick={toggleVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Toggle Visibility
//       </button>

//       <div className={`transition-all duration-1000  ${isVisible ? 'flex' : 'hidden'}`}>
//         Content here
//       </div>
//     </div>
//   );
// };

// export default FlexHiddenComponent;


import { useRef, useState } from 'react';

const YourComponent = () => {
  const elementRef: any = useRef();
  const [hideRequest, sethideRequest] = useState<boolean>(true);
  const [opacity, setopacity] = useState<number>(1);
  const handerRefuseButton = () => {
    sethideRequest((prev) => !prev)
    const element = elementRef.current;
    const styles = window.getComputedStyle(element);
    const opacity: string = styles.getPropertyValue('opacity');
    setopacity(Number(opacity) + 1)
  }
  return (
    <>
      <div ref={elementRef} className={` transition-opacity duration-500 z-40 absolute w-full h-screen flex ${hideRequest ? ' opacity-100' : ' opacity-0'} justify-center items-center transition duration-150 ease-in-out`}>
        <div className='z-50 w-[30%] h-[30%] bg-white rounded-3xl shadow-md'>
          <button onClick={handerRefuseButton} className='m-2 border-2 border-black rounded-xl py-1 px-4'>Refuse</button>
        </div>
      </div>
      <button>{opacity}</button>
    </>
  );
};

export default YourComponent;

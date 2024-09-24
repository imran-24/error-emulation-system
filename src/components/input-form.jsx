/* eslint-disable react/prop-types */
import { countries } from "../App";
import { cn } from "../lib/utils";
import { CheckFilled, CheckIcon } from "./ui/icon";
import { motion } from "framer-motion";

export const Select = ({ selectedCountry, handleRegionChange }) => {
  return (
    <div className='relative'>
      <div className='flex flex-col text-sm'>
        {countries.map((country, index) => (
          <motion.div
            key={index}
            onClick={() => handleRegionChange(country.name)}
            className={cn("text-left flex gap-2 mb-2 space-x-2 cursor-pointer")}
            initial={{ opacity: 0, y: -20 }} // Example initial animation
            animate={{ opacity: 1, y: 0 }} // Example animate state
            transition={{ duration: 0.5 }} // Animation duration
          >
            <div>
              {selectedCountry === country.name ? (
                <CheckFilled className='text-black dark:text-white' />
              ) : (
                <CheckIcon className='text-black dark:text-white' />
              )}
            </div>
            <span
              className={cn(
                "text-black dark:text-white",
                selectedCountry === country.name && "dark:text-lime-500"
              )}
            >
              {country.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Slider = ({
  errorCount,
  handleSliderChange,
  handleInputChange,
}) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      {/* Slider */}
      <input
        type='range'
        min='0'
        max='10'
        value={errorCount / 100} // Scale 0-1000 value back to 0-10 range for slider
        onChange={handleSliderChange}
        className='w-1/2' // Adjust slider width as needed
      />

      {/* Number field */}
      <input
        type='number'
        min='0'
        max='1000'
        value={errorCount}
        onChange={handleInputChange}
        className='text-center border border-gray-300 rounded'
      />
    </div>
  );
};

// const InputForm = ({
//   selectedCountry,
//   handleRegionChange,
//   errorCount,
//   handleSliderChange,
//   handleInputChange,
// }) => {
//   return (
//     <form action='' method='post'>
//       <div className='w-full max-w-5xl flex items-center justify-between space-y-4'>
//         <div className='relative'>
//           <select
//             value={selectedCountry} // Set the current selected country
//             onChange={handleRegionChange} // Trigger when selection changes
//             className='
//                 w-full
//                 bg-white
//                 text-gray-700
//                 text-sm
//                 border
//                 border-gray-300
//                 rounded-lg
//                 pl-4 pr-10 py-2
//                 transition
//                 duration-300
//                 ease-in-out
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-indigo-500
//                 focus:border-indigo-500
//                 hover:border-gray-400
//                 shadow-sm
//                 cursor-pointer
//                 appearance-none'
//           >
//             <option value='' disabled className='text-gray-400'>
//               Select a Region
//             </option>{" "}
//             {/* Placeholder option */}
//             {countries.map((country, index) => (
//               <option key={index} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           <ChevronsUpDownIcon className='absolute top-3 right-2 size-4' />
//         </div>
//         <div className='flex items-center gap-4'>
//           {/* Slider */}
//           <input
//                 type='range'
//                 min='0'
//                 max='10'
//                 value={errorCount / 100} // Scale 0-1000 value back to 0-10 range for slider
//                 onChange={handleSliderChange}
//                 className='w-1/2' // Adjust slider width as needed
//               />

//           {/* Number field */}
//           <input
//             type='number'
//             min='0'
//             max='1000'
//             value={errorCount}
//             onChange={handleInputChange}
//             className='w-20 text-center border border-gray-300 rounded'
//           />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default InputForm;

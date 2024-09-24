/* eslint-disable react/prop-types */
// import { SlidersHorizontal } from "lucide-react";

// const Navbar = () => {
//   return (
//     <div className=' h-12 py-2 fixed right-0 left-0 bg-white z-10 ml-auto'>
//       <div className="flex items-center justify-end px-10">
//         <button className='px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] '>
//           <SlidersHorizontal className='size-4' />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

export function NavbarDemo({ children }) {
  return (
      <nav className='h-12 top-1 relative w-full flex items-center justify-center'>
        {children}
      </nav>
  );
}

// function Navbar({ className }) {
//   const [active, setActive] = useState(null);
//   return (
//     <div
//       className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
//     >
//       <Menu setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item='Services'>
//           {/* <InputForm
//       errorCount={errorCount}
//       handleInputChange={handleInputChange}
//       handleRegionChange={handleRegionChange}
//       handleSliderChange={handleSliderChange}
//       selectedCountry={selectedCountry}
//       /> */}
//         </MenuItem>
//         {/* <MenuItem setActive={setActive} active={active} item="Products">
//           <div className="  text-sm grid grid-cols-2 gap-10 p-4">
//             <ProductItem
//               title="Algochurn"
//               href="https://algochurn.com"
//               src="https://assets.aceternity.com/demos/algochurn.webp"
//               description="Prepare for tech interviews like never before." />
//             <ProductItem
//               title="Tailwind Master Kit"
//               href="https://tailwindmasterkit.com"
//               src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
//               description="Production ready Tailwind css components for your next project" />
//             <ProductItem
//               title="Moonbeam"
//               href="https://gomoonbeam.com"
//               src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
//               description="Never write from scratch again. Go from idea to blog in minutes." />
//             <ProductItem
//               title="Rogue"
//               href="https://userogue.com"
//               src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
//               description="Respond to government RFPs, RFIs and RFQs 10x faster using AI" />
//           </div>
//         </MenuItem> */}
//         <MenuItem
//           setActive={setActive}
//           active={active}
//           item='Pricing'
//         ></MenuItem>
//       </Menu>
//     </div>
//   );
// }

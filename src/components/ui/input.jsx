/* eslint-disable react/prop-types */

import { cn } from "../../lib/utils"



export const Input = ({ title, step, seed, setSeed, type}) => {

  return (
    <div className="flex  flex-col space-y-2 relative">
        <input 
        step={step}
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        type={type}
        placeholder={title}
        className={cn(`
        p-2
        pr-1.5
        py-1.5
        text-sm
        rounded
        ring-[1.5px]
        ring-neutral-200
        focus-visible:ring-2
        focus-visible:ring-neutral-300
        focus-visible:border-none
        focus-visible:outline-none
        transition
        z-10
        `)}
        />
        {/* <div className="h-8 fixed right-12 w-5 top-2 bg-neutral-200 opacity-50 " />
        <div className="h-8 fixed right-[60px] w-[2px] top-2  bg-neutral-300 z-10" /> */}
     </div>
  )
}

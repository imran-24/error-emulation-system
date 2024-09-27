import { Faker, en_AU, it, fr } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Table from "./components/table";
import { motion } from "framer-motion";

import * as XLSX from "xlsx";

/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);

// eslint-disable-next-line react-refresh/only-export-components
export const countries = [
  { name: "Australia", locale: en_AU },
  { name: "Italy", locale: it },
  { name: "France", locale: fr },
];

import { xoroshiro128plus } from "pure-rand";
import { Select, Slider } from "./components/input-form";
import useBottomScroll from "./hooks/use-bottom-scroll";
import { NavbarDemo } from "./components/navbar";
import { cn, getRandomNumber } from "./lib/utils";
import { Menu, MenuItem } from "./components/ui/navbar-menu";
import { ShuffleIcon } from "lucide-react";

function generatePureRandRandomizer(
  seed = Date.now() ^ (Math.random() * 0x100000000),
  factory = xoroshiro128plus
) {
  const self = {
    next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000,
    seed: (seed) => {
      self.generator = factory(typeof seed === "number" ? seed : seed[0]);
    },
  };
  self.seed(seed);
  return self;
}

const randomizer = generatePureRandRandomizer();

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(""); // Store selected country by name

  const [randomData, setRandomData] = useState([]);
  const [randomErrorData, setRandomErrorData] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState("");
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles slider change and scales it to the range 0..1000 for the input field
  const handleSliderChange = (e) => {
    const sliderValue = Number(e.target.value);
    setErrorCount(sliderValue * 100); // Scale the slider's 0-10 range to 0-1000
  };

  // Handles input field change and scales it back to 0..10 for the slider
  const handleInputChange = (e) => {
    const inputValue = Math.min(Number(e.target.value), 1000); // Ensure max is 1000
    setErrorCount(inputValue);
  };

  // Handle the change in the dropdown
  const handleRegionChange = (value) => {
    setSelectedCountry(value); // Update state with selected country name
  };

  function generateUserData(count) {
    const customLocale = {
      title: selectedCountry,
      location: {
        country: [selectedCountry],
      },
    };

    const faker = new Faker({
      locale: [customLocale, selectedLocale],
      randomizer,
    });

    for (let i = 0; i < count; i++) {
      const user = {
        id: faker.string.uuid(),
        name: (faker.person.firstName() + " " + faker.person.lastName()).toLowerCase(), // USA-specific name
        address:
          faker.location.country() +
          ", " +
          faker.location.state() +
          ", " +
          faker.location.street() +
          ", " +
          faker.location.buildingNumber(), 
        phone: faker.phone.number({ style:  Math.random() < 0.5 ? 'national' : 'international' }), 
        // email: faker.internet.email(), // Email generation
      };

      setRandomData((prev) => [...prev, user]);
    }
  }
  // Get the corresponding locale object based on the selected country
  let selectedLocale = countries.find(
    (country) => country.name === selectedCountry
  )?.locale;

  function generateXLSXFile() {
    /* fetch JSON data and parse */
    if (!randomData.length) return window.alert("Not data to generate file.");
    /* flatten objects */
    const rows = errorCount ? randomErrorData : randomData;

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["id", "name", "address", "phone"]], {
      origin: "A1",
    });

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "randomusers.xlsx", { compression: true });
  }

  function applyErrors(data, errorCount) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789"; // For phone number error generation
  
    // Helper function to get a random integer
    const getRandomInt = (max) => Math.floor(Math.random() * max);
  
    // Function to randomly delete a character
    const deleteCharacter = (str) => {
      if (str.length <= 1) return str; // Avoid deletion if it's too short
      const index = getRandomInt(str.length - 2) + 1; // Avoid start or end
      return str.slice(0, index) + str.slice(index + 1);
    };
  
    // Function to randomly add a character
    const addCharacter = (str, charSet) => {
      const index = getRandomInt(str.length - 2) + 1; // Avoid start or end
      const randomChar = charSet[getRandomInt(charSet.length)];
      return str.slice(0, index) + randomChar + str.slice(index);
    };
  
    // Function to swap nearby characters
    const swapCharacters = (str) => {
      if (str.length < 2) return str; // Avoid swapping if it's too short
      const index = getRandomInt(str.length - 2) + 1; // Avoid start or end
      return (
        str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
      );
    };
  
    // Function to apply a random error to a string
    const applyRandomError = (str, isPhone = false) => {
      const charSet = isPhone ? digits : alphabet; // Use digits for phone numbers
      const errorType = getRandomInt(3); // Randomly choose error type
      switch (errorType) {
        case 0:
          return deleteCharacter(str);
        case 1:
          return addCharacter(str, charSet);
        case 2:
          return swapCharacters(str);
        default:
          return str;
      }
    };
  
    // Apply errors to the fields, avoiding `id`
    return data.map((record) => {
      const modifiedRecord = { ...record };
  
      if (Math.random() < errorCount / 1000) {
        modifiedRecord.name = applyRandomError(modifiedRecord.name);
        modifiedRecord.address = applyRandomError(modifiedRecord.address);
        modifiedRecord.phone = applyRandomError(modifiedRecord.phone, true); // Pass true for phone
      }
  
      return modifiedRecord;
    });
  }
  

  useEffect(() => {
    if (selectedCountry && (selectedCountry || seed)) {
      randomizer.seed(Number(seed));
      setRandomData([]);
      generateUserData(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedLocale, seed]);

  useEffect(() => {
    if (errorCount > 0) {
      const data = applyErrors(randomData, errorCount);
      setRandomErrorData([...data]);
    } else {
      setRandomErrorData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCount, randomData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMoreData = () => {
    generateUserData(10);
  };

  useBottomScroll(fetchMoreData, loading, setLoading);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       setLoading(true); // Set loading state to true

  //       // Delay the triggering of the onBottomReached function
  //       setTimeout(() => {
  //         setLoading(false); // Set loading state back to false
  //         fetchMoreData();
  //       }, 3000); // 2 seconds delay
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [fetchMoreData]);

  return (
    <div className=' w-full mx-auto '>
      <div className='flex flex-col'>
        <NavbarDemo>
          <div className={cn("fixed top-0 inset-x-0  mx-auto z-50")}>
            <Menu setActive={setActive}>
              <MenuItem
                // className='px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg'
                setActive={setActive}
                active={active}
                item={selectedCountry ? selectedCountry : "Region"}
              >
                <Select
                  handleRegionChange={handleRegionChange}
                  selectedCountry={selectedCountry}
                />
              </MenuItem>
              <MenuItem
                setActive={setActive}
                active={active}
                item='Error'
                // className='px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg'
              >
                <motion.div
                  className={cn(
                    "text-left flex gap-2 mb-2 space-x-2 cursor-pointer"
                  )}
                  initial={{ opacity: 0, y: -20 }} // Example initial animation
                  animate={{ opacity: 1, y: 0 }} // Example animate state
                  transition={{ duration: 0.5 }} // Animation duration
                >
                  <Slider
                    errorCount={errorCount}
                    handleInputChange={handleInputChange}
                    handleSliderChange={handleSliderChange}
                  />
                </motion.div>
              </MenuItem>
              <MenuItem
                setActive={setActive}
                active={active}
                item='Seeder'
                // className='px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg'
              >
                <div className={"relative flex flex-col items-center gap-2"}>
                  {/* Number field */}
                  {/* <input
                    type='number'
                    min='0'
                    max='1000'
                    value={errorCount}
                    onChange={handleInputChange}
                    className='text-center border border-gray-300 rounded'
                  /> */}
                  <input
                    type='number'
                    min='0'
                    max='1000'
                    value={seed}
                    placeholder='Seed'
                    onChange={(e) => setSeed(e.target.value)}
                    className='p-2
                    border-none 
                    outline-none
                    focus-visible:ring-offset-0
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
                      z-10'
                  />
                  <div className='h-8 absolute right-9 w-[2px] top-0  bg-neutral-200 z-10' />
                  <button onClick={() => setSeed(getRandomNumber(0, 200000))}>
                    <ShuffleIcon className='size-6 text-blue-500' />
                  </button>
                </div>
              </MenuItem>
              <div className='flex items-center justify-end'>
                <button
                  onClick={generateXLSXFile}
                  className='px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] '
                >
                  Generate
                </button>
              </div>
            </Menu>
          </div>
        </NavbarDemo>

        {randomErrorData.length === 0 ? (
          <Table data={randomData} loading={loading} />
        ) : (
          <Table data={randomErrorData} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default App;

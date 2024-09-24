import { Faker, en_AU, it, fr } from "@faker-js/faker";
import "./App.css";
import { useEffect, useState } from "react";
import Table from "./components/table";
// import Loading from './components/loading';

export const countries = [
  { name: "Australia", locale: en_AU },
  { name: "Italy", locale: it },
  { name: "France", locale: fr },
];

import { xoroshiro128plus } from "pure-rand";
import { Select, Slider } from "./components/input-form";
import useBottomScroll from "./hooks/use-bottom-scroll";
import { NavbarDemo } from "./components/navbar";
import { cn } from "./lib/utils";
import { Menu, MenuItem } from "./components/ui/navbar-menu";

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

  console.log(selectedCountry);
  const [randomData, setRandomData] = useState([]);
  const [randomErrorData, setRandomErrorData] = useState([]);

  const [errorCount, setErrorCount] = useState(0);
  const [active, setActive] = useState(null);

  const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  // const [index, setIndex] = useState(2);

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
  // Custom locale configuration

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
        name: faker.person.firstName() + " " + faker.person.lastName(), // USA-specific name
        address:
          faker.location.country() +
          ", " +
          faker.location.state() +
          ", " +
          faker.location.street() +
          ", " +
          faker.location.buildingNumber(), // USA-specific address
        phone: faker.phone.number({ style: "international" }), // USA phone format
        // email: faker.internet.email(), // Email generation
      };

      setRandomData((prev) => [...prev, user]);
    }
  }
  // Get the corresponding locale object based on the selected country
  let selectedLocale = countries.find(
    (country) => country.name === selectedCountry
  )?.locale;

  function applyErrors(data, errorCount) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Helper function to get a random integer
    const getRandomInt = (max) => Math.floor(Math.random() * max);

    // Function to randomly delete a character
    const deleteCharacter = (str) => {
      if (str.length <= 1) return str; // Avoid deletion if it's too short
      const index = getRandomInt(str.length - 2) + 1; // Avoid start or end
      return str.slice(0, index) + str.slice(index + 1);
    };

    // Function to randomly add a character
    const addCharacter = (str) => {
      const index = getRandomInt(str.length - 2) + 1; // Avoid start or end
      const randomChar = alphabet[getRandomInt(alphabet.length)];
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
    const applyRandomError = (str) => {
      const errorType = getRandomInt(3); // Randomly choose error type
      switch (errorType) {
        case 0:
          return deleteCharacter(str);
        case 1:
          return addCharacter(str);
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
        modifiedRecord.phone = applyRandomError(modifiedRecord.phone);
      }

      return modifiedRecord;
    });
  }

  useEffect(() => {
    if (selectedCountry) {
      randomizer.seed(42);
      setRandomData([]);
      generateUserData(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedLocale]);

  useEffect(() => {
    if (errorCount > 0) {
      const data = applyErrors(randomData, errorCount);
      console.log(data, errorCount);
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
        {/* <InputForm 
      errorCount={errorCount}
      handleInputChange={handleInputChange}
      handleRegionChange={handleRegionChange}
      handleSliderChange={handleSliderChange}
      selectedCountry={selectedCountry}
      /> */}

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
                <Slider
                  errorCount={errorCount}
                  handleInputChange={handleInputChange}
                  handleSliderChange={handleSliderChange}
                />
              </MenuItem>
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

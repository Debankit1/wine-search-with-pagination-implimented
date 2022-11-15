import "./App.css";
import { useEffect, useState } from "react";
import { getWines } from "./services/wine";
import { Heading } from '@chakra-ui/react';
import { wineType } from "./utils/typeDefs";
import { useDispatch } from "react-redux";
import { storeWines } from "./redux/slices/wineSlice";
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';





function App() {
  const [wines, setWines] = useState<wineType[]>([]);
  const [input, setInput] = useState<string>("");
  const [searchedWines, setSearchedWines] = useState<wineType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostperPage] = useState(100);
  const dispatch = useDispatch();



  useEffect(() => {
    (async () => {
      const winesRes = await getWines();
      if (winesRes.status === 200) {
        const { data } = winesRes;
        dispatch(storeWines(data));
        setWines(data);
        setSearchedWines(data);
      }
    })();
  }, []);

  const handleSearch = (value: string) => {
    setInput(value);
    const filteredList = wines?.filter(
      (e: wineType) =>
        e.wine.toLowerCase().includes(value.toLowerCase()) ||
        e.winery.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedWines(filteredList);
  };
  const lastpostindex = currentPage * postPerPage;
  const firstpostindex = lastpostindex - postPerPage;

  const nextButtonClickHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const previousButtonClickHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };




  return (

    <div className="App">
      <Stack spacing={4}>

        <Heading as='h1' size='4xl' noOfLines={1} fontSize='50px' colorScheme='green'>🍷 WineShop 🍷</Heading>
        <Heading>Enter The Wine name to begin the search...</Heading>
      </Stack>
      <div>
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={input}
          className="search"
          placeholder="Search..."
        />
      </div>


      <ul className="wineList">
        {searchedWines.slice(firstpostindex, lastpostindex).map((e: wineType, i) => (
          <li className="flex gap-2 item" key={i}>
            <div>
              <img
                src={
                  e.image}
                alt="wine"
                className="wineImg"
              />
            </div>
            <div className="details">
              <div>
                <h2 className="heading">{e.wine}</h2>
                <p className="desc text-gray">Winery: {e.winery}</p>
              </div>
              <div>
                <div className="text-gray">Reviews: {e.rating.reviews}</div>



              </div>

            </div>
          </li>
        ))}
      </ul>
      <div>
        <Stack direction='row' spacing={4} align='center'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
            py={12}

            bgPosition='center'
            bgRepeat='no-repeat'
            mb={2}
          >
            <ButtonGroup gap='4'>
              <Button colorScheme='green' size='40px'
                disabled={currentPage === 1}
                onClick={previousButtonClickHandler}
              >
                Prev
              </Button>
              <Button colorScheme='blue' size='40px'
                disabled={currentPage === Math.ceil(wines.length / postPerPage)}
                onClick={nextButtonClickHandler}
              >
                Next
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>

      </div>
    </div>

  );
}

export default App;


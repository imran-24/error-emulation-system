import { useEffect } from 'react';

const useBottomScroll = (fetchMoreData, loading, setLoading) => {

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      // Clear any existing timeout to debounce
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        // Check if the user has scrolled to the bottom of the page
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;

        if (scrollPosition >= pageHeight - 10 && !loading) {
          setLoading(true);

          // Simulate a 3-second loading time before fetching new data
          setTimeout(() => {
            fetchMoreData(); // Fetch the next set of data
            setLoading(false); // Reset the loading state
          }, 1000);
        }
      }, 100); // Debounce by 100ms to avoid rapid firing
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMoreData, loading]);

  return { loading };
};

export default useBottomScroll;

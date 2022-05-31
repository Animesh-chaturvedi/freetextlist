import React, {useRef} from 'react'
import  styles from "./SearchBar.module.css"

function SearchBar({filterList, setPageNo,}) {
    const inputRef = useRef();
    const throttling = useRef(false);
//this function handle the search with throttle 
    const handleThrottleSearch = () => {
        setPageNo(0)
        if (throttling.current) {
          return;
        }
        // If there is no search term, do not make API call
    
        if (!inputRef.current.value.trim()) {
          return;
        }
        throttling.current = true;
        setTimeout(() => {
          throttling.current = false;
          filterList(inputRef.current.value);
        }, 1500);
      };
    
  return (
    <div className={styles.container}>
        <input
        type="text"
        ref={inputRef}
        onChange={handleThrottleSearch}
        className={styles.searchInput}
        placeholder="Search Person(first name or lasr name)..."
      />
    </div>
  )
}

export default SearchBar
import { useState, useEffect } from 'react';
import './ShoppingList.css';
import { search } from 'fast-fuzzy';

const url = 'https://fetch-me.vercel.app/api/shopping/items';

export function ShoppingList() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.data);
        setItems(data.data);

        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function fuzzySearch(event) {
    console.log(event.target.value);
    setSearchItems(
      search(event.target.value, items, { keySelector: obj => obj.name.de })
    );
  }
  function clickHandler() {
    return setIsClicked(!isClicked);
  }
  return (
    <>
      <div className="search_Bar center_flex">
        <input type="text" placeholder="search" onChange={fuzzySearch} />
      </div>
      <ul className="suggestion_List center_flex">
        {searchItems.map(item => (
          <li
            onClick={clickHandler}
            className="suggestion_List_Item center_flex "
            key={item._id}
          >
            <p>{item.name.de}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

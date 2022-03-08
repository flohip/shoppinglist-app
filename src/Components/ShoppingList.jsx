import { useState, useEffect } from 'react';
import './ShoppingList.css';
import '../utils.css';

import { search } from 'fast-fuzzy';
import { print as p } from '../utils.js';

const url = 'https://fetch-me.vercel.app/api/shopping/items';

export function ShoppingList() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [storedItems, setStoredItems] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
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

  function clickHandlerSuggestionList(item) {
    setStoredItems({ item, ...storedItems });
    p(storedItems);
  }
  function clickHandlerActiveList() {}

  return (
    <>
      {/* <h1>Shopping List</h1>
      <ul className="active_List center_flex">
        {storedItems.map(item => (
          <li
            key={item._id}
            onClick={event => clickHandlerActiveList()}
            className="active_List_Item center_flex "
          >
            <p>{item.name.de}</p>
          </li>
        ))}
      </ul> */}

      <div className="search_Bar center_flex">
        <label htmlFor="#searchBar">Was wollen sie kaufen?</label>
        <input
          id="searchBar"
          type="text"
          placeholder="Suche..."
          onChange={fuzzySearch}
        />
      </div>
      <ul className="suggestion_List center_flex">
        {searchItems.map(item => (
          <li
            key={item._id}
            onClick={() => clickHandlerSuggestionList(item)}
            className="suggestion_List_Item center_flex "
          >
            <p>{item.name.de}</p>
          </li>
        ))}
      </ul>
      <div className="inactive_List"></div>
    </>
  );
}

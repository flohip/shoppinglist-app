import { useState, useEffect } from 'react';
import './ShoppingList.css';
import { search } from 'fast-fuzzy';
import { print as p } from '../utils.js';
import { storedItems } from './localStorage.js';

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
        p(data.data);
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
  function clickHandler(event, id) {
    p('item got clicked');
    p(id);
    // const selectedIndex = event.target.options.selectedIndex;
    // console.log(event.target.options[selectedIndex].getAttribute('key'));
    const item = event.target;
    p(item);
    const itemList = storedItems.push();

    return setIsClicked(!isClicked), item;
  }
  return (
    <>
      <div className="search_Bar center_flex">
        <input type="text" placeholder="Suche..." onChange={fuzzySearch} />
      </div>
      <ul className="suggestion_List center_flex">
        {searchItems.map(item => (
          <li
            key={item._id}
            onClick={() => clickHandler(item._id, item.name.de)}
            className="suggestion_List_Item center_flex "
          >
            <p>{item.name.de}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

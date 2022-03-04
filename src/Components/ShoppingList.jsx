import { useState, useEffect } from 'react';
import './ShoppingList.css';
import { search } from 'fast-fuzzy';

const url = 'https://fetch-me.vercel.app/api/shopping/items';

export function ShoppingList() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

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
  return (
    <>
      <div className="Search_Bar">
        <input type="text" placeholder="search" onChange={fuzzySearch} />
      </div>
      <ul>
        {searchItems.map(item => (
          <li key={item._id}>{item.name.de}</li>
        ))}
      </ul>
    </>
  );
}

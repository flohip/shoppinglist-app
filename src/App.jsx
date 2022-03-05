import { useState } from 'react';
import './App.css';
import './variables.css';
import './utils.css';
import { ShoppingList } from './Components/ShoppingList.jsx';

export function App() {
  return (
    <div className="App">
      <body className="">
        <div className="active_List"></div>
        <div className="shopping_List">
          <ShoppingList />
        </div>
        <div className="inactive_List"></div>
      </body>
    </div>
  );
}

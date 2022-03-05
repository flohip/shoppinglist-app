import { useState } from 'react';
import './App.css';
import './variables.css';
import { ShoppingList } from './Components/ShoppingList.jsx';

export function App() {
  return (
    <div className="App">
      <body>
        <div></div>
        <div className="shopping_List">
          <ShoppingList />
        </div>
      </body>
    </div>
  );
}

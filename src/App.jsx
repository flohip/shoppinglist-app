import { useState } from 'react';
import './App.css';
import { ShoppingList } from './Components/ShoppingList.jsx';

export function App() {
  return (
    <div className="App">
      <div></div>
      <div className="Shopping_List">
        <ShoppingList />
      </div>
    </div>
  );
}

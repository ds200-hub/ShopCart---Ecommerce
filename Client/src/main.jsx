import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { searchContext } from './context/searchContext.jsx'


function Wrapper() {
  const [search, setSearch] = useState("");
  const [searchBtnClick, setSearchBtnClick] = useState(true);

  return (
    <>
      <searchContext.Provider value={{ search, setSearch, searchBtnClick, setSearchBtnClick}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </searchContext.Provider>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wrapper></Wrapper>
  </StrictMode>
)

import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'
import {myContext} from './Components/Context'


function App() {
  const [isDarkMode, setDarkMode] = useState(true)

  return (

      <myContext.Provider value={[isDarkMode , setDarkMode ]}>
      <div className={`bg-${isDarkMode ? "black" : "white"} duration-500 min-h-screen`}>
        <Header />
        <Outlet />
      </div>  
      </myContext.Provider>
  )
}

export default App

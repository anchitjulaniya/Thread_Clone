import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'
import {myContext} from './Components/Context'

function App() {

  const [isDarkMode, setDarkMode] = useState(true)
  const [currentUser, setCurrentUser] = useState(null || JSON.parse(localStorage.getItem('currentUser')))

  return (

      <myContext.Provider value={[isDarkMode , setDarkMode, currentUser, setCurrentUser ]}>
      <div className={`bg-${isDarkMode ? "black" : "white"} duration-500 min-h-screen`}>
        <Header />
        <Outlet />
      </div>  
      </myContext.Provider>
  )
}

export default App

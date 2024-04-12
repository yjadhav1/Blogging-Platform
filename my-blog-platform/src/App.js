import React,{useState,createContext} from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Blog from './components//Blog.js';

import './App.css';

import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import DisplayPost from './components/Displaypost.jsx';
import CreatePost from './components/CreatePost.jsx';
import HandleUser from './components/HandleUser.jsx';
import CurrentPost from './components/CurrentPost.jsx';
import Header from './components/Header.js';
import AgentComponent from './components/AgentComponent.jsx';
import CategoryList from './components/CategoryList.jsx';
import Notification from './components/notification.jsx'


export const AppContext=createContext();
function App() {
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const sections = [
    { title: 'Academic Resources', url: '/DisplayPost/filter/AcademicResources' },
    { title: 'Career Services', url: '/DisplayPost/filter/CareerServices' },
    { title: 'Campus', url: '/DisplayPost/filter/Campus' },
    { title: 'Culture', url: '/DisplayPost/filter/Culture' },
    { title: 'Local Community Resources', url: '/DisplayPost/filter/Local' },
    { title: 'Social', url: '/DisplayPost/filter/Social' },
    { title: 'Sports', url: '/DisplayPost/filter/Sports' },
    { title: 'Health and Wellness', url: '/DisplayPost/filter/Health' },
    { title: 'Technology', url: '/DisplayPost/filter/Technology' },
    { title: 'Travel', url: '/DisplayPost/filter/Travel' },
    { title: 'Alumni', url: '/DisplayPost/filter/Alumni' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query); // Update searchQuery state with the new query
  };
  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ user, setUser, type, setType, handleSearch }}>
          <Header sections={sections} title="BLOGS" />
          <Routes>
            <Route path='/' element={<Blog />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/DisplayPost'exact={false} element={<DisplayPost searchQuery={searchQuery}/>}/>
            <Route path='/DisplayPost/filter/:title' exact={true} element={<DisplayPost searchQuery={searchQuery} />} />
            <Route path='/DisplayPost/:id' exact={true} element={<CurrentPost searchQuery={searchQuery}/>} />
            <Route path='/CreatePost' element={<CreatePost />} />
            <Route path='/HandleUser' element={<HandleUser />} />
            <Route path='/AgentComponent' element={<AgentComponent/>}/>
            <Route path='/CategoryList' element={<CategoryList />} />
            <Route path='/Notification' element={<Notification />}/>
        </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

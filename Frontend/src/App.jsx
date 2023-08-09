import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import { StyledEngineProvider } from '@mui/material'
import './App.css'
import Signin from './Signin'
import Explore from './Explore'
import Profile from './Profile'
import Create from './Create'
import PostCreated from './PostCreated'
import SinglePost from './SinglePost'
import EditProfile from './EditProfile'
import UpdateProfileImage from './UpdateProfileImage'
import UserProfile from './UserProfile'
import PostWithoutDelete from './PostWithoutDelete'
import Feed from './Feed'
import Following from './Following'

function Root() {
  return (<>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create' element={<Create />} />
        <Route path='/postcreated' element={<PostCreated />} />
        <Route path='/post/:postId' element={<SinglePost />} />
        <Route path='/userpost/:postId' element={<PostWithoutDelete />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/updateprofileimage' element={<UpdateProfileImage />} />
        <Route path='/userProfile/:username' element={<UserProfile />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/following' element={<Following />} />
      </Routes> 
  
  </>
    )
}

function App(){
  return (<StyledEngineProvider injectFirst>
    <Router>
      <Root />
    </Router>
  </StyledEngineProvider>
  )
}

export default App

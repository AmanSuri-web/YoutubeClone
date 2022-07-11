import React, { useReducer,createContext } from 'react';
import {Route,Switch} from "react-router-dom"
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import About from './components/About.js'
import Note from './components/notes.js'
import Navbar from './components/Navbar.js'
import Error from './components/ErrorPage'
import Logout from './components/Logout'
import Activate from './components/Activate'
import UploadVideo from './components/UploadVideo'
import LandingPage from './components/LandingPage'
import VideoPage from './components/VideoPage'
import {initialState,reducer} from './reducer/UseReducer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import 'bootstrap';

export const UserContext = createContext();

const App=()=>{

	const [state, dispatch] = useReducer(reducer,initialState)

	return (
		<>
		<UserContext.Provider value={{state,dispatch}}>
        <Navbar/>
				<Switch>
					
					<Route exact path="/" component={Login}/>
         			<Route  path="/signup" component={Signup}/>
         			<Route exact path="/note" component={Note} />
					<Route exact path="/about" component={About} />
		  			<Route  path="/logout" component={Logout} />
					<Route  path="/authentication/activate/:token" component={Activate} />
					<Route  path="/video-upload" component={UploadVideo} />
					<Route  path="/videos" component={LandingPage} />
					<Route exact path="/video/:videoId" component={VideoPage} />
					<Route  component={Error} />

				</Switch>
		</UserContext.Provider>
				
		</>
		)
}

export default App

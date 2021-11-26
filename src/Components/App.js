
import '../styles/login.css';
import '../styles/select-mdules.css';
import Login from './Login';
import '../styles/NewProperty.css';
import '../styles/dashboard.css';
import  '../styles/sidenavnew.css';
import { useState } from 'react';
import ContextData from '../store/context-data';



function App() {
 
  const [status,setStatus] = useState(false);
  const [apikey,setAPIKey] = useState('');

  const LoginStatus = (apikey) =>{
     // setStatus(props);
      setAPIKey(apikey);
  }
 
  return (
    <>   
       <ContextData.Provider 
        value={{
        LoginStatus: LoginStatus,
         APIToken:apikey
      }
    }
      >
      <Login LoginStatus = {LoginStatus}/>
      </ContextData.Provider>
      { console.log(localStorage.getItem('APIKey'))}
  
    </>
  );
}

export default App;

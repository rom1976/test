import { useState,useEffect } from "react";
import { Form,Button,Grid, Segment,Header,Message} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import axios from "axios";

import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

const Login = (props) => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [password,setPassword] =useState('');
    const [userData,setUserData] = useState(sessionStorage.getItem("SessionUserLoginData")?JSON.parse(sessionStorage.getItem("SessionUserLoginData")):[]);
    const [message,setMessage] = useState('');
    const [userDataObj, setUserDataObj] = useState([]);
    const [sessionStrLogin, setSessionStrLogin] = useState(sessionStorage.getItem("SessionApiToken")?sessionStorage.getItem("sessionApiToken"):[]);
const enteredUserID = (e) =>{
    setUserID(e.target.value);
     console.log(userID);
}


    const LoginHandler = async (dashprops)=>{  
      localStorage.clear();
     await axios
     .post(
     "https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/LUCIDUserLogin",
     {},
     {
       auth: {
         username: userID,
         password: password,
       },
      }
     )
    .then((response) => {
     console.log(response.data);
     const data = response.data;
       if (data.errorCode===1) {
         alert(data.message);
       } 
     setUserData(response.data);
    sessionStorage.setItem('SessionUserLoginData', JSON.stringify(data));
    
      setLoggedIn(true);
      props.LoginStatus(data.response.lucidApiToken);
      console.log(userData);     
    //  props.LoginStatus(true);

    }).catch((error) => {
   //  setMessage(userData.message);
      console.log(error)
  
    });
    setMessage("Login Try");      
   }  

      const dashBoardHandler = () =>{
      setLoggedIn(false);
      props.LoginStatus(false);
      localStorage.removeItem('APIKey');
      }

   useEffect (() => {
      if (userData.message==="Success"){
        setLoggedIn(true);
       props.LoginStatus(true);
       }   
   },[setUserData,setLoggedIn]); 
   
    const LoginForm = () => (
      <>
        <Grid>
        <Grid.Row>
        <Grid.Column >
          <div style={{margin:'30px', borderBottom:' 1px solid grey',paddingBottom:'10px',width:'100%' }}>
          <Header as="h1">
          Lucid License Management
         </Header>

          </div>
        </Grid.Column>
      </Grid.Row>

        </Grid>
     
      
     
      <Grid.Row columns={3}>

          <Grid.Column >
         
          </Grid.Column>
      </Grid.Row>
      <Grid centered columns={3}>
      <Grid.Column> 
        <Header as="h2" textAlign="center">
          Login
        </Header>
        <Segment>
          <Form size="large">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="User ID"
              onChange={enteredUserID}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
    
            <Button color="blue" 
            fluid size="large"
            onClick={LoginHandler}
            >
              Login
            </Button>
          </Form>
        </Segment>
        
      </Grid.Column>
    </Grid>
    
    </>
    )



   if(loggedIn && userData.message==="Success") 
        return (
               <>
                 <BrowserRouter>
                      <Home LogOut = {dashBoardHandler} userPropsData={userData}/>
                   </BrowserRouter>
                </>
                );
            
    
    return(
        <>
           {LoginForm()}
        </>
    )
}

export default Login;
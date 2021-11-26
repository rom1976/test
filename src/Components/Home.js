import React from "react";
import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
import { Switch, Route} from 'react-router-dom'
//import { Container,Form,Row, Col,Button } from "react-bootstrap";
import { Container,Grid,Message,Icon,Loader} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import NewOrganization from "../NewOrganization"; 
import NewProperty from "../NewProperty"; 
import SelectModules from "./SelectModules"; 
import ContextData from "../store/context-data";
import DefaultUsers from "./DefaultUsers";
import LicensePreview from "./LicensePreview";
import { useDate } from "./time";


const Home = (props) =>{

      const [style, setStyle] = useState({});
      const [styleMain, setStyleMain] = useState({});
      const [openButton, setOpenButton] = useState({fontSize:'30px',cursor:'pointer', marginLeft:'25px'});
      const [date, setDate] = useState([]);
      const [menuDta, setMenuDta] = useState(sessionStorage.getItem('menudta')?JSON.parse(sessionStorage.getItem('menudta')):[]); 
      const [orgName, setOrganizationName] = useState();
      const [enteredCountry,setEnteredCountry] =useState()
      const [enteredCountryCode,setEnteredCountryCode]=useState();
      const [enteredState,setEnteredState]=useState();
      const [enteredStCode,setEnteredStCode]=useState();
      const [updateCtx,setUpdateCtx] = useState(false);
      const [propertyName,setPropertyName] = useState();
      const [selectModule,setSelectModule] = useState([]);
      const [defaultUsers,setDefaultUsers] = useState([]);
      const [adrDetails,setAdrsDetails] = useState([]);
      const [newpropertyData,setNewProperty] = useState();
      const updateTime = useDate();
      const [selectedList,selectedModuleList] = useState();
      
     // sessionStorage.setItem('menuDta', menuDta?menuDta:[]);
      const [sideNavStyle,setSideNavStyle] = useState({
                   
                   width:'260px', 
                   textAlign:'center', 
                   fontWeight:'bold',
                   backgroundColor:'rgb(11, 164, 235)',
                   color:'white',
                  });
      const [orgPadding,setOrgPadding] = useState({marginLeft:'130px'});
      const icons =['dashboard'];
      const propsArr = [adrDetails,newpropertyData,selectModule,defaultUsers];

      const userHomeData  = props.userPropsData;
      const {userName,lucidLogoUrl:logoURL, moduleName, organizationName, serverDate,userImageUrl,userType,lucidApiToken}  = userHomeData.response;
      const today = new Date(serverDate);

      const [Settings, setSettingsMenu] = useState(
           {color:'white', 
         //  marginRight:'10px',
           marginLeft:'10px',
            display:'none'} 
      );

      const [Masters,setMastersMenu] =  useState(
        {color:'white', 
        marginRight:'10px',
        marginLeft:'1px',
         display:'none'} 
   ); 


 
   const [DashBoard,setDashBoardMenu] =  useState(
    {color:'white', 
    marginRight:'10px',
    marginLeft:'1px',
     display:'none'} 
); 
 
      const openNav = () => {
     
        
          setStyle({
            width: "200px"
          })
          setStyleMain({
            marginLeft: "200px"
          })
        
          setOpenButton({opacity:0});
          setSideNavStyle({
            width:'267px',
            marginLeft:'0px', 
           textAlign:'center', 
           fontWeight:'bold',
           backgroundColor:'rgb(11, 164, 235)',
           color:'white',
          })
          setOrgPadding({marginLeft:'10px'})
          console.log(sideNavStyle);
      }

      const closeNav = () =>{
        setStyle({
            width: "0px"
          })
          setStyleMain({
            marginLeft: "0px"
          })
          setOpenButton({fontSize:'30px',cursor:'pointer',opacity:1})
          setSideNavStyle({width:'260px',color:'white', 
          textAlign:'center', fontWeight:'bold', 
           backgroundColor:'rgb(11, 164, 235)' });
          setOrgPadding({marginLeft:'130px'})
        
      }

       useEffect(()=>{
               setMenuDta(JSON.parse(sessionStorage.getItem('menuDta')));
       },[sessionStorage])
      
      const menuHandler = (props) =>{
        console.log(JSON.parse(sessionStorage.getItem('menuDta')));
       
         !sessionStorage.getItem('menuDta') && 
        setTimeout(()=>{
          sessionStorage.setItem('menuDta',JSON.stringify(props.menus));
          setMenuDta(props.menus);
        },1000);  
        }

        const selectModuleHandler = (data, list) =>{
               setSelectModule(data);
               selectedModuleList(list);
               console.log('Data received from select modules' + JSON.stringify(data));
               console.log(data);
        }

        const usersHandler = (data) =>{
          setDefaultUsers(data);
        }

        const propertyNameHandler = (formPropertyName,data) =>{ 
          setPropertyName(formPropertyName);
          setNewProperty(data);
        }
        const formDataPull = (organizationName,enteredCountry,countryCode,enteredstate,enteredstatecode,data) =>{
       setOrganizationName(organizationName);
       setEnteredCountry(enteredCountry);
       setEnteredCountryCode(countryCode);
       setEnteredState(enteredstate);
       setEnteredStCode(enteredstatecode);
       setAdrsDetails(data);//JSON.Stringify(data)
       console.log(data);
       console.log('Received Address Data' +JSON.stringify(data) );//fine
       console.log('From Home with formData - Organization Details data Object '+Object.entries(data));//fine
      } 
     useEffect(()=>{
       console.log(orgName);
       console.log(enteredCountry);
       console.log(enteredCountryCode);
       console.log(enteredState);
       console.log(enteredStCode);
       
       setUpdateCtx(true);

     },[orgName,enteredCountry,enteredCountryCode,enteredState,enteredStCode,propertyName])

     const showSubmenu = (menuStyle) =>{
      switch (menuStyle) {
        case 'Settings': 
        setSettingsMenu(
          {color:'white', 
         // marginRight:'10px',
          marginLeft:'10px',
           display: Settings.display==='none'?'block':'none'} 
        )
          break;
       case 'Masters': 
            console.log(menuStyle);
          setMastersMenu(
            {color:'white', 
            marginRight:'10px',
            marginLeft:'5px',
             display: Masters.display==='none'?'block':'none'} 
          )
         break;
         default:
          setSettingsMenu(
            {color:'white', 
            marginRight:'10px',
            marginLeft:'5px',
             display:'none'} 
          )
      
        
        }

     }

    
    return(
         <>
              <Container fluid> 
             <div className="sidenav" style={style}>
               <div className="closebtn" onClick={closeNav}>&times;</div>
               <div  className='center'><Icon name='user circle' color='white' size='big'/> </div>
               <div className='center' style={{marginLeft:'10px'}}> {userName}</div> 
               <div className='center'  style={{marginLeft:'10px',float:'left'}}> {updateTime.date} </div> 
               <div className='center'  style={{marginLeft:'10px'}}> {updateTime.time} </div> 
                
               {  menuDta &&
                 menuDta.map((menu ) =>{ 
                  
                   return(
                      <>     
                    <ul  className='center' style={{marginLeft:'10px'}}> 
                 
                   <Link key={menu} to={`/${menu.menuName}`} className='link'
                    onClick={showSubmenu.bind(this,menu.menuName)}> 
                   <Icon name='dashboard'      
                    />   {menu.menuName} 
                        </Link>   
                          <li style={ menu.menuName ==='Settings' && Settings ||
                                      menu.menuName ==='Masters' && Masters ||
                                      menu.menuName ==='DashBoard' && DashBoard 
                        }
                        
                        >
                           { menu.menus.map(item=> <Link  className='sub-menu'> {item.menuName} </Link>)} 
                          </li>  
                        </ul> 

                       </>
                   )
               
                   }
                   
                   )
                   
                   } 
              
               <div className='center'  style={{marginLeft:'10px'}} onClick={props.LogOut}>Log Out</div>
             </div>
              
             <Grid > 
       
            <Grid.Row>
             <Grid.Column width={16}>
             <div   style={{backgroundColor:'white',marginTop:'0px', zIndex:1, position:'fixed',paddingBottom:'10px',width:'100%'}}>

             
                   <div className="main" style={styleMain}>
                   <span style={openButton} onClick = {openNav} >&#9776;</span>     
                   <img src={logoURL} style={{marginLeft:'20px',marginRight:'10px'}} alt='Lucid Logo'/> 
                    <span className='orgName'>{organizationName} - {moduleName} </span>
                   </div>
                   </div>
             </Grid.Column>
             </Grid.Row> 
             </Grid>
             { updateCtx &&  
             <ContextData.Provider value={{
               CtxOrgName:orgName,
               propertyName: propertyName,
               country:enteredCountry,
              countryCode:enteredCountryCode,
              state:enteredState,
               stateCode:enteredStCode,
               APIToken: lucidApiToken,
               orgDetails:adrDetails,
               newProperty:newpropertyData,
               selectedModules:selectModule,
               defaultUsers:defaultUsers,
               selectedList:selectedList,
               dashBoStyle:sideNavStyle,
               orgPadding:orgPadding 
             }}>
             <div className="main" style={styleMain}>
             { lucidApiToken &&
             <Switch>   

                   <Route exact path="/"   render={(props) => (
                    <Dashboard {...props} APIToken={lucidApiToken} menus={menuHandler}/>
                   )}/>
                    <Route exact path="/DashBoard"   render={(props) => (
                    <Dashboard {...props} 
                     APIToken={lucidApiToken}
                     menus={menuHandler}
                     dashBoStyle={sideNavStyle}
                    />
                   )}/>
                   <Route path="/NewProperty" 
                    render={(props) => (
                      <NewProperty {...props} APIToken={lucidApiToken}
                      formPropertyNameHandler={propertyNameHandler}/>
                     )}/>
                   <Route path="/NewOrganization"
                      render={(props) => (
                        <NewOrganization {...props} APIToken={lucidApiToken} formPullData ={formDataPull}/>
                       )}/>
                   <Route path="/SelectModules" 
                        render={(props) => (
                          <SelectModules {...props} selectedModulesHandler ={selectModuleHandler} />
                         )}/>
                   <Route path="/DefaultUsers"
                      render={(props) => (
                        <DefaultUsers {...props} APIToken={lucidApiToken} defaultUsersHandler ={usersHandler} />
                       )}/>
                    <Route path="/LicensePreview" 
                      render={(props) => (
                        <LicensePreview {...props} orgDetails ={ adrDetails} newProperty={newpropertyData}
                        selectedModules ={selectModule} defaultUsers = {defaultUsers} />
                       )}/>  
                      
                    
                  
             </Switch>
              } 
               
            </div>
            </ContextData.Provider>}
            </Container>
         </>
    )
}

export default Home;
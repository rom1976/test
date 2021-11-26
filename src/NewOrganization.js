
import {useState,useEffect,useContext } from "react";
//import Uploady from "@rpldy/uploady";
//import UploadButton from "@rpldy/upload-button";

import axios from "axios";

import { useHistory} from 'react-router-dom';
import { Container,Form,Button, Accordion, Icon,Grid,Input,Loader,Image } from 'semantic-ui-react'
import {decode as base64_decode, encode as base64_encode} from 'base-64'; 
import { Link } from "react-router-dom";
import AutoCompleteCountry from "./Components/AutoCompleteCountry";
import AutoCompleteState from "./Components/AutoCompleteState";
import AutoCompleteCity from "./Components/AutoCompleteCity";
import AutoCompleteArea from "./Components/AutoCompleteArea";
import ContextData from "./store/context-data";

//import Accord from "./Components/Accord";
 
const NewOrganization = (props) =>{
              const ctx =useContext(ContextData); 
              const [xstyle,setXstyle] = useState({height:'0px'});
              const [minMaxIcon,setMinMaxIcon] = useState('[+]');
              const [organizationName,setOrganizationName]= useState('');
              const [status,setStatus]=useState('1');
              const [enteredCountry,setCountry] = useState();
              const [city,setCity] = useState();
              const [cityCode,setCityCode] = useState();
              const [enteredstate,setEnteredState] = useState();
              const [enteredstatecode,setStateCode] = useState();
              const [area,setArea] = useState();
              const [areaCode,setAreaCode] = useState();
              const [zipcode,setZipCode] = useState();
              const [contactmobile,setContactMobile]=useState('');
              const [contacttelephone,setTelphone] = useState('');
              const [countryCode,setCountryCode] = useState();
              const [countryTelephoneCode,setCountryTelephoneCode]=useState();
              const [telephoneAreaCode, setTelphoneAreaCode] = useState();
              const [emailid, setEmailID] = useState('');
              const [website,setWebsite] = useState('');
              const [AddressLine1,setAddressLine1 ] =useState('');
              const [AddressLine2,setAddressLine2 ] =useState('');
              const [AddressLine3,setAddressLine3 ] =useState('');
              const [Landmark,setLandmark ] =useState();
              const [countryMaster,setCountryMaster] = useState([]);
              const [stateMaster,setStateMaster] = useState([]);
              const [cityMaster,setCityMaster] = useState();
              const [mobileCountryCode, setMobileCountryCode] = useState(); 
              const [activeIndex,setActiveIndex] = useState(0);
              const [organizationPhoto,setOrganizationPhoto]=useState();
              const [preview, setPreview] = useState()
              let history = useHistory();
              const formImage = new FormData();
              const [imageString, setImageString] = useState(); 
              const[imageURLServer,setImageURLServer] =useState(); 
              const [fileName, setFileName] = useState();
              const [fileExt,setFileExt] = useState(); 
              const[orgDetails,setOrgDetails] = useState(sessionStorage.getItem('SessionOrgDetails') ? JSON.parse(sessionStorage.getItem('SessionOrgDetails')) : '');
              const [imageLoderToggle, setImageLoaderToggle]= useState(false); 
              
              const convertBase64 = (file) => {
                return new Promise((resolve, reject) => {
                  const fileReader = new FileReader();
                  fileReader.readAsDataURL(file)
                  fileReader.onload = () => {
                    resolve(fileReader.result);
                  }
                  fileReader.onerror = (error) => {
                    reject(error);
                  }
                })
              }
 
              const goBack = () =>{
                history.goBack();
                } 

                useEffect(() => { 
                  if (!organizationPhoto) {
                      setPreview(undefined)
                      return
                  }

                  const objectUrl = URL.createObjectURL(organizationPhoto)
                  setPreview(objectUrl);
                  setImageLoaderToggle(true);
                  console.log(organizationPhoto);
                  // free memory when ever this component is unmounted
                // return () => URL.revokeObjectURL(objectUrl)
                imageString && 
                axios.post('https://dev.lucidits.com/LUCIDAPI/V1/UploadImage',{
                   "FileName":  fileName,
                   "FileExtension": fileExt,
                   "FileData": null,
                   "ImageString":imageString
                    },{headers: { Authorization: `Bearer ${ctx.APIToken}`},
                                     "Content-Type": "application/json"
                                     }      
              ).then((response)=>{
                  console.log('uploaded the image');
                  console.log(response.data)
                  const imageUrlServer = response.data;
                  setImageURLServer(imageUrlServer);
                 
              }).catch((error)=>{
                  console.log(error);
              })
              }, [organizationPhoto, imageString]) 

                const fileHandler = async(e) =>{ 
                
                  const file = e.target.files[0];
                  const name = file.name;
                  const lastDot = name.lastIndexOf('.'); 
                  const fileName = name.substring(0, lastDot);
                  const ext = name.substring(lastDot + 1); 
                  setFileName(fileName);
                  setFileExt(ext);
                  const base64 = await convertBase64(file);
                  if (!e.target.files || e.target.files.length === 0) {
                    setOrganizationPhoto(undefined)
                    return
                } 
                    setOrganizationPhoto(file);  
                    formImage.append(
                      "myFile",file,
                      file.name
                    );
                   setTimeout(() => {
                    console.log('formData-----'+ formImage)
                   }, 500); 
    
                    let encoded = base64_encode(file);
                  // let decoded = base64_decode(encoded);
                      let formatBase64 = base64.replace("data:", "")
                      .replace(/^.+,/, "");
                      let decoded = base64_decode(formatBase64); 
                      setImageString(formatBase64); 
                      }  
            

              const handleClick = (e, titleProps) => {
                const { index } = titleProps
               // const { activeIndex } = this.state
                const newIndex = activeIndex === index ? -1 : index 
                setActiveIndex(newIndex);
              }
 
              const countryEventHandler = (e) =>{
                        setCountry( e.target.value);
 
              }

               useEffect (()=>{
                 console.log(stateMaster); 
               },[stateMaster,setCityMaster])

               useEffect (()=>{
                console.log(cityMaster);
                
              },[cityMaster]) 

               const stateHandler = (statesData,country,code,tcode)=>{
                
                setStateMaster(statesData);
                setCountry(country);
                setCountryCode(code);
                setCountryTelephoneCode(tcode);
                console.log('Country passed data to New Org'); 
              }
               
              const cityHandler = (citiesData,state,stcode) =>{
            
                 setCityMaster(citiesData);
                 setEnteredState(state);
                 setStateCode(stcode);
                 console.log('Passed Cities Data to New Org ')
                 console.log(state);
              }
              const enteredCityHandler = (city,code) =>{
              
                setCity(city);
                setCityCode(code);
              }

              const enteredAreaHandler = (area,code,areatelecode) =>{
             
                setArea(area);
                setAreaCode(code);
                setTelphoneAreaCode(areatelecode);
              }
               const formData={};
               const clearInputFieldStates =() =>{
                   
                      setOrganizationName(); 
                      setStatus(''); 
                      setImageURLServer('');
                      setCountry('');
                      setCity('');
                      setCityCode('');
                            setEnteredState();
                          setStateCode();
                           setArea();
                           setAreaCode();
                         setZipCode();
                       setContactMobile();
                           setTelphone();
                           setCountryCode();
                            setCountryTelephoneCode();
                           setTelphoneAreaCode();
                           setEmailID();
                           setWebsite();
                      setAddressLine1();
                         setAddressLine2();
                           setAddressLine3();
                          setLandmark(); 
                          setMobileCountryCode(); 
                            setOrganizationPhoto();

               } 
                  const passImageUrl = () =>{
                  
                        if(imageURLServer) return  imageURLServer.response.imageUrl;
                         else if(orgDetails.OrganizationDetails.ImageUrl) return orgDetails.OrganizationDetails.ImageUrl;
                          return(null)
                  }

              const formHandler = () =>{   
                 // console.log('Image URL from the server' + imageURLServer.response.imageUrl);
                   <Loader />
                   const v = passImageUrl();
                const OrganizationDetails ={OrganizationDetails:{ 
                    OrganizationName: organizationName? organizationName: orgDetails.OrganizationDetails.OrganizationName, 
                    ImageUrl:v, 
                    Country:enteredCountry,
                    State:enteredstate,
                    Address:{
                        AddressLine1: AddressLine1?AddressLine1:orgDetails.OrganizationDetails.Address.AddressLine1,
                        AddressLine2: AddressLine2?AddressLine2:orgDetails.OrganizationDetails.Address.AddressLine2,
                        AddressLine3: AddressLine3?AddressLine3:orgDetails.OrganizationDetails.Address.AddressLine3,
                        AreaCode: areaCode?areaCode:orgDetails.OrganizationDetails.Address.AreaCode  ,
                        AreaName: area?area:orgDetails.OrganizationDetails.Address.AreaName,
                        CityCode: cityCode?cityCode:orgDetails.OrganizationDetails.Address.CityCode,
                        CityName: city?city:orgDetails.OrganizationDetails.Address.CityName,
                        StateCode: enteredstatecode?enteredstatecode:orgDetails.OrganizationDetails.Address.StateCode,
                        CountryCode: countryCode?countryCode:orgDetails.OrganizationDetails.Address.CountryCode,
                        ZipCode: zipcode?zipcode:orgDetails.OrganizationDetails.Address.ZipCode,
                        Landmark: Landmark?Landmark:orgDetails.OrganizationDetails.Address.Landmark
                    },
                    ContactDetails:{
                        MobileCountryCode: countryTelephoneCode?countryTelephoneCode:orgDetails.OrganizationDetails.ContactDetails.MobileCountryCode,
                        MobileNo: contactmobile?contactmobile:orgDetails.OrganizationDetails.ContactDetails.MobileNo,
                        TelephoneCountryCode:countryTelephoneCode?countryTelephoneCode:orgDetails.OrganizationDetails.ContactDetails.TelephoneCountryCode,
                        TelephoneAreaCode:telephoneAreaCode?telephoneAreaCode:orgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode,
                        TelephoneNo:contacttelephone?contacttelephone:orgDetails.OrganizationDetails.ContactDetails.TelephoneNo,
                        EmailId: emailid?emailid:orgDetails.OrganizationDetails.ContactDetails.EmailId,
                        Website: website?website:orgDetails.OrganizationDetails.ContactDetails.Website
                    },
                    Status: status?status:orgDetails.OrganizationDetails.ContactDetails.Status
                 } };
                console.log(OrganizationDetails);
                props.formPullData(organizationName,enteredCountry,countryCode,enteredstate,enteredstatecode,OrganizationDetails);
                sessionStorage.setItem('SessionOrgDetails', JSON.stringify(OrganizationDetails));
                 clearInputFieldStates ();
                
                } 
              const expand = () => {
                 if (minMaxIcon === '[+]'){
                     setXstyle({ height:'100%', opacity:1})
                     setMinMaxIcon('[-]')
                 }
                 else{
                    setMinMaxIcon( '[+]')
                    setXstyle({ height:'0px', opacity:0})
                 }
               }; 
                const setOrgHandler = (e) =>{ 
                setOrganizationName(e.target.value);  
                console.log(organizationName); 
                } 
    return (
        <>
          <Container>
            <Grid>
        
            <Grid.Row columns ={1} style={{marginTop:'100px'}}>
              
              <Grid.Column width={16} textAlign='center'><h3>Create New Organization</h3></Grid.Column>
              
            </Grid.Row>
            
            <Grid.Row  columns={4}>
                <Grid.Column width={1}>
                  </Grid.Column>
                <Grid.Column width={6}> 
                <Form>
              
                <Form.Field inline
                   control={Input}
                   label='Organization Name *'
                   defaultValue={orgDetails? orgDetails.OrganizationDetails.OrganizationName :''}
                   onChange={setOrgHandler}
                 
                 />  
                 
                  <Form.Group inline >
                
                <Form.Group inline>
                 <label> Status* </label>
                 <input type="radio" id="active" name="org-status" value="1" checked ={status==='1'}
                   onChange={(e)=>{ 
                          setStatus(e.target.value);
                          console.log(e.target.value);
                        
                        }}
                    />
                 <label>Active</label>
                 <input type="radio" id="passive" name="org-status" value="0" 
                    checked ={status==='0'}
                    onChange={(e)=>{
                          setStatus(e.target.value); 
                          console.log(e.target.value);
                         
                        }}
                 />
                 <label >Passive</label>
                </Form.Group>
                
             </Form.Group>
              </Form>
                </Grid.Column>
                <Grid.Column width={1}>
                </Grid.Column>
           <Grid.Column width={4}>    
           { 
             preview ? 
            <Image rounded size='small' src={preview} alt='organization pic'/> 
      //     :orgDetails.OrganizationDetails.ImageUrl && <Image rounded size='small' src={orgDetails.OrganizationDetails.ImageUrl} alt='organization pic'/> || imageLoderToggle && <Loader active inline /> ||
           :  <i className="fa fa-picture-o" aria-hidden="true" style={{fontSize:'100px'}}></i>  
           }
           <Form.Field inline
                   control={Input}
                   type='file'
                   placeholder=''
                   onChange={fileHandler}
                 />  
            
           </Grid.Column> 
          
            </Grid.Row>
             
            <Grid.Row >
          
            <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={15} >
                  
                                                    {/*Accordion starts here */
                                                    }
                 <Accordion >
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
           <b> Address & Contact Details </b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
          <div >
              <Grid>
              <Grid.Row columns={2}> 
                  {/* Column left starts*/}
                    <Grid.Column width={5}>
                       <Form > 
                            <Grid.Row style={{marginBottom:'10px'}}> <h5> Address Details</h5></Grid.Row> 
                          
                            <Grid.Row>  
                                 <AutoCompleteCountry 
                                APIToken={props.APIToken}
                                CountryStateHandler = {stateHandler}       
                              />  
                            
                            </Grid.Row>

                          
                            
                             <AutoCompleteState  
                             APIToken={props.APIToken}
                             stateMaster ={stateMaster}
                             StateCityHandler ={cityHandler}
                             />
                             
                          
                             
                             <Grid.Row>  
                             
                            <AutoCompleteCity  
                              APIToken={props.APIToken}
                              cityHandler ={enteredCityHandler}
                              stateCode={enteredstatecode}
                              /> 
                             </Grid.Row>
                            
                             <Grid.Row>  
                          
                             <AutoCompleteArea 
                             APIToken={props.APIToken}
                             areaHandler ={enteredAreaHandler}
                             cityCode={cityCode}
  
                             />                      
                             
                             </Grid.Row>

                            <Form.Field 
                            inline 
                             control={Input}
                             defaultValue={zipcode}
                             label=' Zip Code'
                             placeholder='Zip Code'
                             onChange={ (e)=>{ setZipCode(e.target.value); console.log(zipcode); }}
                           />
                                
                    </Form>
                    </Grid.Column> 
                     {/* Column left ends*/}
                     
                      {/* Column right starts*/}
                     <Grid.Column width={6}>  
                      <Form>
                     
                   <Grid.Row  style={{marginTop:'50px'}}>
                 <h5>Outlet Address</h5>
                  
                </Grid.Row>
                <Grid.Row  style={{marginTop:'10px'}}> 
                      <Form.Group > 
                      <label></label>
                     <input 
                      defaultValue={orgDetails?orgDetails.OrganizationDetails.Address.AddressLine1:''}
                      placeholder='Address Line1'
                      onChange={ (e)=>{ setAddressLine1(e.target.value); console.log(AddressLine1); }} 
                      />
                     </Form.Group> 
                </Grid.Row>

                <Grid.Row>

                <Form.Group > 
                      <label></label>
                     <input 
                      label="" 
                      defaultValue={orgDetails? orgDetails.OrganizationDetails.Address.AddressLine2:''}
                      placeholder='Address Line2'
                      onChange={ (e)=>{ setAddressLine2(e.target.value); console.log(AddressLine2); }}  
                      />
                     </Form.Group> 
                
                </Grid.Row>
  
                <Grid.Row>
                <Form.Group > 
                      <label></label>
                     <input 
                      label="" 
                      placeholder='Address Line3'
                      defaultValue={orgDetails?orgDetails.OrganizationDetails.Address.AddressLine3:''}
                      onChange={ (e)=>{ setAddressLine3(e.target.value); console.log(AddressLine3); }}  
                      />
                </Form.Group>    
                </Grid.Row>
                <Grid.Row>
                <Form.Group > 
                      <label></label>
                     <input 
                      label="" 
                      defaultValue={orgDetails?orgDetails.OrganizationDetails.Address.Landmark:''}
                      placeholder='Land Mark'
                      onChange={ (e)=>{ setLandmark(e.target.value); console.log(Landmark); }}  
                      />
                </Form.Group>    
                </Grid.Row>



                     </Form>
                    </Grid.Column>  
                     {/* Column right ends*/}
  
       </Grid.Row>
       </Grid> 
           <Grid.Row>
              <Grid.Column> </Grid.Column>
              <Grid.Column> 
              <Grid.Row>
                <Grid.Column> <h5> Contact Details</h5></Grid.Column>
                  <Form>
                   <Form.Group inline >
                   <label style={{marginRight:'32px'}}>Contact Mobile No</label>
                     <Form.Field  width={1}> 
                       <Input  
                         defaultValue={ orgDetails?orgDetails.OrganizationDetails.ContactDetails.MobileCountryCode:countryTelephoneCode}  
                         onChange={(e)=>{setMobileCountryCode(e.target.value)}} 
                       />
                     </Form.Field>
                     <Form.Field width={5}>
                       <Input placeholder='Mobile No'  
                             defaultValue={ orgDetails?orgDetails.OrganizationDetails.ContactDetails.MobileNo:''}
                             onChange={(e)=>{setContactMobile(e.target.value)}}
                       />
                     </Form.Field> 
                   </Form.Group>
                    <Grid.Row>
                    <Form.Group inline>
                   <label>Contact Telephone No</label>
                     <Form.Field  width={1}> 
                       <Input    
                         defaultValue={orgDetails?orgDetails.OrganizationDetails.ContactDetails.TelephoneCountryCode:countryTelephoneCode}
                         onChange={(e)=>setCountryTelephoneCode(e.target.value)} 
                       />
                     </Form.Field>
                     <Form.Field width={2}>
                       <Input 
                        onChange ={(e)=>{setTelphoneAreaCode(e.target.value)}}
                       defaultValue={orgDetails?orgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode:telephoneAreaCode}
                       />
                     </Form.Field>
                     <Form.Field
                     width={3}>
                      <Input
                   onChange ={(e)=>{setTelphone(e.target.value)}}
                   defaultValue={orgDetails?orgDetails.OrganizationDetails.ContactDetails.TelephoneNo:''}
              />  </Form.Field>
               </Form.Group> 
                    </Grid.Row>
                    <Form.Group  inline >
                    <label style={{marginRight:'93px'}}> Email ID</label>
                    <Input 
                    defaultValue={orgDetails?orgDetails.OrganizationDetails.ContactDetails.EmailId:''}
                   onChange ={(e)=>{setEmailID(e.target.value)}} 
                  /> 
                </Form.Group>

                <Form.Group  inline >
                    <label style={{marginRight:'93px'}}> Website</label>
                    <Input
                      defaultValue={orgDetails?orgDetails.OrganizationDetails.ContactDetails.Website:''}
                     onChange = {(e)=>{setWebsite(e.target.value);}} /> 
                </Form.Group> 
                   </Form>         
              </Grid.Row> 
             </Grid.Column> 
  
              
            </Grid.Row>
                   
  </div>
            
          </Accordion.Content>
  
        </Accordion>
                                                                                                              {
                                                                                                                /*Accordion ends here  */
                                                                                                               }


                  </Grid.Column> 
             </Grid.Row>      
               <Grid.Row >
                    <Grid.Column width={4}>
                     <Button 
                     color='blue'
                     onClick={goBack}
                     > Go Back</Button>
                    </Grid.Column>
                   <Grid.Column width={4} floated='right'>
                   {<Link to='/NewProperty' style={{color:'white'}}><Button color='blue'  onClick={formHandler}>  Next </Button></Link>} 
                   </Grid.Column>
                  
               </Grid.Row> 
               </Grid>
          </Container>    
        </>
    )

} 

export default NewOrganization;

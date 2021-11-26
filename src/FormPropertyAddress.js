import { useState,useContext, useEffect } from "react"; 
import {Container,Grid,Form,Button, Accordion, Icon,Select, Input,Radio } from 'semantic-ui-react';
import { propTypes } from "react-bootstrap/esm/Image";
import ContextData from "./store/context-data"; 

  const FormPropertyAddress =(props) => {
       const ctx = useContext(ContextData); 
       const localStrProp = sessionStorage.getItem('newProperty')?JSON.parse(sessionStorage.getItem('newProperty')):[];
       const sessionOrgDetails = sessionStorage.getItem('SessionOrgDetails') ? JSON.parse(sessionStorage.getItem('SessionOrgDetails')):[]; 
      // const sessionProperty = sessionStorage.getItem('Sessionproperty')? sessionStorage.getItem('Sessionproperty'):[];
       const [AddressLine1, setAddressLine1] = useState( sessionOrgDetails.OrganizationDetails.Address.AddressLine1);
       const [AddressLine2,setAddressLine2] = useState( sessionOrgDetails.OrganizationDetails.Address.AddressLine2);
       const [AddressLine3,setAddressLine3] = useState(sessionOrgDetails.OrganizationDetails.Address.AddressLine3);
       const [AreaCode,setAreaCode] = useState( Number(sessionOrgDetails.OrganizationDetails.Address.AreaCode));
       const [AreaName, setAreaName] = useState(sessionOrgDetails.OrganizationDetails.Address.AreaName);
       const [CityCode, setCityCode] = useState(Number(sessionOrgDetails.OrganizationDetails.Address.CityCode));
       const [CityName, setCityName] = useState(sessionOrgDetails.OrganizationDetails.Address.CityName);
       const [StateCode,setStateCode ] = useState(Number(sessionOrgDetails.OrganizationDetails.Address.StateCode));
       const [CountryCode, setCountryCode] = useState(Number(sessionOrgDetails.OrganizationDetails.Address.CountryCode));
       const [Landmark,setLandmark] = useState(sessionOrgDetails.OrganizationDetails.Address.Landmark);
       const [ZipCode, setZipCode] = useState(sessionOrgDetails.OrganizationDetails.Address.ZipCode);
       const [Latitude, setLatitude] = useState(sessionStorage.getItem('newProperty')?localStrProp.PropertyDetails.formPropAdrsData.Address.Latitude:'');
       const [Longitude, setLongitude] = useState(sessionStorage.getItem('newProperty')?localStrProp.PropertyDetails.formPropAdrsData.Address.Longitude:'');  
       const [MobileNo, setMobileNo] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.MobileNo); 
       const[MobileCountryCode,setMobileCountryCode]=useState(sessionOrgDetails.OrganizationDetails.ContactDetails.MobileCountryCode);
       const [TelephoneCountryCode, setTelephoneCountryCode] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.MobileCountryCode);  
       const [TelephoneAreaCode, setTelephoneAreaCode] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode);  
       const [TelephoneNo, setTelphoneNo] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.TelephoneNo);  
       const [EmailId, setEmailID] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.EmailId);  
       const [Website, setWebsite] = useState(sessionOrgDetails.OrganizationDetails.ContactDetails.Website); 
         
        const [ObjPropertyAdrs,setObjPropertyAdrs] =useState([]); 

        const [activeIndex,setActiveIndex] = useState(0);
        

        const handleClick = (e, titleProps) => {
          const {index} = titleProps;

         // const { activeIndex } = this.state
          const newIndex = activeIndex === index ? -1 : index 
          setActiveIndex(newIndex);
        }
         
         useEffect(()=>{
                setObjPropertyAdrs(
                  
            {Address:{
              AddressLine1: AddressLine1,
              AddressLine2: AddressLine2,
              AddressLine3: AddressLine3,
              AreaCode: AreaCode,
                AreaName: AreaName,
                CityCode:CityCode,
                CityName:CityName ,
                StateCode: StateCode,
                CountryCode:CountryCode,
                ZipCode:ZipCode,
                Landmark:Landmark,
                Latitude: Latitude,
                Longitude: Longitude
            },
            ContactDetails:{
                MobileCountryCode: MobileCountryCode,
                MobileNo:MobileNo,
                TelephoneCountryCode:TelephoneCountryCode,
                TelephoneAreaCode:TelephoneAreaCode,
                TelephoneNo: TelephoneNo,
                EmailId:EmailId,
                Website: Website
            },
          
          }
                )
         },[AddressLine1,AddressLine2,AddressLine3,TelephoneNo,EmailId,MobileNo,Latitude,Longitude])

         useEffect(()=>{
           props.formPropertyAdrsHandler(ObjPropertyAdrs);
           console.log('Property Address');
           console.log(ObjPropertyAdrs);
         },[ObjPropertyAdrs])
   
    
    return(
      <>  
           
           {
                      /*Accordion starts here */
                    }
                  <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
           <b> Address & Contact Details </b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}> 
           <Grid>
           <Grid.Row  columns={2} style={{ paddingLeft:'50px'}}>
                  {/* Column left starts*/}
                    <Grid.Column width={6}>
                       <Form> 
                            <Grid.Row style={{marginBottom:'10px'}}> <h5> Address Details</h5></Grid.Row> 
                          
                                 <Form.Group inline>
                                 <label style={{marginRight:'20px'}}>Country</label>
                                <Input 
                                 placeholder=''
                                 defaultValue={ sessionOrgDetails.OrganizationDetails.Country} 
                               />   
                                </Form.Group> 
                            <Form.Group inline>
                            <label style={{marginRight:'38px'}}>State</label>
                            <Input 
                             placeholder=''
                             defaultValue={sessionOrgDetails.OrganizationDetails.State}
                           />        
                             </Form.Group>  
                             <Grid.Row>  
                            <Form.Group inline>
                              <label style={{marginRight:'45px'}}> City</label>
                            <Input  
                               placeholder=''
                               defaultValue={ sessionOrgDetails.OrganizationDetails.Address.CityName}
                               onChange={(e)=>{setCityName(e.target.value)}}
                             />      
                             </Form.Group>
                             </Grid.Row> 
                             <Grid.Row>  
                            <Form.Group inline> 
                              <label style={{marginRight:'40px'}}> Area</label>
                            <Input  
                                defaultValue= {sessionOrgDetails.OrganizationDetails.Address.AreaName}
                                onChange={(e)=>{setAreaName(e.target.value)}}
                              />     
                             </Form.Group>
                             </Grid.Row> 
                              <Form.Group inline>
                                <label style={{marginRight:'18px'}}>Zip Code</label>
                             <Input  
                               defaultValue={ sessionOrgDetails.OrganizationDetails.Address.ZipCode} 
                               onChange={(e)=>{setZipCode(e.target.value)}}
                             />  
                             </Form.Group> 
                             <Form.Group inline>
                             <label style={{marginRight:'20px'}}> Latitude</label>
                              <Input  
                              defaultValue={Latitude} 
                              placeholder=''   
                              onChange={(e)=>{setLatitude(e.target.value);
                                console.log(e.target.value);
                               }}
                            />  
                            </Form.Group> 
                                
                             </Form>
                    </Grid.Column> 
                     {/* Column left ends*/}
                     
                      {/* Column right starts*/}
                     <Grid.Column width={7}>  
                      <Form>
                     
                   <Grid.Row  style={{marginTop:'50px'}}>
                 <h5>Outlet Address</h5>
                  
                </Grid.Row>
                <Grid.Row  style={{marginTop:'10px'}}>
                <Form.Group >
                <Input style={{width:'250px'}}
                 defaultValue={ sessionOrgDetails.OrganizationDetails.Address.AddressLine1}
                 onChange={ (e)=>{ setAddressLine1(e.target.value); console.log(AddressLine1); }} 
               /> 
                </Form.Group>
                </Grid.Row>

                <Grid.Row>
                  <Form.Group>
                <Input  style={{width:'250px'}}
                defaultValue={ sessionOrgDetails.OrganizationDetails.Address.AddressLine2}
                onChange={ (e)=>{ setAddressLine2(e.target.value); console.log(AddressLine2); }} 
               />
               </Form.Group>
                </Grid.Row>
  
                <Grid.Row>
                  <Form.Group> 
                <Input style={{width:'250px'}}
                defaultValue={ sessionOrgDetails.OrganizationDetails.Address.AddressLine3}
                onChange={ (e)=>{ setAddressLine3(e.target.value); console.log(AddressLine3); }} 
                />
                </Form.Group> 

                </Grid.Row>
                <Grid.Row>
                  <Form.Group>
                <Input style={{width:'250px'}}
                placeholder='Land Mark'
                defaultValue={sessionOrgDetails.OrganizationDetails.Address.Landmark}
                onChange={ (e)=>{ setLandmark(e.target.value); console.log(Landmark); }} 
               /> 
               </Form.Group>
                </Grid.Row>
                <Form.Group inline >
                  <label>Longitude</label>
                <Input  style={{width:'170px'}} 
                 defaultValue={Longitude} 
                placeholder=''   
                onChange={(e)=>{setLongitude(e.target.value);
                                console.log(e.target.value);
                 }}
                />    
                </Form.Group>  
                     </Form>
                    </Grid.Column>  
                     {/* Column right ends*/} 
                <Grid.Row> 
              <Grid.Column> 
             
              
             </Grid.Column>  
            </Grid.Row> 
            
             </Grid.Row>  
            <h4>Contact Details</h4>
            <Grid.Row  style={{paddingLeft:'50px'}}>
              
              <Form>  
               <Form.Group inline > 
                       <label style={{width:'140px'}}> Contact Mobile No</label>
                       <Form.Input
                         width={3}
                         defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.MobileCountryCode}
                         id='mcountrycode'  
                         onChange={(e)=>{setMobileCountryCode(e.target.value)}}
                       /> 
                       <Form.Input placeholder='Mobile No' 
                        width={9}
                        defaultValue={ sessionOrgDetails.OrganizationDetails.ContactDetails.MobileNo}
                        onChange={(e)=>{setMobileNo(e.target.value);
                          setMobileCountryCode(document.getElementById('mcountrycode').value);
                          console.log(document.getElementById('mcountrycode').value);
                        }}
                       /> 
                   </Form.Group>
                   <Form.Group inline>   
                    
                    <label style={{width:'200px'}}>Contact Telephone No</label>
                      <Form.Input   width={3}
                      
                       defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.MobileCountryCode}
                       onChange={(e)=>{setTelephoneCountryCode(e.target.value)}}
                      />
                  
                   <Form.Input
                     width={4}
                     defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode}
                      onChange={(e)=>{setAreaCode(e.target.value)}} 
                     /> 
                   <Form.Input  
                 defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.TelephoneNo}
                 onChange={(e)=>{setTelphoneNo(e.target.value);
                  setTelephoneCountryCode(document.getElementById('mcountrycode').value); }}
            />  
             </Form.Group>     

              
             <Form.Group inline> 
             <label style={{marginRight:'95px'}}> Email ID  </label>
                  <Form.Input 
              
               defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.EmailId}
               onChange={(e)=>{setEmailID(e.target.value)}}
               /> 
               </Form.Group>
               <Form.Group inline>
                 <label style={{marginRight:'95px'}}>
                 Website
                   </label>
                 <Form.Input 
                
                  defaultValue={sessionOrgDetails.OrganizationDetails.ContactDetails.Website}
                  onChange={(e)=>{setWebsite(e.target.value)}} 
                 /> 
                </Form.Group> 

               </Form>
                    </Grid.Row> 
               
            </Grid>
          </Accordion.Content>
  
        </Accordion>

              

      </>
    )
  }

  export default FormPropertyAddress;

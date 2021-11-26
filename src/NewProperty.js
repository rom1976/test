import { useState } from "react";
import { useHistory} from 'react-router-dom'

import {Container,Grid,Form,Button, Accordion, Icon,Select, Input, GridColumn } from 'semantic-ui-react';

import { Link } from "react-router-dom";
import FormCreateProperty from './FormCreateProperty'; 
import FormPropertyAddress from "./FormPropertyAddress";
import FormPropertyReg from "./FormPropertyReg";

const NewProperty = (props) =>{ 
              const [minMaxIcon,setMinMaxIcon] = useState('[+]'); 
              const [minMaxIcon3,setMinMaxIcon3] = useState('[+]');
              const [open, setOpen] = useState(false); 
              const [open3, setOpen3] = useState(false); 
              const [enteredCountry,setCountry] = useState();
              const [city,setCity] = useState();
              const [state,setState] = useState();
              const [area,setArea] = useState();
              const [zipcode,setZipCode] = useState();
              const [contactmobile,setContactMobile]=useState();
              const [contacttelephone,setTelphone] = useState();
              const [countryCode,setCountryCode] = useState();
              const [areaCode, setAreaCode] = useState();
              const [emailid, setEmailID] = useState();
              const [website,setWebsite] = useState();
              const [AddressLine1,setAddressLine1 ] =useState();
              const [AddressLine2,setAddressLine2 ] =useState();
              const [AddressLine3,setAddressLine3 ] =useState();
              const [Landmark,setLandmark ] =useState();
              const [countryMaster,setCountryMaster] = useState([]);
              const [formPropAdrsData,setFormPropAdrsData] = useState([]);
              const [ObjFormProperty,setFormProperty]=useState([]);
              const [propStatus,setPropStatus] = useState(0);
              const [formPropRegData,setFormPropRegData] = useState([]);
              const [financialMonth,setFinancialMonth] = useState('4');
              const [startDay,setStartDay] = useState('1'); 
              let history = useHistory();

              const [activeIndex,setActiveIndex] = useState(0);
              const [activeIndex1,setActiveIndex1] = useState(0);
              
              const goBack = () =>{
              history.goBack();
              } 

              const options = [
                { key: 'jan', text: 'January', value: '1' },
                { key: 'feb', text: 'February', value: '2' },
                { key: 'mar', text: 'March', value: '3' },
                { key: 'apr', text: 'April', value: '4' },
                { key: 'may', text: 'May', value: '5' },
                { key: 'jun', text: 'June', value: '6' },
                { key: 'jul', text: 'July', value: '7' },
                { key: 'aug', text: 'August', value: '8' },
                { key: 'sep', text: 'September', value: '9' },
                { key: 'oct', text: 'October', value: '10' },
                { key: 'nov', text: 'November', value: '11' },
                { key: 'dec', text: 'December', value: '12' },
              ]
              const handleClick = (e, titleProps) => {
                const {index} = titleProps;

               // const { activeIndex } = this.state
                const newIndex = activeIndex === index ? -1 : index 
                setActiveIndex(newIndex);
              }
              
              const formPropertyHandler = (data,propStatus) =>{
                  setFormProperty(data);
                  console.log(data);
                  setPropStatus(propStatus);

              }
              const formPropertyAdrsHandler = (data) =>{
                     setFormPropAdrsData(data);
                     console.log('data received from create property Address ');
                     console.log(data);
            
              }
              
               const formPropertyRegHandler = (data) =>{
                setFormPropRegData(data);
                console.log("Data recieved from property registration form");
                console.log(data);
               }
 
              const formHandler = () =>{
             
              
               
                const formPropertyData =
                {
                PropertyDetails:{
                    ObjFormProperty,
                    formPropAdrsData,
                    Status: propStatus,
                    formPropRegData,
                    YearEndSettings:{
                        OpeningFinancialMonth: financialMonth,
                        StartDayOfTheMonth: startDay
                    }, 
                }, 
              } 
                console.log(formPropertyData);
                props.formPropertyNameHandler(ObjFormProperty.PropertyName,formPropertyData);
                sessionStorage.setItem('newProperty',  JSON.stringify(formPropertyData));
                console.log('local storage for property data updated');
                console.log(JSON.parse(sessionStorage.getItem('newProperty')));
                }
         
           

          
  
    return (
        <>
          <Container>  
                  <FormCreateProperty formPropertyHandler ={formPropertyHandler}/>  
                   
                 <FormPropertyAddress formPropertyAdrsHandler={formPropertyAdrsHandler}/>     
                 <FormPropertyReg formPropertyRegHandler={formPropertyRegHandler}/>
                  <Grid>
                               <Accordion>
                            <Accordion.Title
                              active={activeIndex === 0}
                              index={0}
                              onClick={handleClick}
                            >
                              <Icon name='dropdown' />
                             <b>Year End Settings </b>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                              <Grid>
                            <Grid.Row style={{ paddingLeft:'50px'}}>
                        <Form>
                       <Form.Group inline>
                       <Form.Field
            control={Select}
            label=' Opening Finacial Month'
            options={options}
            placeholder='April'
            defaultValue="4"
            onChange={(e,data)=>{setFinancialMonth(data.value);
            console.log(data.value); }
            }
          />     
                    <Form.Field
            control={Input}
            label='Start Day of the Month'
            options={options}
            placeholder='April'
            defaultValue="1"
            onChange={(e)=>setStartDay(e.target.value)}
          />      
          </Form.Group>
          </Form>    
           
                   </Grid.Row>
          </Grid>
        </Accordion.Content>

      </Accordion>
      </Grid>
              <Grid>
               <Grid.Row >
                    <Grid.Column width={4}>
                     <Button 
                     color='blue'
                     onClick={goBack}
                     > Go Back</Button>
                    </Grid.Column>
                   <Grid.Column width={4} floated='right'>
                   {<Link to='/SelectModules'> <Button color='blue' onClick={formHandler}>Next</Button></Link>} 
                   </Grid.Column>
                  
               </Grid.Row> 
               </Grid>
          </Container>
        </>
    )

} 

export default NewProperty; 

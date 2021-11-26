import React from "react";
import ReactDOM from 'react-dom';
import { useState,useEffect,useContext } from "react";
import {Form,Input,Radio,Container,Button, Accordion, Icon,Grid,Card } from 'semantic-ui-react';

import AutoCompletePropReg from "./Components/AutoCompletePropReg"; 

         const FormPropertyReg = (props) =>
         {  
            const localStrProp = sessionStorage.getItem('newProperty')?JSON.parse(sessionStorage.getItem('newProperty')):[];
            
            const [minMaxIcon2,setMinMaxIcon2] = useState('[+]');      
            const [open2, setOpen2] = useState(false); 
            const [enteredPropRegId,setEnteredPropRegId] =useState();
            const [enteredPropType,setEnteredPropType] = useState();
            const [enteredRegNo, setEnteredRegNo] = useState();
            const[propRegStatus,setPropRegStatus] = useState('1');
            const[cardVal,setCardVal] = useState(); 
            const[regCardRecieved,setRegCardRecieved] = useState([]);
            const[formRegData,setFormRegData]=useState(sessionStorage.getItem('newProperty')?localStrProp.PropertyDetails.formPropRegData:[]);
            const[cardRegGen,setCardRegGen] =useState(false); 
            const [activeIndex,setActiveIndex] = useState(0);

            const handleClick = (e, titleProps) => {
              const { index } = titleProps
             // const { activeIndex } = this.state
              const newIndex = activeIndex === index ? -1 : index 
              setActiveIndex(newIndex);
            }
            const PropTypeHandler = (id,type,regCard) =>{
              setEnteredPropRegId(id);
              setEnteredPropType(type);
              setRegCardRecieved(regCard);
              console.log('data recieved from AutoComplete prop reg handler -  ');
               console.log(id);
               console.log(type);
               console.log(regCard);
            }


             

             useEffect(()=>{
                   props.formPropertyRegHandler(formRegData);
                   console.log(formRegData);
             },[formRegData]); 
              const addPropRegCard = () =>{ 
                setFormRegData((prev)=>
                [...prev,
                  {   
                      "RegistrationTypeId":Number(enteredPropRegId),
                      "RegistrationNumber":enteredRegNo,
                      "Status":Number(propRegStatus)
                  }
              ]
               ); 
            } 
              const CardDisplayer = () =>{

                 return( 
                  <Card.Group itemsPerRow={6}> {
                    formRegData.map((item)=>{
                   
                  return ( <>
                    
                    <Card raised color='green'>
                    <Card.Content 
                      style={{backgroundColor:'#D5D8DC'}}
                    > 
                    <Card.Description>
                    <p>{item.RegistrationTypeId===1?'GSTN':'PAN'} -- {item.Status===1?'Active':'Passive'} </p>
                     <p>{item.RegistrationNumber} </p>
                      </Card.Description>
                      </Card.Content>
                    </Card> 
                    </> )  
                      })
                }</Card.Group>     
                );

              }
           
  
          return (
            <> 
                 <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
         <b> Propert Registration Details</b>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid>
              <Grid.Row  columns={3} style={{ paddingLeft:'50px'}}  >  
                      
                  <Grid.Column width={3}  >
                      <label>Registration Type</label>
                         <AutoCompletePropReg formDataHandler={PropTypeHandler}/>  
                   </Grid.Column>
                       
                   <Grid.Column  width={4}  > 
                      
                      <Form.Group>
                      <Form.Field
                      control={Input}
                       label='Registration Number' 
                       onChange={(e)=>{
                         setEnteredRegNo(e.target.value);
                         setRegCardRecieved(
                           (prevState)=>{ return (
                           [...prevState,{registrationNumber:e.target.value}])
                         });
                        
                        }}
                     /> 
                     </Form.Group>
                    
                  </Grid.Column>  
                  <Grid.Column width={6} >
                    <Form>
                    <label style={{width:'60px'}}>Status</label>
                  <Form.Group inline> 
                    <input 
                    type="radio" 
                    id="active" 
                    name="prop-status" 
                    value="1" 
                    checked ={propRegStatus==='1'}
                onChange={
                  (e)=>{setPropRegStatus(e.target.value); 
                  console.log(e.target.value);
                }}
                />
                <label>Active</label>
                 <input type="radio" id="passive" name="prop-status" value="0" 
                 checked ={propRegStatus==='0'}
                 onChange={(e)=>{setPropRegStatus(e.target.value); console.log(e.target.value);}}
              />
              <label>Passive</label>
              <Button color ='blue' onClick={addPropRegCard}>Add</Button> 
                       </Form.Group> 
                       </Form>
                  </Grid.Column>


                  </Grid.Row>
                  </Grid>
                  
                   <Grid.Row columns={6} style={{padding:'10px',paddingLeft:'50px', maxHeight:'100px', overflowY:'scroll', overflowX:'hidden'}}>
                   
                   
                       
                       <CardDisplayer />
                     
                    
                   </Grid.Row>
        </Accordion.Content>

      </Accordion> 
                    
          
            </>
          )
         }

         export default FormPropertyReg;

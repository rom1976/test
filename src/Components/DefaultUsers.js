import { useState,useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {Form,Input, Grid,Container, Item,Button} from 'semantic-ui-react';
import {Row, Col, } from "react-bootstrap";
import ContextData from "../store/context-data";
import { useHistory} from 'react-router-dom';

const DefaultUsers = (props) =>{ 
    const ctx = useContext(ContextData);
    const sessionOrgDetails = sessionStorage.getItem('SessionOrgDetails') ? JSON.parse(sessionStorage.getItem('SessionOrgDetails')):[];
    const [orgName,setOrgName] = useState(sessionOrgDetails.OrganizationDetails.OrganizationName);
    const[suffix,setSuffix] = useState(); 
    const[lucidAdminPassword,setLucidAdminPassword] =useState();
    const[adminPassword,setAdminPassword] =useState();
    const[userPassword,setUserPassword] =useState();
    let history = useHistory();
   
    const goBack = () =>{
      history.goBack();
      } 
 
    const formHandler = () =>{
        const DefaultUsers=[
          {
              "UserId":'Lucidadmin@'+suffix,
              "Password": lucidAdminPassword
          },
          {
            "UserId": ' Admin@'+suffix,
            "Password": adminPassword
           },
           {
            "UserId": ' User@'+suffix,
            "Password": userPassword
           }, 
      ];
      props.defaultUsersHandler(DefaultUsers);
      localStorage.setItem('defaultUsers', JSON.stringify(DefaultUsers)); 
    }

    return( 
      
      <>   <Container>
           <Grid style={{marginTop:'100px'}} > 
        
             <Grid.Row textAlign="centered">  
              <h3> Default Users</h3> 
            </Grid.Row>  
               
            <Grid.Row columns={1}> 
                   <Grid.Column width={10}>
                   <Form>
                   <Form.Group inline >
                   <Form.Field width={3}>
                   <label>Organisation Name </label>
                   </Form.Field>
                     <Form.Field  width={10}> 
                       <Input 
                         control={Input} 
                         defaultValue={orgName} 
                     
                         readOnly 
                       />
                     </Form.Field>
                     </Form.Group> 

                     <Form.Group inline >
                       <Form.Field width={3} >
                   <label >Property Name * </label>
                       </Form.Field>
                     <Form.Field  width={10}> 
                       <Input 
                         control={Input} 
                         defaultValue={ctx.propertyName} 
                         placeholder= {ctx.propertyName} 
                         readOnly 
                       />
                     </Form.Field>
                     </Form.Group>  
                 
                    </Form>    
                    </Grid.Column>
                   
            </Grid.Row> 
                 
            <Grid.Row columns={2}>

                    <Grid.Column width={5}>{
                                        /*First Column*/ 
                                    }         
                   <Form>
                     <Form.Group inline>
                       <label style={{width:'79px'}}></label>
                       <Form.Input
                         placeholder="[User ID Suffix]"
                         onChange={ (e)=>setSuffix(e.target.value)}
                       />  
                      </Form.Group> 
                      <Form.Group inline>
                       <label>  Lucidadmin@</label>
                       <Form.Input
                         readOnly
                         defaultValue={suffix} 
                       />  
                      </Form.Group> 
                      <Form.Group inline>
                       <label style={{marginRight:'40px'}}>  Admin@</label>
                       <Form.Input
                         readOnly
                         defaultValue={suffix} 
                       />  
                      </Form.Group> 
                      <Form.Group inline>
                       <label style={{marginRight:'50px'}}>  User@</label>
                       <Form.Input
                         readOnly
                         defaultValue={suffix} 
                       />  
                      </Form.Group>   
                   </Form> 
                    </Grid.Column> 
                    <Grid.Column width={7}>{
                                        /*Second Column*/ 
                                    }
                       <Form>   
                        

                         <Form.Group style={{marginTop:'30px'}}>
                       
                       <Form.Input
                        label='Password'
                        onChange={(e)=>setLucidAdminPassword(e.target.value)}
                       />  
                   
                        </Form.Group>
                        <Form.Group>
                       <Form.Input 
                        onChange={(e)=>setAdminPassword(e.target.value)}
                      />
                        </Form.Group>
                        <Form.Group>
                       <Form.Input 
                        onChange={(e)=>setUserPassword(e.target.value)}
                      />
                     
                      </Form.Group>
                      </Form>          

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
                   {<Link to='/LicensePreview'> <Button color='blue' onClick={formHandler}>Next </Button></Link>} 
                   </Grid.Column>
                  
               </Grid.Row> 
               </Grid>  
               </Container>
      </>
    )
   }

   export default DefaultUsers;
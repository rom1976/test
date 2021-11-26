import React,{useState, createRef} from 'react'
import { Grid,Card,Container,Sticky,Segment } from 'semantic-ui-react';

const NewDashBoard = (props) =>{

    // const [dashboardData,setDashBoardData] = props

    return(
          <>

               <Card.Group itemsPerRow={4} style={{marginTop:'100px', position:'fixed', zIndex:'1'}}>
               <Card raised style={{backgroundColor:'lightblue'}}>
               New Properties<br/>
                        {
                       props.dashBoardData.response.newProperties
                       }
                 </Card>
                 <Card raised>
               New Properties<br/>
                        {
                       props.dashBoardData.response.newProperties
                       }
                 </Card>
                 <Card raised>
               New Properties<br/>
                        {
                       props.dashBoardData.response.newProperties
                       }
                 </Card>
                 <Card raised>
               New Properties<br/>
                        {
                       props.dashBoardData.response.newProperties
                       }
                 </Card>
 
                </Card.Group>
          { 
             
          
            props.dashBoardData.response &&  
          
           
            <Grid.Row className="row-org" columns={4} >
                    
                   <Grid.Column width={3}
                   >
                        <div className='grid-col' key='nooforg' >   
                        Organisations <br/>
                         {
                       props.dashBoardData.response.noOfOrganizations
                        }     
                     </div>
                    </Grid.Column>
                    <Grid.Column width={3}
                   >
                         <div  key='newOrg' className='grid-col' style={{marginLeft:'170px'}}>
                     
                     New Organisation<br/>
                     { 
                    props.dashBoardData.response.newOrganizations
                    }
                  
                  </div>  
                    </Grid.Column>
                    <Grid.Column width={3}
                   >
                       <div key='Property' className='grid-col' style={{marginLeft:'270px'}}>
                      
                      Properties<br/>
                      {
                    props.dashBoardData.response.noOfProperties
                     }
                   
                   </div>
                        
                    </Grid.Column>
                    <Grid.Column width={3}
                   >
                     
                     <div width={2} key='newProp' className='grid-col' style={{marginLeft:'310px'}}>
                        
                        New Properties<br/>
                        {
                       props.dashBoardData.response.newProperties
                       }
                   
                     </div> 
                    </Grid.Column>  
                 </Grid.Row>
       
                 } 
                
                
     
  
  
    
    </>
    )


    
}
export default NewDashBoard;

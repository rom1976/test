import { useState,useEffect } from "react";
import { Container,Button,Grid,Table,Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const Result = (props) => {
 const [resultData,setResultData] = useState(props.data);

 if( props.data.message==="Success" ) {
    return(
        <>
        <Container>
             <Grid>
                 <Grid.Row>
                     <Grid.Column>
                      
                         {console.log(props.data)}
                        { 
                         <h4> <span style={{color:'green'}}>License created successfully</span></h4>   

                        } 
                        <h5>
                            Organization Created
                        </h5>
                        <h5>
                            Property Created
                        </h5>
                        <h5>
                            Assign Modules
                        </h5>
                        <h5>
                            Property Default Values Assigned
                        </h5>   
                        <h5>
                            Accounting Date Configured
                        </h5> 
                        <h5>
                            Default User Group Created
                        </h5> 
                        <h5>
                            Default Users Created
                        </h5> 

                     </Grid.Column>
                 </Grid.Row>
                 <Grid.Row >
               
                   <Grid.Column width={4} floated='right'> 
                   <Link  to='/'> <Button color='blue' onClick={localStorage.removeItem('orgDetails')}>Finish </Button></Link>
                   </Grid.Column>
                  
               </Grid.Row>
             </Grid>
        </Container>
        </>
    )}else{

        return(
            <>
            
                <h4>{props.data.response.message}</h4>
            
            </>
        )
    }


}

export default Result;

import {Grid,Form} from 'semantic-ui-react';
import { Container,Row,Col } from "react-bootstrap";


const SelectFeaturesModules = (props) =>{
     
    return(
        <>
          <Grid.Row>  {/*Features header and search starts here*/}
               
               <Col md='4'> Features Of Online Orders ({ 
                            props.selectModule && props.selectModule.map((item=>{
                              if (item.features.length >0) return item.features.length;    
                            }
                              ))
                              } )</Col>
               <Col md="3">
               <Form.Field type='text'  placeholder='' />
              </Col>
                </Grid.Row>     {/*Features header and search ends here*/}                             
                      <Grid.Row >   {/*Features div starts here*/}
                    <Col md='1' > </Col>
                     <Col md='10' className='mb-2 sm-module'>
                      {  props.selectModule && props.selectModule.map((item)=>{
                     return <>
                                 {item.features.map((item)=>{ 
                                   return(
                                     <>
                                        
                   <div className='sm-card' style={{float:'left'}} key={Math.random().toString()}>
                                             <Col md='5' className='txt '>{item.featureName}</Col>
                                             <Col md='5' className='sel-check'>
                                             <input style={{align:'right'}}
                                             type="checkbox"
                                             id={item.featureName.toString()}
                                             value={item.featureName} 
                                             onChange={props.featureHandler}
                                            />  
                   </Col>
                   </div>

                                     </> 
                                   ) 
                                 })}

                   
                   </>
                      })
                    }

                 </Col> 
               </Grid.Row>      {/*Features div ends here*/} 
        </>
    )


}

export default SelectFeaturesModules;

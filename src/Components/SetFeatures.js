 import {useState,useEffect } from "react";


const SetFeatures = (props) =>{ 
  const [features, Features] = useState();


   console.log('From set features Component'+props.featureEbill, props.featurePOSSync);
   useEffect( ()=>{
        Features( ()=>{
            return(
                <li style={{listStyle:'none'}}> Features
                     <ul>
                       {props.featureEbill &&
                          <li> {props.featureEbill} </li>
                       }
                       { props.featurePOSSync &&
                         <li>{props.featurePOSSync}</li>
                       }
                   
                     </ul> 
             </li>
            )
        }

        )
   },[Features])
   
     
        return(
          <>  
               
            
          </>
        ); 
}

export default SetFeatures;
 
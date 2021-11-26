import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';  
import {Form,Input} from 'semantic-ui-react';
import ContextData from "../store/context-data";
const AutoCompletePropReg = (props) =>{
    const ctx = useContext(ContextData);
    const [propertyRegMaster,setPropertyRegMaster] = useState([]);
    const [Loader,setLoader] = useState(false);
    const[autoCompStyle,setAutoCompStyle] = useState({display:'block'});
    const [propRegID,setEnteredPropRegCode] = useState();
    const[enteredPropType,setEnteredPropType] =useState();
    const [searchTerm,setSearchTerm] = useState(''); 
    const [cardReg, setCardReg] = useState([{
      enteredPropRegCode:'',
     enteredPropType:'' 
    }]); 
    
useEffect (()=>{
              
      axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetRegistrationTypeList',{
      headers: { Authorization: `Bearer ${ctx.APIToken}`}})
      .then((response)=>{
      console.log(response.data);
      setPropertyRegMaster(response.data);
      setLoader(true);
      }).catch((error)=>{
        console.log(error);
      });
  },[setPropertyRegMaster,ctx.APIToken]);

   useEffect(()=>{ 
    props.formDataHandler(propRegID,enteredPropType, cardReg);
    console.log('Called Property Reg Data handler .. see below '); 
   },[propRegID,enteredPropType,cardReg])


if(Loader) {
             
  return(
     <div>
              <Form.Input 
                    placeholder="GSTIN or PAN" 
                    value={searchTerm} 
                    onChange={(e)=> {
                   setSearchTerm(e.target.value);  
                   setAutoCompStyle({display:'block',position:'absolute',margin:'0px',padding:'0px'}); 
             }} 
              />   
              
                   {
                       Loader &&  
                          propertyRegMaster.response.registrationTypes    
                          .filter((val) => { 
                            if (searchTerm === "") { 
                              return;
                            } else if (
                              val.registrationTypeName.toLowerCase().includes(searchTerm.toLowerCase())
                            ) { 
                             
                              return val;
                            
                            }
                          })
                          .map((post, key) => {
                          
                            return ( 
                              <div  key={key}   style={autoCompStyle}>
                                <div
                              
                                onClick={(e)=>
                                  { 
                                   setSearchTerm(e.target.innerText);
                                   setAutoCompStyle({display:'none'})
                                   setEnteredPropRegCode(post.registrationTypeId);
                                   setCardReg((prevState)=>[...prevState, {enteredPropRegCode:post.registrationTypeId}]);
                                   setEnteredPropType(e.target.innerText);
                                   setCardReg((prevState)=>[...prevState, {enteredPropType:e.target.innerText}]);
                                   console.log(post.registrationTypeId);
                                   console.log(e.target.innerText);
                                    }}><p>
                                   {post.registrationTypeName} </p>
                                   </div>
                              </div>
                            );
                          })
                         } 
     </div>

  )}
  else{ return ( <>
          Loading...
          </>
  );
  } 
}

export default AutoCompletePropReg;
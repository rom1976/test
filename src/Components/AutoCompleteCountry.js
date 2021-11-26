
import React, {useState,useEffect} from 'react';
import axios from 'axios';  
import {Form,Input, Grid} from 'semantic-ui-react';



const AutoCompleteCountry = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryMaster,setCountryMaster] = useState([]);
  const [Loader,setLoader] =useState(false);
  const[autoCompStyle,setAutoCompStyle] = useState();
  const [countryCode,setCountryCode] =useState('');
  const [countryTelephoneCode,setCountryTelephoneCode] = useState();
  const [stateMaster, setStateMaster] = useState([]);
  const [enteredCountry,setEnteredCountry] = useState(); 
  const [stateToggle,setStateToggle] = useState(false);
 
  
  useEffect (()=>{
              
    axios.get('https://dev.lucidits.com/LUCIDAPI/V1/GetCountryList',{
      headers: { Authorization: `Bearer ${props.APIToken}`}})
      .then((response)=>{
      console.log(response.data);
      setCountryMaster(response.data);
      setLoader(true);
      }).catch((error)=>{
        console.log(error);
      });
  },[setCountryMaster,props.APIToken])

      useEffect( ()=>{
        countryMaster.countries &&
        countryMaster.countries
         .map((item)=>{
         if( enteredCountry === item.countryName ){
      setCountryCode(item.countryCode);
      setCountryTelephoneCode(item.telephoneCode);
    }
    
    
    })

         
    axios.get('https://dev.lucidits.com/LUCIDAPI/V1/GetStateList?CountryCode=1',{
      headers: { Authorization: `Bearer ${props.APIToken}`}})
      .then((response)=>{
      console.log(response.data);
      setStateMaster(response.data);
      console.log('stateMaster updates as showing above'); 
      
    
      }).catch((error)=>{
        console.log(error);
      });


  },[enteredCountry]) 

    useEffect(()=>{
     
      props.CountryStateHandler(stateMaster,enteredCountry,countryCode,countryTelephoneCode);
      console.log('Called from useEffect - Country');
      console.log('entered Country details -------'+ enteredCountry,countryCode, countryTelephoneCode ); 
    },[stateMaster,enteredCountry,countryCode]);
 
      const searchHandler = (e) =>{   
                 setSearchTerm(e.target.value);  
                  setEnteredCountry(e.target.value);    
      }

 if (Loader){
 
  return (
           <>   
                
               <Form.Group inline>
             
              <label>Country</label>
             <Input list="browsers1" name="browser1" id="browser1" 
               onChange=
                { searchHandler 
                  }
               />
             <datalist id="browsers1">
    
           {   countryMaster.countries &&
                countryMaster.countries
                  .filter((val,id) => {
                    if (searchTerm === "") { 
                      return <span key={id}> </span>;
                    } else if (
                    val.countryName.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ) {  
                      return   <span key={id}>{val} </span>
                    }
                  })
                  .map((post,idx) => {  
                     
                    return ( 
                      <>
                     
                      <option key={idx} value={post.countryName}  
                      //  onClick={
                     //     searchHandler
                      //  }
                       
                     />       
                    </>
                    );
                     
                  }) 
 
            
                 }
 
  </datalist>
  </Form.Group>

        
             
     </>
  )}
  else{
    return(
    <>
     'Loading...'
    </>
    )
  }
  }
 
export default AutoCompleteCountry;

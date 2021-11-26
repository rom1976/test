
import React, {useState,useEffect} from 'react';
import axios from 'axios';  
import {Form,Input} from 'semantic-ui-react';

  const AutoCompleteCity = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [Loader,setLoader] =useState(false);
  const[autoCompStyle,setAutoCompStyle] = useState({display:'block'});
  const[cityMaster,setCityMaster] = useState([]);
  const[cityCode,setCityCode] = useState();
  const [enteredCity,setEnteredCity] = useState();
   
  useEffect(()=>{
    console.log('State Code ===='+ props.stateCode)
    axios.get('https://dev.lucidits.com/LUCIDAPI/V1/GetCityList',{
      params: {
        'StateCode': props.stateCode, 
      }, 
      
        headers: { Authorization: `Bearer ${props.APIToken}`}},)
        .then((response)=>{
        console.log(response.data);
        setCityMaster(response.data);  
        }).catch((error)=>{
          console.log(error);
        });
 },[setCityMaster,props.stateCode]);
   
  useEffect (()=>{
    cityMaster.cities &&
    cityMaster.cities.map((item)=>{
      enteredCity === item.cityName &&
      setCityCode(item.cityCode);  
      console.log( item.cityName,item.cityCode);
    })

  },[enteredCity])

  useEffect(()=>{
    props.cityHandler(enteredCity,cityCode);
    console.log('Passing entered city details ---'+ enteredCity, cityCode);

  },[enteredCity,cityCode])


 
  return (
           <>
      
               <div> 
               <Form.Group inline>
               <label style={{marginRight:'37px'}}> 
                City
              </label>
                
    <Input
     list='cities'
    placeholder='Choose City...' 
       onChange={(e)=> {
        setSearchTerm(e.target.value);  
         //  setCityCode(post.cityCode);
           setEnteredCity(e.target.value);
           //setCityCode(post.cityCode); 
      }} 
    />
    <datalist id='cities'> 
    {  cityMaster.cities &&
                  cityMaster.cities    
                  .filter((val) => {
                    
                    if (searchTerm === "") { 
                      return;
                    } else if (
                      val.cityName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) { 
                      
                      return val;
                    
                    }
                  })
                  .map((post, key) => {
                  
                    return ( 
                      <option key={post.cityName.toString()
                      } value={post.cityName}  
                      >  
                      </option>
                    );
                  })
                 }
    </datalist>
    </Form.Group>
            </div>
             
     </>
  )}
   
  
  
export default AutoCompleteCity;

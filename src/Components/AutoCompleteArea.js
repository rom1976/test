
import React, {useState,useEffect} from 'react';
import axios from 'axios';  
import {Form,Input} from 'semantic-ui-react';

  const AutoCompleteArea = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [Loader,setLoader] =useState(false);
  const[autoCompStyle,setAutoCompStyle] = useState({display:'block'});
  const[areaMaster,setAreaMaster] = useState([]);
  const [enteredArea,setEnteredArea] = useState();
  const [enteredAreaCode,setEnteredAreaCode] = useState();
  const [areaTelephoneCode,setAreaTelephoneCode] = useState();
                         
  useEffect(()=>{
    axios.get('https://dev.lucidits.com/LUCIDAPI/V1/GetAreaList',{
      params: {
        'CityCode': props.cityCode, 
      }, 
        headers: { Authorization: `Bearer ${props.APIToken}`}},)
        .then((response)=>{
        console.log(response.data);
        setAreaMaster(response.data);  
        setLoader(true);
        }).catch((error)=>{
          console.log(error);
        });
 },[setAreaMaster,setLoader,props.cityCode]);


     useEffect (()=>{
      areaMaster.areas &&
      areaMaster.areas.map((item)=>{
        enteredArea === item.areaName &&
        setEnteredAreaCode(item.areaCode);
        setAreaTelephoneCode(item.telephoneCode);
      })
     },[enteredArea])

     useEffect(()=>{
      props.areaHandler(enteredArea,enteredAreaCode,areaTelephoneCode);
      console.log('states area before props passing data - ' + enteredArea, enteredAreaCode, areaTelephoneCode);
     },[enteredAreaCode,enteredArea,areaTelephoneCode])
 
  if(Loader) {
  return ( 
           <> 
               <div>
               <Form.Group inline>
               <label style={{marginRight:'35px'}}>
                 Area
                </label>     
    <Input
     list='areas'
    placeholder='Choose areas...'
    
       onChange={(e)=> {
        setSearchTerm(e.target.value)
         //  setAreaCode(post.areaCode);
           setEnteredArea(e.target.value);
         //  setEnteredAreaCode(post.areaCode);
            console.log(e.target.value);
            console.log('area list working');
            }}
    />    <datalist id='areas'>
               {  areaMaster.areas &&
                  areaMaster.areas    
                  .filter((val) => { 
                    if (searchTerm === "") { 
                      return;
                    } else if (
                      val.areaName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) { 
                     
                      return val;
                    
                    }
                  })
                  .map((post, key) => {
                  
                    return ( 
                      <option key={post.areaName.toString()
                      } value={post.areaName}  
                      
                      >
                      </option>  
                    );
                  })
                 } 
          
            </datalist>
    </Form.Group> 
            </div>
             
     </>
  )} else {return 'Loading..' };

}
   
  
  
export default AutoCompleteArea;
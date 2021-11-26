
import React, {useState,useEffect} from 'react';
import {Form,Input} from 'semantic-ui-react';
const AutoCompleteState = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const[ stateMaster,setMaster] = useState();
  const [Loader,setLoader] =useState(false);
  const[autoCompStyle,setAutoCompStyle] = useState({display:'block'});
  const[cityMaster,setCityMaster] = useState();
  const[stateCode,setStateCode] = useState();
  const[enteredstate,setEnteredState] = useState();
  
  
  useEffect(()=>{
     props.stateMaster.states &&
      setMaster(props.stateMaster);
      setLoader(true);
    
  },[Loader, stateMaster]);

  useEffect(()=>{
    props.stateMaster.states &&
    props.stateMaster.states.map((item)=>{
      enteredstate === item.stateName &&
      setStateCode(item.stateCode);
    })
  },[enteredstate])

    useEffect(()=>{

    props.StateCityHandler(cityMaster,enteredstate,stateCode);
    console.log('Called from useEffect- enteredstate');
    console.log(enteredstate,stateCode );
  },[cityMaster,enteredstate,stateCode]);
   
  return (
           <>  
             <Form.Group inline > 
             <label style={{marginRight:'30px'}}>State</label>
            <input list="browsers" name="browser" id="browser" style={{width:'185px'}}
               onChange={(e)=>{ 
                 
                 setSearchTerm(e.target.value);  
                setEnteredState(e.target.value);
                 console.log('i am from onchange option state'+e.target.value); 
                 
                  }}
            
            />
            <datalist id="browsers">
              
              
              {  props.stateMaster.states &&
               props.stateMaster.states
                  .filter((val) => {
                    
                    if (searchTerm === "") { 
                      return;
                    } else if (
                      val.stateName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) { 
                     
                      return val;
                    
                    }
                  })
                  .map((post,idx) => {  
                  
                    return ( 
                      <>  
                      <option id ={idx} value={post.stateName} 
                      />   
                    </>
                    );
                     
                  }) 
 
            
                 }
            </datalist> 
         </Form.Group>
     </>
    
  )

}

  
  

 
export default AutoCompleteState;

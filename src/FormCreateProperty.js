import { useState,useContext, useEffect } from "react";
import ContextData from "./store/context-data";
import {Container,Grid,Form,Button, Accordion, Icon,Select, Input,Radio,Label,Image} from 'semantic-ui-react';
const FormCreateProperty = (props) =>{
     const {...sessionOrgDetails} = sessionStorage.getItem('SessionOrgDetails') ? JSON.parse(sessionStorage.getItem('SessionOrgDetails')):[];
     const localStrProp = sessionStorage.getItem('newProperty')?JSON.parse(sessionStorage.getItem('newProperty')):[];
     console.log('local storage for property data updated')
    // console.log(JSON.parse(localStorage.getItem('newProperty')));
  //  console.log(localStrProp);
     console.log('Session prop Details');
   //  console.log(propertySession);
    const ctx = useContext(ContextData); 
    const [orgName,setOrgName] = useState(ctx.CtxOrgName?ctx.CtxOrgName:sessionOrgDetails.OrganizationDetails.OrganizationName)
    const [propertyName,setPropertyName] = useState(sessionOrgDetails.OrganizationDetails.OrganizationName);
    const [shortName,setShortName] =useState();
    const [imgURL, setImgURL] = useState(sessionOrgDetails.OrganizationDetails.ImageUrl);
    const [propStatus,setPropStatus] = useState('1');
    const [propertyPhoto, setPropertyPhoto] = useState();
  
    
    const [ObjFormProp,setObjFormProp]=useState({
      PropertyName:'',
      ShortName:'',
      ImageUrl:'',
    })
   
    const fileHandler = async(e) =>{
      const file = await e.target.files[0];
      if (!e.target.files || e.target.files.length === 0) {
        setPropertyPhoto(undefined)
        return
    } 
      setPropertyPhoto(file); 
        console.log(file); 
      
    }

    useEffect(() => {
    
      if (propertyPhoto) {
      const objectUrl = URL.createObjectURL(propertyPhoto)
      setImgURL(objectUrl)
      console.log(propertyPhoto);
    }
     
      // free memory when ever this component is unmounted
    //  return () => URL.revokeObjectURL(objectUrl)
  }, [propertyPhoto])
       
   // props.formPropHandler(ObjFormProp);
   // console.log(ObjFormProp);
   useEffect(()=>{ 
     propertyName &&
    setObjFormProp({
      PropertyName:propertyName,
      ShortName:shortName,
      ImageUrl:imgURL,
    })

   },[propertyName,shortName,imgURL])
 
    useEffect(()=>{
        const property ={...ObjFormProp,Status:propStatus}
       sessionStorage.setItem('sessionProperty',JSON.stringify(property));
        console.log('Propert updated Object with staus');
        console.log(property);
     
        props.formPropertyHandler(ObjFormProp,propStatus);
   
    },[ObjFormProp,propStatus])
   
     

    return(
      <>    
              <Grid>

            
             <Grid.Row columns={1} style={{marginTop:'100px'}}>
             
              <Grid.Column  textAlign='center' width={16} ><h3>Create Property</h3></Grid.Column>
              
            </Grid.Row>
            
            <Grid.Row columns={3}>
            <Grid.Column width={6}>  {/*First Col diviison starts */}
            <Grid.Row>
            
               
              <Form>
                 <Form.Group inline>
                 <label>Organization Name</label>
                 <Form.Field
            control={Input}
             
            readOnly 
            defaultValue={orgName} 
            
            width={10}
          /></Form.Group>
           <Form.Group inline>
             <label style={{marginRight:'30px'}}>Property Name *</label>
           <Form.Field
                 control={Input}  
                 defaultValue={propertyName} 
                 onChange={(e)=>setPropertyName(e.target.value)}
                 width={10} 
               />  
               </Form.Group>

               <Form.Group inline>
             <label style={{marginRight:'57px'}}>Short Name</label>
           <Form.Field 
               control={Input}  
               onChange={ (e)=>{setShortName(e.target.value);
               console.log(e.target.value); }}
               width={10} 
               defaultValue={shortName}
           />
           </Form.Group>
           <Form.Group inline>
            <label style={{width:'100px'}}>Status</label>
       
          <input type="radio" id="active" name="prop-status" value="1" checked ={propStatus==='1'}
                   onChange={(e)=>{setPropStatus(e.target.value); console.log(e.target.value);}}
                   />
            <label>Active</label>
                 <input type="radio" id="passive" name="prop-status" value="0" 
                    checked ={propStatus==='0'}
                    onChange={(e)=>{setPropStatus(e.target.value); console.log(e.target.value);}}
                 />
                 <label>Passive</label>
        </Form.Group>
            </Form> 
                </Grid.Row>
            </Grid.Column>                                           {/*First Col diviison starts */}
            <Grid.Column width={3} >

            </Grid.Column>
            <Grid.Column width={4} >
              {     
           imgURL ? <Image rounded size='small' src={imgURL} alt='organization pic'/> :
            <i className="fa fa-picture-o" aria-hidden="true" style={{fontSize:'100px'}}></i> 
            
            }
             <Form.Field inline
                   control={Input}
                   type='file'
                   placeholder=''
                   onChange={fileHandler}
                 />  
            </Grid.Column>
            </Grid.Row>
                  
   </Grid>
      </>
    )
   }

   export default FormCreateProperty;
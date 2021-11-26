import { useState,useContext, useEffect } from "react";
import { Grid } from 'semantic-ui-react';
import { Container,Form,Row, Col,Button,Collapse } from "react-bootstrap";
import ContextData from "../store/context-data";
import Upload from "./Upload";
const LicensePreview = (props) =>{

    const [propertyName,setPropertyName] = useState();
    const [shortName,setShortName] =useState();
    const [imgURL, setImgURL] = useState();
    const [propStatus,setPropStatus] = useState(); 
    const ctx = useContext(ContextData);
    
    const [ObjFormProp,setObjFormProp]=useState({
      PropertyName:'',
      ShortName:'',
      ImageUrl:'',
    })
       
   // props.formPropHandler(ObjFormProp);
   // console.log(ObjFormProp);
   
    return(
      <>    
            <Grid>
               <Grid.Row columns ={1} style={{marginTop:'100px'}}>
              
              <Grid.Column width={16} textAlign='center'><h3>License Preview</h3></Grid.Column>
              
            </Grid.Row>
            </Grid>
            <Upload/>
              

      </>
    )
   }

   export default LicensePreview;
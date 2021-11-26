
import { Container,Button,Grid,Table,Image,Loader } from 'semantic-ui-react';
import axios from "axios"; 
import { useState,useEffect,useContext} from "react";
import Result from './Result';
import ContextData from "../store/context-data"; 
const Upload = (props) =>{
     const ctx = useContext(ContextData);
     const[orgDetails,setOrgDetails] = useState(JSON.parse(sessionStorage.getItem("SessionOrgDetails")));
     const[newProperty,setNewProperty] = useState(JSON.parse(sessionStorage.getItem("newProperty")));
     const[selectedModules,setModules] = useState(JSON.parse(localStorage.getItem("selectedModules")));
     const[defaultUsers,setDefaultUsers] = useState(JSON.parse(localStorage.getItem("defaultUsers")));
   //  const [orgImage,setOrgImage] = useState(ctx.orgDetails.OrganizationDetails && ctx.orgDetails.OrganizationDetails.imageData);
     const [preview,setPreview] = useState();
     const [responseData, setResponseData] = useState();
     const [list,setList] = useState();
     const [OpeningFinancialMonth, setOpeningFinancialMonth] = useState(); 
    
     
     const [modulesArr,setModulesArr ] = useState( ctx.selectedModules.map((item)=>{
      return(
             {
                ModuleCode: item.ModuleCode,
                Features:item.Features,
                 SubModules:item.SubModules
             }
      )
     }) ); 
    const moduleCodeArr = selectedModules.map((item)=>{
     return(
         {
            ModuleCode: item.ModuleCode,
            Features: item.Features && item.Features.map((item)=>item),
          //  SubModules:item.SubModules &&  item.SubModules.map((item)=>item) 
         }
       )
     }); 

   //  useEffect(()=>{  
  //    ctx.orgDetails &&
     //  localStorage.setItem('orgDetails', JSON.stringify(ctx.orgDetails));  
      // localStorage.setItem('newProperty',  JSON.stringify(ctx.newProperty));
      // localStorage.setItem('selectedModules', JSON.stringify(ctx.selectedModules));
       //localStorage.setItem('defaultUsers', JSON.stringify(ctx.defaultUsers)); 
  //   },[ctx.orgDetails,ctx.newProperty,ctx.selectedModules,ctx.defaultUsers])  

     useEffect(()=>{   
      //const {...orgLocalStorage} = JSON.parse(sessionStorage.getItem("SessionOrgDetails"));
     // setOrgDetails(orgLocalStorage);
     // console.log('orgLocal storage' + orgLocalStorage);
      
     // const {...propLocalStorage} = JSON.parse(localStorage.getItem("newProperty"));
     // console.log('data from local stoarge property ');
     // console.log(propLocalStorage);
    //  setNewProperty(propLocalStorage);
      
     // const {...selectModuleLocalStorage} = JSON.parse(localStorage.getItem("selectedModules"));
     // setModules(selectModuleLocalStorage);
     // console.log(selectModuleLocalStorage); 
  
      //const {...defaultUsersLocalStorage} = JSON.parse(localStorage.getItem("defaultUsers"));
      //setDefaultUsers(defaultUsersLocalStorage);
      //console.log(defaultUsersLocalStorage); 

     },[setOrgDetails, setNewProperty,setModules,setDefaultUsers])   

      //  useEffect(()=>{
      //    console.log(newProperty.PropertyDetails);
      //    if(propertyDetails) {
      //      console.log(propertyDetails);
      //  var OFM = new Date(newProperty.PropertyDetails.YearEndSettings.OpeningFinancialMonth);
      //  var month = OFM.getMonth();
      //  var options = { month: 'long'};
      //  setOpeningFinancialMonth(new Intl.DateTimeFormat('en-US', options).format(OFM));
      // }    
      //   },[propertyDetails])
 
  const create = () =>{
    

      const OrgMiniData =orgDetails.OrganizationDetails;
      const uploadData = [ { 
        OrganizationDetails:{
            OrganizationName:  orgDetails.OrganizationDetails.OrganizationName,
            ImageUrl: orgDetails.OrganizationDetails.ImageUrl,
            Address:{ 
                AddressLine1: orgDetails.OrganizationDetails.Address.AddressLine1,
                AddressLine2: orgDetails.OrganizationDetails.Address.AddressLine2,
                AddressLine3: orgDetails.OrganizationDetails.Address.AddressLine3,
                AreaCode: Number(orgDetails.OrganizationDetails.Address.AreaCode),
                AreaName: orgDetails.OrganizationDetails.Address.AreaName,
                CityCode: Number(orgDetails.OrganizationDetails.Address.CityCode),
                CityName: orgDetails.OrganizationDetails.Address.CityName,
                StateCode:Number(orgDetails.OrganizationDetails.Address.StateCode),
                CountryCode:Number(orgDetails.OrganizationDetails.Address.CountryCode),
                ZipCode: orgDetails.OrganizationDetails.Address.ZipCode,
                Landmark:orgDetails.OrganizationDetails.Address.Landmark,
            },
            ContactDetails:{
                MobileCountryCode:orgDetails.OrganizationDetails.ContactDetails.MobileCountryCode,
                MobileNo: orgDetails.OrganizationDetails.ContactDetails.MobileNo,
                TelephoneCountryCode:orgDetails.OrganizationDetails.ContactDetails.TelephoneCountryCode,
                TelephoneAreaCode:orgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode,
                TelephoneNo:orgDetails.OrganizationDetails.ContactDetails.TelephoneNo,
                EmailId:orgDetails.OrganizationDetails.ContactDetails.EmailId,
                Website:orgDetails.OrganizationDetails.ContactDetails.Website, 
            },
            Status:Number(orgDetails.OrganizationDetails.Status),
        },
        PropertyDetails:{  
            PropertyName:newProperty.PropertyDetails.ObjFormProperty.PropertyName,
            ShortName:newProperty.PropertyDetails.ObjFormProperty.ShortName,
            ImageUrl:newProperty.PropertyDetails.ObjFormProperty.ImageUrl,
            Address:{
              AddressLine1:newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine1, 
              AddressLine2:newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine2,
              AddressLine3:newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine3,
              AreaCode: Number(orgDetails.OrganizationDetails.Address.AreaCode),
              AreaName:newProperty.PropertyDetails.formPropAdrsData.Address.AreaName, 
                CityCode: Number(orgDetails.OrganizationDetails.Address.CityCode),
                CityName:newProperty.PropertyDetails.formPropAdrsData.Address.CityName,
                StateCode:Number(orgDetails.OrganizationDetails.Address.StateCode),
                CountryCode:Number(orgDetails.OrganizationDetails.Address.CountryCode),
                ZipCode: orgDetails.OrganizationDetails.Address.ZipCode,
                Landmark:newProperty.PropertyDetails.formPropAdrsData.Address.Landmark,
                Latitude:Number(newProperty.PropertyDetails.formPropAdrsData.Address.Latitude),
                Longitude:Number(newProperty.PropertyDetails.formPropAdrsData.Address.Longitude),
            },
            ContactDetails:{ 
                MobileCountryCode: newProperty.PropertyDetails.formPropAdrsData.ContactDetails.MobileCountryCode, 
                MobileNo:newProperty.PropertyDetails.formPropAdrsData.ContactDetails.MobileNo,   
                TelephoneCountryCode:newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneCountryCode,
                TelephoneAreaCode: newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneAreaCode,
                TelephoneNo: newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneNo,
                EmailId:  newProperty.PropertyDetails.formPropAdrsData.ContactDetails.EmailId,
                Website:newProperty.PropertyDetails.formPropAdrsData.ContactDetails.Website,
            },
            Status:newProperty.PropertyDetails.Status,
            RegistrationDetails: newProperty.PropertyDetails.formPropRegData,
            YearEndSettings:{
                OpeningFinancialMonth:Number(newProperty.PropertyDetails.YearEndSettings.OpeningFinancialMonth),   
                StartDayOfTheMonth:Number(newProperty.PropertyDetails.YearEndSettings.StartDayOfTheMonth),
            },
            SelectedModules:selectedModules, 
        },
        DefaultUsers:defaultUsers,
      }]; 
        console.log('Data upload inti Img Url');
        console.log(ctx.APIToken);
      console.log(uploadData); 
    axios.post('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/CreateOrganization',
    {
      "OrganizationDetails":{
          "OrganizationName":orgDetails.OrganizationDetails.OrganizationName,
          "ImageUrl":orgDetails.OrganizationDetails.ImageUrl,
          "Address":{
              "AddressLine1": orgDetails.OrganizationDetails.Address.AddressLine1,
              "AddressLine2": orgDetails.OrganizationDetails.Address.AddressLine2,
              "AddressLine3": orgDetails.OrganizationDetails.Address.AddressLine3,
              "AreaCode": Number(orgDetails.OrganizationDetails.Address.AreaCode),   
              "AreaName":orgDetails.OrganizationDetails.Address.AreaName,
              "CityCode":Number(orgDetails.OrganizationDetails.Address.CityCode),
              "CityName":orgDetails.OrganizationDetails.Address.CityName,
              "StateCode":Number(orgDetails.OrganizationDetails.Address.StateCode),
              "CountryCode":Number(orgDetails.OrganizationDetails.Address.CountryCode),
              "ZipCode": orgDetails.OrganizationDetails.Address.ZipCode,
              "Landmark": orgDetails.OrganizationDetails.Address.Landmark,
          },
          "ContactDetails":{     
              "MobileCountryCode":orgDetails.OrganizationDetails.ContactDetails.MobileCountryCode,
              "MobileNo":orgDetails.OrganizationDetails.ContactDetails.MobileNo.length >= 10?orgDetails.OrganizationDetails.ContactDetails.MobileNo:1111111111,
              "TelephoneCountryCode":orgDetails.OrganizationDetails.ContactDetails.TelephoneCountryCode,
              "TelephoneAreaCode":orgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode,
              "TelephoneNo":orgDetails.OrganizationDetails.ContactDetails.TelephoneNo.length<=5?orgDetails.OrganizationDetails.ContactDetails.TelephoneNo:'12345',
              "EmailId": orgDetails.OrganizationDetails.ContactDetails.EmailId.includes('@')?orgDetails.OrganizationDetails.ContactDetails.EmailId:'test@email.com',
              "Website": orgDetails.OrganizationDetails.ContactDetails.Website, 
          },
         
          "Status":Number(orgDetails.OrganizationDetails.Status),
      },
      "PropertyDetails":{
          "PropertyName": newProperty.PropertyDetails.ObjFormProperty.PropertyName,
          "ShortName":newProperty.PropertyDetails.ObjFormProperty.ShortName,
          "ImageUrl":orgDetails.OrganizationDetails.ImageUrl,
          "Address":{    
              "AddressLine1":newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine1, 
              "AddressLine2":newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine2,
              "AddressLine3":newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine3,
              "AreaCode":Number(orgDetails.OrganizationDetails.Address.AreaCode),  
              "AreaName":newProperty.PropertyDetails.formPropAdrsData.Address.AreaName, 
              "CityCode": Number(orgDetails.OrganizationDetails.Address.CityCode),
              "CityName":newProperty.PropertyDetails.formPropAdrsData.Address.CityName,
              "StateCode":Number(orgDetails.OrganizationDetails.Address.StateCode),
              "CountryCode":Number(orgDetails.OrganizationDetails.Address.CountryCode),
              "ZipCode":"",
              "Landmark":"",
              "Latitude":Number(newProperty.PropertyDetails.formPropAdrsData.Address.Latitude)<=90? Number(newProperty.PropertyDetails.formPropAdrsData.Address.Latitude):0,
              "Longitude": Number(newProperty.PropertyDetails.formPropAdrsData.Address.Longitude)<=180? Number(newProperty.PropertyDetails.formPropAdrsData.Address.Longitude):0,
          },
          "ContactDetails":{
              "MobileCountryCode": "",
              "MobileNo":"",
              "TelephoneCountryCode": "",
              "TelephoneAreaCode":"",
              "TelephoneNo":"",
              "EmailId":"",
              "Website":""
          },
          "Status": Number(newProperty.PropertyDetails.Status),
          "RegistrationDetails":newProperty.PropertyDetails.formPropRegData,
          "YearEndSettings":{
              "OpeningFinancialMonth":Number(newProperty.PropertyDetails.YearEndSettings.OpeningFinancialMonth),   
              "StartDayOfTheMonth": Number(newProperty.PropertyDetails.YearEndSettings.StartDayOfTheMonth),
          },
          "SelectedModules": moduleCodeArr,
      },
      "DefaultUsers":defaultUsers,
      "SystemDetails":{
          "ApplicationName":"LUCID License Management",
          "ApplicationVersion":"1.0.0.0",
          "BrowserName":"Chrome",
          "BrowserVersion":"83",
          "DeviceId":"",
          "DeviceType":"Desktop",
          "IP":"2409:4072:198:c9b1:95a:80d4:a728:36e",
          "Mac":"0210D6A869E8",
          "OPS":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/83.0.4103.97 Safari\/537.36",
          "Source":"React App",
          "SystemName":"EC2AMAZ-EVPTFRH",
          "SystemTimeZoneId":1
      }
  }
   ,{headers: { Authorization: `Bearer ${ctx.APIToken}`},
                "Content-Type": "application/json"
                }
  
    ).then((response)=>{
        console.log(response.data);
        const resData = response.data;
         if (resData.errorCode===1){
           alert(resData.message)
        //  setResponseData(resData.message);
         }else{
         console.log('uploaded the data');
        console.log(response.data);
        setResponseData(response.data); 
      //  <Redirect to='/Response' /> 
    }
      
    }).catch((error)=>{
        console.log(error); 
        setResponseData(error.data); 
    }) 
      
  } 
  {
    //create ends here
  }
       if(orgDetails && !responseData){
  return(
        <>    
        <Container>
            <Grid> 
                <h3> Organisation Details</h3>   
                <Grid.Row  columns={2}> 
<Grid.Column width={8} >                 
 <Table color='blue' columns={2} celled inverted selectable >
 <Table.Header>
   <Table.Row textAlign='center'>
     <Table.HeaderCell> Fields</Table.HeaderCell>
     <Table.HeaderCell> Values</Table.HeaderCell> 
   </Table.Row>
 </Table.Header>

 <Table.Body>
   <Table.Row>
         <Table.Cell>Organization Name </Table.Cell>
          <Table.Cell>{  orgDetails.OrganizationDetails.OrganizationName}</Table.Cell>
   </Table.Row> 
     <Table.Row><Table.Cell> Area Name  </Table.Cell><Table.Cell>{orgDetails.OrganizationDetails.Address.AreaName}   </Table.Cell>  </Table.Row> 
           <Table.Row><Table.Cell>City Name  </Table.Cell><Table.Cell>{orgDetails.OrganizationDetails.Address.CityName}   </Table.Cell>  </Table.Row> 
           <Table.Row><Table.Cell>ZipCode  </Table.Cell><Table.Cell>{orgDetails.OrganizationDetails.Address.ZipCode}   </Table.Cell>  </Table.Row>
           <Table.Row><Table.Cell>Landmark  </Table.Cell><Table.Cell>{orgDetails.OrganizationDetails.Address.Landmark}   </Table.Cell>  </Table.Row>  
           <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>Contact Details</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row>
            <Table.Row>     <Table.Cell>  MobileCountryCode  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.ContactDetails.MobileCountryCode}   </Table.Cell>  </Table.Row>
             <Table.Row>    <Table.Cell>  MobileNo  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.ContactDetails.MobileNo}  </Table.Cell>  </Table.Row>
              <Table.Row>   <Table.Cell>  TelephoneCountryCode  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.ContactDetails.MobileNo}  </Table.Cell>  </Table.Row>
               <Table.Row>  <Table.Cell>  TelephoneAreaCode  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.ContactDetails.TelephoneAreaCode}  </Table.Cell>  </Table.Row>
                <Table.Row> <Table.Cell>  TelephoneNo  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.ContactDetails.TelephoneNo}  </Table.Cell>  </Table.Row>
                 <Table.Row><Table.Cell>  EmailId  </Table.Cell><Table.Cell>  {orgDetails.OrganizationDetails.ContactDetails.EmailId}  </Table.Cell>  </Table.Row>
                 <Table.Row><Table.Cell>  Website  </Table.Cell><Table.Cell>  {orgDetails.OrganizationDetails.ContactDetails.Website}  </Table.Cell>  </Table.Row>
                 <Table.Row><Table.Cell>Status  </Table.Cell><Table.Cell> {orgDetails.OrganizationDetails.Status==='1'?'Active':'Passive'}  </Table.Cell>  </Table.Row>
  </Table.Body>
</Table> 
               </Grid.Column>
               <Grid.Column width={5}>
               {orgDetails.OrganizationDetails ? <Image size='small' rounded src={orgDetails.OrganizationDetails.ImageUrl} alt='organization picprop'/> :
               <i className="fa fa-picture-o" aria-hidden="true" style={{fontSize:'150px'}}></i>   }
               </Grid.Column>
           </Grid.Row> 

           <h3> Property Details</h3>  
           <Grid.Row columns={2}>
<Grid.Column width={8}>
                     
 <Table color='blue' columns={2} celled inverted selectable >
 <Table.Header>
   <Table.Row textAlign='center'>
     <Table.HeaderCell> Fields</Table.HeaderCell>
     <Table.HeaderCell> Values</Table.HeaderCell> 
   </Table.Row>
 </Table.Header>

 <Table.Body>
   <Table.Row>
         <Table.Cell>Organization Name </Table.Cell>
          <Table.Cell>{orgDetails.OrganizationDetails.OrganizationName}</Table.Cell> 
   </Table.Row>
   
    <Table.Row><Table.Cell>  PropertyName</Table.Cell><Table.Cell> {newProperty.PropertyDetails.ObjFormProperty.PropertyName}  </Table.Cell>  </Table.Row>
        <Table.Row><Table.Cell>  ShortName</Table.Cell><Table.Cell>  {newProperty.PropertyDetails.ObjFormProperty.ShortName}  </Table.Cell>  </Table.Row>
        
        <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>Address</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row>
        
       <Table.Row><Table.Cell>  AddressLine1</Table.Cell><Table.Cell>  {newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine1} </Table.Cell>  </Table.Row>
       <Table.Row><Table.Cell>  AddressLine2</Table.Cell><Table.Cell>  {newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine2}  </Table.Cell>  </Table.Row>
       <Table.Row><Table.Cell>  AddressLine3</Table.Cell><Table.Cell>  {newProperty.PropertyDetails.formPropAdrsData.Address.AddressLine3}  </Table.Cell>  </Table.Row>
       <Table.Row><Table.Cell>  Area Name</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.Address.AreaName}  </Table.Cell>  </Table.Row>
       <Table.Row><Table.Cell>   City Name</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.Address.CityName}  </Table.Cell>  </Table.Row>
       <Table.Row><Table.Cell>  ZipCode</Table.Cell><Table.Cell>  {newProperty.PropertyDetails.formPropAdrsData.Address.ZipCode}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   Landmark</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.Address.Landmark}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>  Latitude</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.Address.Latitude}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   Longitude</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.Address.Longitude}  </Table.Cell>  </Table.Row>
      <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>ContactDetails</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row>
      <Table.Row><Table.Cell>   MobileCountryCode</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.MobileCountryCode}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   Mobile No</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.MobileNo} </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   TelephoneCountryCode</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneCountryCode}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   TelephoneAreaCode</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneAreaCode}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   TelephoneNo</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.TelephoneNo}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   EmailId</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.EmailId}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   Website</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropAdrsData.ContactDetails.Website}  </Table.Cell>  </Table.Row>
      <Table.Row ><Table.Cell>   Status</Table.Cell><Table.Cell> {newProperty.PropertyDetails.Status==='1'?'Active':'Passive'}  </Table.Cell>  </Table.Row> 
      <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>RegistrationDetails</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row> 
    
      <Table.Row><Table.Cell>   Registration Type</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropRegData.map((item)=>{ return item.RegistrationTypeId===1?'GSTN':'PAN'})}  </Table.Cell>  </Table.Row>
      <Table.Row><Table.Cell>   RegistrationNumber</Table.Cell><Table.Cell> {newProperty.PropertyDetails.formPropRegData.map((item)=>item.RegistrationNumber)}  </Table.Cell>  </Table.Row>
      <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>YearEndSettings</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row> 
    
      <Table.Row><Table.Cell>   OpeningFinancialMonth</Table.Cell><Table.Cell> {newProperty.PropertyDetails.YearEndSettings.OpeningFinancialMonth}  </Table.Cell>  </Table.Row>    
      <Table.Row><Table.Cell>   Start Day Of The Month</Table.Cell><Table.Cell> {newProperty.PropertyDetails.YearEndSettings.StartDayOfTheMonth}  </Table.Cell>  </Table.Row>    
     
      <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell  colSpan={2}>  <h4>Selected Modules</h4> 
      </Table.Cell> </Table.Row>  
      <Table.Row><Table.Cell  colSpan={2}>
      {ctx.selectedList}
        </Table.Cell> </Table.Row>
           
      <Table.Row style={{backgroundColor:'darkblue'}}> <Table.Cell>  <h4>User Details</h4></Table.Cell>  <Table.Cell> </Table.Cell> </Table.Row> 
      <Table.Row><Table.Cell> <h4>DefaultUsers</h4> </Table.Cell> <Table.Cell> </Table.Cell></Table.Row> 
      <Table.Row><Table.Cell> <h4>User ID</h4> </Table.Cell> <Table.Cell> Password</Table.Cell></Table.Row> 
        
             {defaultUsers.map((item)=>{
                  return(
                      <>
                       <Table.Row key={item.UserId}><Table.Cell> {item.UserId}</Table.Cell> <Table.Cell> {item.Password}</Table.Cell></Table.Row> 
                
              </>
              )
           })} 
  
  
  </Table.Body>
    </Table> 
    <Grid.Row columns={1}>
        <Grid.Column width={3}>
        <Button color='blue' onClick={create}>Create</Button>
        
        </Grid.Column>
       
    </Grid.Row> 
               </Grid.Column> 
               <Grid.Column width={8}>   {
                                      //right colums starts here
                                      }
                
                 <Grid.Row columns={1} >

                   <Grid.Column width={3}  style={{height:'150px',marginBottom:'1000px'}}>
                   {orgDetails.OrganizationDetails ? <Image size='small' rounded src={newProperty.PropertyDetails.ObjFormProperty.ImageUrl} alt='organization picprop'/> :
                     <i className="fa fa-picture-o" aria-hidden="true" style={{fontSize:'150px'}}></i>   }
                   </Grid.Column> 
                  </Grid.Row>  
               </Grid.Column>     
           </Grid.Row> 
  
                       </Grid>   
                  </Container>       
        </>

  )}else if(responseData){
    return (
    <Result data={responseData}/>
    )
  }
  
  else{ 
       

      return (
          <>
             <h3> Loading.....</h3>
            
             
           </>
      )
  }

}

export default Upload;
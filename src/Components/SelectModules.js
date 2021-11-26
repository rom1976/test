import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { Container, Form,Grid,Button, Progress,Input,Card } from 'semantic-ui-react'
import { Link,useHistory } from "react-router-dom";
import React from 'react'
import ProgressSuccess from './ProgressSuccess';
import ContextData from "../store/context-data"; 
const SelectModules = (props) =>{

  const ctx =useContext(ContextData);
  const sessionOrgDetails = sessionStorage.getItem('SessionOrgDetails') ? JSON.parse(sessionStorage.getItem('SessionOrgDetails')):[]; 
       

  const[selectModule,setSelectModule] = useState([]);
  const[Loader,setLoader] = useState(false);
  const [ULListCRM,setULListCRM] = useState();
  const [crmModuleCode,setCRMModuleCode] = useState();
  const [ULListFOM,setULListFOM] = useState();
  const [fomModuleCode,setFOMModuleCode] = useState();
  const [ULListGTP,setULListGTP] = useState();
  const [gtpModuleCode,setGTPModuleCode] = useState();
  const [ULListLIC,setULListLIC] = useState();
  const [licModuleCode,setLICModuleCode] = useState();
  const [ULListPOS,setULListPOS] = useState();
  const [posModuleCode,setPOSModuleCode] = useState();
  const [ULListTLYI,setULListTLYI] = useState();
  const [tlyiModuleCode,setTLYIModuleCode] = useState();
  const [ULListURM,setULListURM] = useState(); 
  const [urmModuleCode,setURMModuleCode] = useState();
  const [liOnlineOrder,setOnlineOrder] =useState();
  const [liTableReservation,setTableReservation] = useState();
  const [featureEbill,setFeatureEbill] = useState(); 
  const [featurePOSSync, setFeaturePOSSync] = useState();
  const [liDigitalMenu,setDigitalMenu] = useState();
  const [liGuestOrderApp, setGuestOrderApp] = useState();
  const[listLoader,setListLoader] = useState(false);
  const [list,setList] = useState([]);
  const [FeaturesList,setFeaturesList] = useState();
  const [toggle,setToggle] = useState(false);
  const [bar,setPercent] = useState({percent:0,color:'red',toggleSave:true});
  const [progColor,setProgColor] = useState();
  let history = useHistory();

  
  const goBack = () =>{
    history.goBack();
    } 

  

  useEffect(()=>{
       console.log(toggle);
       console.log("from select modules ctx - propertyName"+ctx.propertyName);
    //   console.log(ctx.newProperty.propertDetails.propertyName);
  },[toggle])

   const formHandler = () =>{
             setToggle(true);
             setTimeout(()=>{setPercent({percent:100, color:'olive'})},1000);
            const selectedModulesArr =[crmModuleCode,fomModuleCode,gtpModuleCode,licModuleCode,posModuleCode,tlyiModuleCode,
              urmModuleCode                        
            ];
            const fileteredSelectModules = selectedModulesArr.filter((item)=>item);
            const selectedSubModules = [liOnlineOrder,liTableReservation,liDigitalMenu,liGuestOrderApp];
            const filteredSelectedSubModules = selectedSubModules.filter((item)=>item)
            const selectedFeaturesArr =[featureEbill,featurePOSSync];
            const fileteredSelectedFeatures = selectedFeaturesArr.filter((item)=>item)
            const selectModules = fileteredSelectModules.map((mcode)=>{   
              if (mcode==='POS'){
              return(   
                 { 
                  ModuleCode: mcode,
                  Features:[...fileteredSelectedFeatures],
                  SubModules:filteredSelectedSubModules.map((item)=>item)
                  
                }      
               )
              } else if(mcode!=='undefined'){
                return(   
                  { 
                   ModuleCode: mcode, 
                 }      
                
                )
               } 
                } 
               )
           console.log(selectModules);
       
        props.selectedModulesHandler(selectModules,list);
        localStorage.setItem('selectedModules', JSON.stringify(selectModules));
   }

  const checkBoxHandler =(e) =>{
    
       //setULList((prev)=>[...prev,e.target.value]);       
       switch (e.target.value) {
        case 'Customer Relationship Managemen':
          if(e.target.checked===true){
              setULListCRM(e.target.value);
              setCRMModuleCode(e.target.id);}
              else{
                setULListCRM('-');}    
          break;
        case 'Front Office':
          if(e.target.checked===true){
          setULListFOM(e.target.value);
          setFOMModuleCode(e.target.id);
        }
          else{
            setULListFOM('-');}   
           break;
        case 'Gate Pass':
          if(e.target.checked===true){
          setULListGTP(e.target.value);
          setGTPModuleCode(e.target.id);
        }
          else{
            setULListGTP('-');}   
          break;
        case 'License Management':
          if(e.target.checked===true){
            setULListLIC(e.target.value);
            setLICModuleCode(e.target.id);
          }
            else{
              setULListLIC('-');} 
            break;
        case 'Point Of Sale':
          if(e.target.checked===true){
            setULListPOS(e.target.value);
            setPOSModuleCode(e.target.id);
          }
            else{
              setULListPOS();} 
              break;
        case 'Tally Interface':
          if(e.target.checked===true){
            setULListTLYI(e.target.value);}
            else{
              setULListTLYI('-');} 
            break;
        case 'User Management':
          if(e.target.checked===true){
            setULListURM(e.target.value);}
            else{
              setULListURM('');} 
            break;
        case 'Online Order':
          if(e.target.checked===true){
            setOnlineOrder(e.target.value);
          } else{
            setOnlineOrder('');
          } 
            break;
        case 'Table Reservation':
          if(e.target.checked===true){
            setTableReservation(e.target.value);
            console.log('Table Reservation event ---'+e.target.value );
          } else{
            setTableReservation('');
          } 
            break;
        case 'EBill':
          if(e.target.checked===true){
            setFeatureEbill(e.target.value); 
          } else{
            setFeatureEbill('');
          } 
            break;
        case 'POS Sync':
           if(e.target.checked===true){
             setFeaturePOSSync(e.target.value); 
           } else{
             setFeaturePOSSync('');
           } 
             break; 
        case 'Digital Menu':
              if(e.target.checked===true){
                setDigitalMenu(e.target.value); 
              } else{
                setDigitalMenu();
              } 
                break; 
        case 'Guest Ordering App (Contactless)':
                 if(e.target.checked===true){
                    setGuestOrderApp(e.target.value); 
                  } else{
                    setGuestOrderApp();
                  } 
                    break; 
        
        default: setListLoader(true);
                 
      } 
 
  }



  useEffect(()=>{
    console.log("Connecting...");
    axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetModuleList',
      { headers: { Authorization: `Bearer ${ctx.APIToken}`}}
  )
  .then((response) => {
    console.log(response.data)
    const modulesData = response.data.response.modules;
    setSelectModule(modulesData); 
    setLoader(true);
  })
  },[setSelectModule]);

  const setFeaturesHandler = () =>{
    return(
      <> 
        
           <li style={{listStyle:'none'}}> Features
                 <ul>
                   {featureEbill &&
                      <li> {featureEbill} </li>
                   }
                   { featurePOSSync &&
                     <li>{featurePOSSync}</li>
                   }
               
                 </ul>

         </li>
        
      </>
    )

}
   // useEffect (()=>{
     // setFeaturesList(setFeaturesHandler);
    //},[featurePOSSync,featureEbill])

   
   
   useEffect(()=>{
     setList(
       ()=>{
        const listState = [ULListCRM, ULListFOM,ULListGTP,ULListLIC,ULListPOS,ULListTLYI,ULListURM];
        const subList = [liOnlineOrder,liTableReservation,liDigitalMenu,liGuestOrderApp];
        return(
              <>  {selectModule.map((item)=>{
                     
                     return <>     
                                     <ul style={{listStyle:'none'}}>

                                    
                                   {  listState.map((ullist,id)=>{
    
                                       return(
                                         <>   {
                                             
                                              item.moduleName === ullist &&   
                                            <li  key={id.toString()}>{ullist}
                                             {
                                                  item.subModules.map((subitem)=>{ 
                                                    return <> 
                                                             
                                                               <ul style={{listStyle:'none'}}>
                                                                  {
                                                                   subitem.moduleName===liDigitalMenu &&
                                                                   <li>{liDigitalMenu}</li>  
                                                                   } 
                                                                    {
                                                                   subitem.moduleName===liGuestOrderApp &&
                                                                   <li>{liGuestOrderApp}</li>  
                                                                   }  
                                                                  {
                                                                   subitem.moduleName===liOnlineOrder &&
                                                                   <li>{liOnlineOrder}</li>  
                                                                   } 
                                                                   {
                                                                    subitem.moduleName===liTableReservation &&   
                                                                    <li>{liTableReservation}</li> 
                                                                    }
                                                                      {
                                                                      subitem.moduleName===liOnlineOrder &&
                                                                      <li style={{listStyle:'none'}}> Features
                                                                      <ul>
                                                                        {featureEbill &&
                                                                           <li> {featureEbill} </li>
                                                                        }
                                                                        { featurePOSSync &&
                                                                          <li>{featurePOSSync}</li>
                                                                        }
                                                                    
                                                                      </ul>
                                                     
                                                              </li>
                                                                   }
                                                                 
                                                               </ul> 
                                                        </>
                                                  })
                                             }   
                                            </li>
                                         } 
                                         </>
                                         )
                                      })
                                    }
                                     </ul>                                
                           </> 
                    }
                    )} 
              </>
        )
       }
     )

   },[liDigitalMenu,liGuestOrderApp,featurePOSSync,featureEbill,ULListCRM, ULListFOM,ULListGTP,ULListLIC,ULListPOS,ULListTLYI,ULListURM,liOnlineOrder,liTableReservation,FeaturesList])
  
  const ULListCreator = () =>{
         const listState = [ULListCRM, ULListFOM,ULListGTP,ULListLIC,ULListPOS,ULListTLYI,ULListURM];
    return(
          <>
            <ul>
              {  listState.map((ullist,id)=>{

                  return(
                    <> 
                       <li key={id.toString()}>{ullist} style={{listStyle:'none'}}
                          {
                            ullist.map((item)=>{
                            
                          })
                          } 
                       </li>
                    </>
                  )
                })
              }
            </ul>
          </>
    )

  }
    
    let UList;
    useEffect(()=>{
      console.log('Loaded from usEffect select Module');
     
      console.log(selectModule);     
    },[selectModule]) 
      const SModules = () =>{
        if (Loader) {
          return(
              <>

              </>

          )} else return (<> <p>Loading ....</p> </>)
      } 
  return(
      <>
      <Container>
          <Grid>
                 
                 <Grid.Row textAlign='centered' style={{marginTop:'100px'}}>
                 <h3>Select Modules</h3>
                 </Grid.Row>
       
          </Grid>
          <Grid style={{marginLeft:'2%'}}>
        
      <Grid.Row className='mb-2'>
    
          <Grid.Column  width={6}>
<Form>
                 <Form.Group inline>
                 <label>Organization Name</label>
                 <Form.Field
            control={Input}
           //  placeholder={ctx.CtxOrgName} 
            readOnly 
            defaultValue={sessionOrgDetails.OrganizationDetails.OrganizationName}  
            width={10}
          /></Form.Group>
           <Form.Group inline>
             <label>Property Name *</label>
           <Form.Field
                 control={Input} 
                 // placeholder={ctx.CtxOrgName} 
                 defaultValue={ctx.propertyName} 
                  readOnly
                 width={10} 
               />  
               </Form.Group>
               </Form>
               </Grid.Column>
               </Grid.Row>

     

             {
     <Grid.Row>
    
                     <Grid.Column width={10} >  {/*Main div starts here*/} 
                     <Grid.Row >
                     
               <Grid.Column width='2'> <h4>Modules ({selectModule.length}) </h4></Grid.Column>
               <Grid.Column width={4}>
               <Form.Field type='text'  placeholder='' />
              </Grid.Column>
               
     </Grid.Row>
                                            
                      <Grid.Row  style={{marginBottom:'20px'}}>   {/*Modules div starts here*/}
                    <Grid.Column width={1} > </Grid.Column >
                     <Grid.Column width={10} className='sm-module' >
                      {  selectModule.map((item)=>{
                     return <>
                
                    <Grid.Row columns={2} className='sm-card'  key={Math.random().toString}>
                    <Input style={{float:'right', }}
                    type="checkbox"
                    value={item.moduleName}
                    id={item.moduleCode}
                   // label={item.moduleName}
                    onChange={checkBoxHandler }
                    />  
                    <Grid.Column width={10} className=''>{item.moduleName}</Grid.Column >
                    <Grid.Column width={5} className=''>
                   
                   </Grid.Column >
                   </Grid.Row>
                   
                   </>
                      })
                    }

                 </Grid.Column > 
               </Grid.Row>      {/*Modules div ends here*/}

               <Grid.Row >  {/*SubModules header and search starts here*/}
               
               <Grid.Column width={4}> <h4>Sub Modules of POS ({selectModule.map((item=>{if (item.subModules.length >0) return item.subModules.length}))}) </h4></Grid.Column >
               <Grid.Column width={4}>
               <Form.Field type='text'  placeholder='' />
              </Grid.Column >
                </Grid.Row>     {/*SubModules header and search ends here*/}                             
                      <Grid.Row style={{marginBottom:'20px'}}>   {/*SubModules div starts here*/}
                    <Grid.Column width={1} > </Grid.Column >
                     <Grid.Column width={10} className='sm-module'>
                      { ULListPOS &&  selectModule.map((item)=>{
                     return <>
                              { item.subModules.map((item)=>{
                                return( 
                                      <>  
                                             <div className='sm-card' style={{float:'left'}} key={Math.random().toString}>
                                             <Input style={{float:'right'}}
                                             type="checkbox"
                                             id={item.moduleCode.toString()}
                                             value={item.moduleName} 
                                             onChange={checkBoxHandler} 
                                            />
                                             <Grid.Column width={7} className='txt '>{item.moduleName}</Grid.Column >
                                             <Grid.Column width={7} className='sel-check'>
                                            
                                           </Grid.Column >
                                             </div>
                   
                                      </> 
                                      )
                              }) }
                    
                   
                   </>
                      })
                    }

                 </Grid.Column > 
               </Grid.Row>      {/*SubModules div ends here*/}

               <Grid.Row>  {/*Features header and search starts here*/}
               
               <Grid.Column width={4}> <h4>Features Of Online Orders ( { 
                            selectModule.map((item=>{
                              if (item.features.length >0) return item.features.length;    
                            }
                              ))
                              } )</h4></Grid.Column >
               <Grid.Column width={4}>
               <Form.Field type='text'  placeholder='' />
              </Grid.Column >
                </Grid.Row>     {/*Features header and search ends here*/}                             
                      <Grid.Row >   {/*Features div starts here*/}
                    <Grid.Column width={1} > </Grid.Column >
                     <Grid.Column width={10} className='mb-2 sm-module'>
                 
                                
                                   { liOnlineOrder &&  selectModule.map((item)=>{
                     return <>
                              { item.features.map((item)=>{
                                return( 
                                      <>
                                             <div className='sm-card' style={{float:'left'}} key={Math.random().toString}>
                                             <Input style={{float:'right'}}
                                             type="checkbox"
                                             id={item.featureId.toString()}
                                             value={item.featureName}
                                             
                                             onChange={checkBoxHandler}
                                            />  
                                             <Grid.Column width={7} className='txt '>{item.featureName} </Grid.Column >
                                             <Grid.Column width={5} className='sel-check'>
                                            
                   </Grid.Column >
                   </div>
                                      </> 
                                      )
                              }) } 
                   </>
                      })
                    }

                 </Grid.Column > 
               </Grid.Row>      {/*Features div ends here*/} 

            </Grid.Column>    {/*Main div ends here*/} 
        {/* right div starts here*/}

    
      
       <Grid.Column width={5}
        >
             <Grid.Row >
                     
                     <Grid.Column width='2'> </Grid.Column>
                     <Grid.Column width={4}>
                     <Form.Field type='text'  placeholder='' />
                    </Grid.Column>
                     
           </Grid.Row>
           


           <Grid.Row className='side-list' >
               {list}
           </Grid.Row> 
       </Grid.Column >
         
        </Grid.Row> }
        <Grid.Row>
            <Grid.Column width={10}>
            { toggle &&
                      
                      <Progress percent={bar.percent}  color={bar.color}/>
                      }
              </Grid.Column>  
              <Grid.Column width={4}>
              <Button onClick={formHandler}>Save</Button>
              

              </Grid.Column>      
               </Grid.Row>  
                 <Grid.Row >
                    <Grid.Column width={4}>
                     <Button 
                     color='blue'
                     onClick={goBack}
                     > Go Back</Button>
                    </Grid.Column>
                   <Grid.Column width={4} floated='right'>
                   { toggle &&

                   <Link  to='/DefaultUsers'> <Button color='blue' onClick={formHandler}>Next </Button></Link>} 
                   </Grid.Column>
                  
               </Grid.Row>
        </Grid>      
  </Container>
  </>

  )
}

export default SelectModules;

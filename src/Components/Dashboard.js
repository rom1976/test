import React from 'react';
import axios from "axios";
import {useState, useEffect,useContext } from "react"; 
import {Container,Button, Card, Grid, Image, Icon, Form,Input,Pagination,Modal,Header,Table, TableHeader, TableCell, TableBody, TableRow,Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'; 
import ContextData from '../store/context-data';
import NewDashBoard from './NewDashBoard';
const Dashboard = (props) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const ctx = useContext(ContextData);

  const [dashboardData,setDashboardData] = useState([]);
  const [message,setMessage] = useState('');
  const [orgData,setOrgData] = useState([]);
  const [searchEntered,setSearchEnetered] = useState('');
  const [noofrows,setNoOfRows] =useState(25);
  const [currentpagenumber,setCurrentPageNumber] =useState(1);
  const [totalpageno,setTotalPage] = useState([]);
  const [searchInit, setSearchInit] = useState();
  const [open, setOpen] = useState(false);
  const [modal,setModal] = useState(false); 
  const [modalOrgName,setModalOrgName] = useState();
  const [remarksOrgId,setRemarksOrgId] = useState();
  const [usersData, setUsersData] = useState();
  const [remarksData,setRemarksData] = useState(); 
  const[enteredRemarks,setEnteredRemarks] = useState();
  const [visible, setVisible] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);  
  const [historyData, setHistoryData] = useState(); 
  const [remarksUdateMessage,setRemarksUdateMessage] = useState();
 
  const [orgStyle,setOrgStyle] = useState(ctx.dashBoStyle);
  const [orgPadding,setOrgPadding]=useState(ctx.orgPadding);
  const options = [  { key: '25', text: '25', value: 25 },
                    { key: '50', text: '50', value: 50 },
                    { key: '100', text: '100', value: 100}
                  ];

  const [pageControlRights, setPageControlRights] = useState();
  const [Edit,setEdit] = useState()
  const [Create,setCreate] = useState();   
  const[View, setView] = useState(); 
 const [AddProperty,setAddProperty] = useState(); 
 const [ViewUsers,setViewUsers] = useState();
     
  useEffect(()=>{ 
    setOrgStyle(ctx.dashBoStyle);
    setOrgPadding(ctx.orgPadding);
    
  },[ctx.dashBoStyle,ctx.orgPadding])
  
  const historyHandler = () =>{ 
    setSecondOpen(true)
  }

     const remarksInputHandler =(e,data)=>{
            setEnteredRemarks(data.value);
            console.log(data.value);
            setRemarksUdateMessage('');
           
          }

        
    
     const remarksUpdateHandler = () =>{
     
      axios.post('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/UpdateOrganizationRemarks', {
        "OrganizationId": remarksOrgId,
         "Remarks": enteredRemarks,
      }, 
       {headers: { Authorization: `Bearer ${ctx.APIToken}`},
      "Content-Type": "application/json"
      })
      .then((response)=>{ 
        console.log(response.data);
        setRemarksUdateMessage('Updated Successfully')
      })

   
    } 

    const remarksHandler = (orgId,orgName) =>{
      setRemarksData(()=> '');
      setRemarksUdateMessage('');
    axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetOrganizationRemarks',
    { params: {
     'OrganizationId': orgId
    }, 
  
    headers: { Authorization: `Bearer ${ctx.APIToken}`}},  
   )
  .then((response)=>{
    console.log('Remarks Data for Remarks Default --- need org Id from this ');
    console.log(response.data);
    const data = response.data.response;
    setRemarksData(data);
  })  
  setModalOrgName(orgName);
  setRemarksOrgId(orgId);
  setModal(true);
  
  axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetOrganizationRemarksHistory',
  { params: {
   'OrganizationId': orgId,
   'NoOfRowsPerPage':25,
    'CurrentPageNumber':1
 },  
 headers: { Authorization: `Bearer ${ctx.APIToken}`}},  
)
.then((response)=>{
   console.log('getting remarks history.......,.,');
    console.log(response.data)
    const data = response.data.response;
    setHistoryData(data);
})
  
   
  }
  
  const usersHandler = (orgId,orgName) => {
       axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetOrganizationUserList',
           { params: {
            'OrganizationId': orgId
          },  
          headers: { Authorization: `Bearer ${ctx.APIToken}`}},  
        )
         .then((response)=>{ 
           const data = response.data.response;
           setUsersData(data);
         })
         setModalOrgName(orgName);
       setOpen(true);              
  }

    useEffect(()=>{
    
      axios.get('https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetDashBoardDetails',
        { headers: { Authorization: `Bearer ${ctx.APIToken}`}}
    )
    .then((response) => {
    
      const data = response.data;
      const PageControlArray =response.data.response.pageControlRights;
      setDashboardData(data); 
       const pagecontrols  = PageControlArray.map( (element) => {

        switch(element.controlName) {
          case 'Create': 
          setCreate(element.enable)
            break;
          case 'Edit': 
          setEdit(element.enable)
            break;
          case 'View': 
            setView(element.enable)
          break;
         case 'Add Property': 
          setAddProperty(element.enable)
          break;
          case 'View Users': 
          setViewUsers(element.enable)
         break; 
        }
              
               return (
                ` ${element.controlName}:${element.enable} `
                      ) 
              }          
             )
            
             setPageControlRights(pagecontrols);
             setMessage(response.data.message)
       setPageControlRights(pagecontrols);
     setMessage(response.data.message)
    })
   
    },[setDashboardData,ctx.APIToken]); 

    const  searchHandler = () =>{

      setSearchInit(searchEntered);
      setCurrentPageNumber(1);
    } 

    const changePageHandler = (event,data) =>{

      console.log(data.activePage);
      setCurrentPageNumber(data.activePage);
    }

    useEffect(()=>{
      axios
           .post(
           "https://dev.lucidits.com/LUCIDLicenseManagementAPI/V1/GetOrganizationList",{ 
            NoOfRowsPerPage: noofrows,
            CurrentPageNumber: currentpagenumber,
            SearchBy:{
               OrganizationName: searchInit
           }},
           {headers: { Authorization: `Bearer ${ctx.APIToken}`},
            "Content-Type": "application/json"
            }
           )
          .then((response) => {
            
           const data = response.data;
            setOrgData(data);
            
 
          }).catch((error)=>{
            console.log(error);
          })
          
      },[setOrgData,searchInit,noofrows,currentpagenumber]);

          // useEffect(()=>{
           //   setTotalPage(orgData.response.totalPages);
         //  },[orgData.response.totalPages])  

       if(message==='Success'){
          props.menus(dashboardData.response);
        
                    
        return(
      <> 
        <Container fluid> 
        <Modal style={{maxWidth:'400px'}}
      closeIcon
      dimmer='blurring'
      open={modal}
       //  trigger={modal}
       onClose={() => setModal(false)}
       onOpen={() => setModal(true)}
       >

         {   
           <>
            <Header icon='archive' content={`${modalOrgName} - Remarks`} />
      
            <div style={{textAlign:'center', padding:'5px',paddingTop:'10px', fontSize:'12px', maxWidth:'400px'}}>  {remarksData &&
              ` Laste Update |${remarksData.remarksDetails.lastUpdatedDateTime}
                | By ${remarksData.remarksDetails.lastUpdatedUser}` } 
                </div>
                <div style={{ fontSize:'12px',textAlign:'right', paddingRight:'19px'}}>
                 <Link to=''
                onClick={historyHandler}
                > History</Link>
            </div>
            <Modal.Content  >
            <Form>
                   <Form.TextArea 
                   label='' placeholder='Remarks' 
                   onChange={remarksInputHandler} 
                   defaultValue={remarksData && remarksData.remarksDetails.remarks}
                   />
                   
                   </Form>
                    <div style={{color:'green', fontSize:'12px'}}> {remarksUdateMessage}</div>
                   <div style={{fontSize:'12px'}}>(Max Char 1000)</div>
                   
                  
           </Modal.Content>
           </>

         }
     
       <Modal.Actions>
       <Button color='blue' onClick={remarksUpdateHandler}>
         <Icon name='save'/> Update
        </Button>
       
      </Modal.Actions>
      <Modal style={{position:'relative', left:'420px', maxWidth:'400px'}}
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='tiny'
        >
          <Modal.Header>History</Modal.Header>
          <Modal.Content>
               <div style={{maxHeight:'150px', overflowY:'scroll'}}>
          { historyData && historyData.remarksHistory.map((item,idx)=>{
              return <> <p key={idx}
                           style={{fontSize:'12px'}}
                         > 
                          {` ${item.updatedDateTime} , ${item.updatedUser}`} 
                          </p>
                       <Form.TextArea  disabled value={ ` ${item.remarks} `} style={{width:'100%'}}>  
                     
                      </Form.TextArea>
                    </>
            })
             }
           </div>

            
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='check'
              content='Close'
              onClick={() => setSecondOpen(false)}
            />
          </Modal.Actions>
        </Modal>
    </Modal>
    
         
        <Modal style={{maxWidth:'450px'}}
        closeIcon
        dimmer='blurring'
        open={open}
        //  trigger={modal}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='archive' content={`${modalOrgName} - Users`} />
        <Modal.Content >
         <Table celled>
           <Table.Header>
             <Table.Row textAlign='center'>
             <Table.HeaderCell>User Id</Table.HeaderCell>
             <Table.HeaderCell>Password</Table.HeaderCell>
             </Table.Row>
           </Table.Header>
           <Table.Body>
                {  usersData &&
                  usersData.users.map((user)=> {
                  
                return (
                  <>
                     <Table.Row>
                    <Table.HeaderCell textAlign='center'  colSpan={2}> {user.userLevel}</Table.HeaderCell>
                    </Table.Row>
                  {user.userList.map((user)=>{
                      return <> 
                              <Table.Row>  
                              <Table.Cell>{user.userId}</Table.Cell>
                     
                              <Table.Cell>{user.password}</Table.Cell>
                             </Table.Row>
                            
                      </>
                    })}   
                   </> 
                 
                    )
                   }
                
                )} 
                   
           </Table.Body>
         </Table>
        </Modal.Content>
        <Modal.Actions> 
        </Modal.Actions>
      </Modal>
           <Grid>  
             <Grid.Row className='row-container'>
            

             <Grid.Row columns={1}  style={orgPadding}
           
           >    
                    
                  <Grid.Column itemsPerRow={4}>
                  <Card.Group >  
                  <Card raised  key='nooforg' style={orgStyle}>     
                       <Card.Content>
                       Organisations <br/>
                        {
                        dashboardData.response.noOfOrganizations
                       }     
                   </Card.Content>
                   </Card>
                   <Card raised   key='newOrg' style={orgStyle}>     
                       <Card.Content>
                       New Organisation<br/>
                      
                    { 
                    dashboardData.response.newOrganizations
                   }
                   </Card.Content>
                   </Card> 
                   <Card raised key='Property' style={orgStyle}>
                      <Card.Content>
                     
                     Properties<br/>
                     {
                     dashboardData.response.noOfProperties
                    }
                  
                  </Card.Content>
                       
                   </Card>
                   <Card raised key='newProp' style={orgStyle}>  
                         <Card.Content>   
                       New Properties<br/>
                       {
                        dashboardData.response.newProperties
                      }
                      </Card.Content>
                   </Card>  
                   </Card.Group>
                   </Grid.Column> 
                                                                   {   /* starts search header starts */ 
                                                                     }
                <Grid.Column style={{marginTop:'10px'}}> 
                  <div style={{float:'left', width:'500px'}}>
               <Form.Group inline>
               
                 <Input  style={{width:'220px',marginRight:'5px'}}
                 onChange ={(e)=>setSearchEnetered(e.target.value)}
               type="text" placeholder="Search by Organization Name" />
                
                <Button color='blue' onClick={searchHandler}>Search</Button> 
         
            
                </Form.Group> 
             
              </div>
              
                  <div style={{display:'inline',marginTop:'5px'}}>  
                  <div style={{float:'left', width:'370px'}}>
                    <label>Select </label>
                  <Dropdown placeholder=''
              // text='Select'
               style={{margin:'10px'}}
              defaultValue={25}
              placeholder='25'
              options={options}
                  onChange={(e, data)=>setNoOfRows(data.value)} 
              /> 
                  { orgData.response &&
            <Pagination 
               size='small'
               boundaryRange={null}
               defaultActivePage={1}
               ellipsisItem={null}
               firstItem={null}
               lastItem={orgData.response.paginationDetail.totalPages}
               siblingRange={1}
               totalPages={orgData.response.paginationDetail.totalPages}
               onPageChange={changePageHandler}
             >  
             </Pagination>} 
             </div>
             </div>

               <Link to='/NewOrganization' style={{marginLeft:'10px', paddingLeft:'50px'}}> 
                <Button color='blue' size="small"> + New Organization</Button></Link>  
          
          
           </Grid.Column>
           {
                                                                   /*
                                                                      starts search header ends
                                                                    */
                                                                   }
               
           </Grid.Row>
 


             </Grid.Row>
             
               
            
             <Grid.Row className='cardSection' style={{marginLeft:'10px'}}> 
             <Card.Group itemsPerRow={5} className='dash-card-links' centered>
             
            {  
             orgData.response &&
               orgData.response.organizationList.map((field, idx)=>{

               
                return(
                       <> 
                            <Card color='grey' key={field.organizationName} style={{marginLeft:'20px', width:'250px'}}
                           
                            >
                              <Card.Content>
                              <Image
                                  floated='left'
                                  style={{width:'50px'}}
                                  src={field.imageUrl}
                                />
                                 
                                <Card.Meta 
                                style={{ float:'right',color:'green'}}
                                 floated='right'
                                >{field.statusDisplayName}</Card.Meta>
                                <div
                                style={{float:'right'}}
                                >
                                <b style={{fontSize:'2vh'}}>{field.organizationName}</b><br/>
                                {field.city} <strong> -{field.state}</strong>
                                </div>
                                
                              </Card.Content>
                              <Card.Content extra>
                                {
                                //Working here  
                              }
                               
                                
                                <div>{  ViewUsers &&
                                 <Link to="" onClick={usersHandler.bind(this, field.organizationId,field.organizationName)} 
                                  style={{marginRight:'5%'}}
                                  >
                                    <Icon  name='users' color='blue' />
                                  <span>  Users </span>
                                  </Link> }
                                   
                                    
                                  <Link to=""  onClick={remarksHandler.bind(this, field.organizationId,field.organizationName)}
                                  style={{marginRight:'5%'}}
                                  >
                                    <Icon  name='write' color='blue' />
                                  <span>  Remarks </span>
                                  </Link>
                                     
                                   { Edit &&
                                  <Link to=""  
                                  style={{marginRight:'5%'}}
                                  >
                                    <Icon  name='edit' color='red' />
                                  <span>  Edit </span>
                                  </Link>
                                  } 
                                  {  View &&
                                  <Link to='' color='green'
                                  style={{marginRight:'5%'}}
                                  >
                                   <Icon  name='eye' color='green' />
                                   <span> View </span> 
                                  </Link>
                                  }
                                   { AddProperty && 
                                  <Link to='' color='red'
                                  style={{marginRight:'5%'}}
                                  >
                                     <Icon  name='add' color='yellow' /> 
                                     <span> Add Property</span> 
                                  </Link>
                                  }
                                </div>
                              </Card.Content>
                            </Card>              
                 </>  ) 
                      
               } ) 
            } 
             </Card.Group> 
           </Grid.Row>
             
                         <div style={{height:'600px'}}>
                       
                         </div> 
                       </Grid> 
         </Container>
      </>
    )}
    else{ return <h3>Loading ...</h3>}
}

export default Dashboard;

import { useState, useEffect,useReducer } from "react";
import { Link } from "react-router-dom";

const Sidenav = (props) => {
 
  const [style, setStyle] =useState({}) 
  const [date, setDate] = useState([]); 

  const styleReducer = (state, action) =>{

     if (action.type === 'Hide')
       return {transition: '0.3s', opacity:'0px'};
  }

  const [menuStyle, setMenuStyle] = useReducer(styleReducer,{transition: '0.3s'})

  const openMenu = () =>{
    setStyle({width:'250px', opacity:'1px'});
  }

  const closeMenu = () => {
    setStyle({width:'0px', opacity:'0px'});
  }



  const getDate = () =>{
 
    let updateDate= new Date().toLocaleString();
    console.log();
    setDate(updateDate)   
}
 
useEffect (()=>{
  setInterval(getDate,1000);
 
})
  
    return(
      <> 
        
        <div className="container-fluid"> 

            <div className='row'> 

                      <div className="sidenav" style={style}>
                      <span onClick={openMenu}>&#9776;</span>
                            <div className="closebtn"
                            onClick={closeMenu}
                            >X</div>
                            <h5 style={menuStyle}>User Name</h5>
                            {date}
                            <nav className='nav'>
                                  <ul>
                                    <li><Link to='/'>Menu 1</Link></li>
                                    <li><Link to='/roster'>Menu 2</Link></li>
                                    <li><Link to='/schedule'>Menu 3</Link></li>
                                    <li onClick={props.LogOut}>Log Out</li>
                                  </ul>
                            </nav>
                        
                            
                            </div>

            </div>


        </div>
      </>
    )
}

export default Sidenav;
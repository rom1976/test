import React,{useState} from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

 const Accord = () => {
  //state = { activeIndex: 0 }
  const [activeIndex,setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
   // const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index 
    setActiveIndex(newIndex);
   
  } 

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
         eeeeeee
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
         
        </Accordion.Content>

      </Accordion>
    )

 }
export default Accord;
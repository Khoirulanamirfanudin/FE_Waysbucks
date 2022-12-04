import React from 'react'
import { Stack } from "react-bootstrap";
import jumbotronRectangle from '../img/jumbotronRectangle.png'
import jumboImg from '../img/jumboImg.jpg'

const Waysbucks = () => {
    return(
        // eslint-disable-next-line jsx-a11y/alt-text
        <Stack direction="horizontal" gap={3}>
        <div className="jumboContainer">
          <div className="jumboRect">
              <p className="jumboTitle">WAYSBUCKS</p>
              <p className="jumboSubTitle">Things are changing, but we're still here for you</p>
              <p className="jumboDescription">We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available<br/><br/>Let's Order...</p>
              <img src={jumbotronRectangle} alt="" />
          </div>
          <div className="jumboImg">
              <img src={jumboImg} alt="" />
          </div>
        </div>  
      </Stack>
    )
}

export default Waysbucks
import React,{useState} from 'react'
import { Icon } from 'semantic-ui-react'

const Navbar = () => {
    return (
      <div className="ui top fixed menu inverted" style={{height:"70px"}}>
          <a class="item">Tasky</a>
          <div className="right menu">
            <a class="item">
              <Icon name="bell"/>
            </a>
            <a class="item">
              Logout
            </a>
          </div>
      </div>
    )
}

export default Navbar

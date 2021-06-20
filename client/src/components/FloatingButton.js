import React from 'react'
import { Button as Btn } from "react-floating-action-button";

const FloatingButton = ({onClick}) => {
    return (
        <div style={{ position: "fixed", top: "85%", left: "76%" }}>
        <Btn
          tooltip="Add a project"
          icon="fas fa-plus"
          rotate={false}
          onClick={onClick}
        />
      </div>
    )
}

export default FloatingButton

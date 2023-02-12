import React from "react";
import { CardLayout } from "./UtilStyled";

const Card = ({ children, color, position }) => {
  if (position) {
    return (
      <CardLayout color={color} position={position}>
        {children}
      </CardLayout>
    );
  } else {
    return <CardLayout color={color}>{children}</CardLayout>;
  }
};

export default Card;

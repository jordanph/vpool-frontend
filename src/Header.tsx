import React from "react";
import { Typography } from "@material-ui/core";
import vPoolImage from "./images/vpool.svg";
import AlphaBadge from "./AlphaBadge";

const Header = () => {
  return (
    <div
      style={{
        width: 500,
        margin: "20px auto",
        padding: 10
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "rgb(123, 123, 123)", paddingLeft: 20 }}
      >
        <img style={{ height: 18, marginRight: 10 }} src={vPoolImage} />
        <span>
          V-POOL <AlphaBadge />
        </span>
      </Typography>
    </div>
  );
};

export default Header;

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import "../index.css";


const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    padding: "10px 20px",
    borderRadius: "20px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    right: "0px"
  },
});


class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="text-center">
        <div className="header-container">
          <img src="https://www.solpromo.com/wp-content/uploads/2018/09/logo_hor2.png" className="header-img" alt="Logo" />
          <div className="header-links">
            <Button variant="contained" color="primary" href="/registrar-cliente" className={classes.button}>Registrar Cliente</Button>
            <Button variant="contained" color="primary" href="/api/cliente" className={classes.button}> API</Button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default withStyles(styles)(Header); 
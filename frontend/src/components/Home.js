import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import NewClienteModal from "./NewClienteModal";
import ClienteList from "./ClienteList";

import axios from "axios";

import { CLIENTE_API_URL } from "../constants";

class Home extends Component {
  state = {
    clientes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getClientes = () => {
    axios.get(CLIENTE_API_URL).then(res => this.setState({ clientes: res.data }));
  };

  resetState = () => {
    this.getClientes();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <ClienteList
              clientes={this.state.clientes}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewClienteModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
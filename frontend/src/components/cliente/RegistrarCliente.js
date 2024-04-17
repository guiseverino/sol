import React from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";

import axios from "axios";

import { CLIENTE_API_URL } from "../../constants";
import "../index.css"
class RegistrarCliente extends React.Component {
  state = {
    id: 0,
    cnpj: "",
    razao_social: "",
    email: "",
    cep: "",
    logradouro: "",
    complemento: "",
    municipio: "",
    uf: "",
    faturamento: "",
    site: "",
    ddd: "",
    telefone: "",
    error: null,
    fieldErrors: {},
  };
  resetForm = () => {
    this.setState({
      id: 0,
      cnpj: "",
      razao_social: "",
      email: "",
      cep: "",
      logradouro: "",
      complemento: "",
      municipio: "",
      uf: "",
      faturamento: "",
      site: "",
      ddd: "",
      telefone: "",
      error: null,
      fieldErrors: {},
    });
  };
  validateForm = () => {
    const { cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, faturamento, site, ddd, telefone } = this.state;
    const errors = {};

    const isValidCnpj = (cnpj) => {
      return /^\d{14}$/.test(cnpj);
    };
    const isValidCep = (cep) => {
      return /^\d{8}$/.test(cep);
    };

    if (!cnpj || !isValidCnpj(cnpj)) {
      errors.cnpj = "O CNPJ é inválido";
    }

    if (!razao_social) {
      errors.razao_social = "A razão social é inválida";
    }

    if (!email) {
      errors.email = "O email é inválido";
    }

    if (!cep || !isValidCep(cep)) {
      errors.cep = "O CEP é inválido";
    }

    if (!logradouro) {
      errors.logradouro = "O logradouro é inválido";
    }

    if (!complemento) {
      errors.complemento = "O complemento é inválido";
    }

    if (!municipio) {
      errors.municipio = "O município é inválido";
    }

    if (!uf) {
      errors.uf = "O UF é inválido";
    }

    if (!faturamento) {
      errors.faturamento = "O faturamento é inválido";
    }
    if (!site) {
      errors.site = "O Site é inválido";
    }
    if (!ddd) {
      errors.ddd = "O ddd é inválido";
    }
    if (!telefone) {
      errors.telefone = "O ddd é inválido";
    }

    return errors;
  };
  handleCnpjChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 14); // Remove não dígitos e limita a 14 caracteres
    this.setState({ cnpj: value });
  };
  handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    this.setState({ cep: value });
  };
  componentDidMount() {
    if (this.props.cliente) {
      const { id, cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, faturamento,site,ddd,telefone } = this.props.cliente;
      this.setState({ id, cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, faturamento,site,ddd,telefone });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createCliente = (e) => {
    e.preventDefault();

    const fieldErrors = this.validateForm();

    if (Object.keys(fieldErrors).length === 0) {
      axios
        .post(CLIENTE_API_URL, this.state)
        .then(() => {
          this.resetForm();
          this.props.resetState();
          this.props.toggle();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.setState({
              fieldErrors: error.response.data.details,
              error: "Erro de validação. Corrija os campos indicados.",
            });
          } else {
            this.setState({
              error: "Erro ao processar a solicitação. Tente novamente mais tarde.",
            });
          }
        });
    } else {
      this.setState({ fieldErrors });
    }
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    const { fieldErrors } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form onSubmit={this.props.cliente ? this.editCliente : this.createCliente} style={{ border: '2px solid black', padding: '20px', borderRadius: '5px', alignItems: 'center' }}>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label for="cnpj">Cnpj:</Label>
              <Input
                type="text"
                name="cnpj"
                onChange={this.handleCnpjChange}
                value={this.defaultIfEmpty(this.state.cnpj)}
              />
              {fieldErrors.cnpj && <div className="alert alert-danger">{fieldErrors.cnpj}</div>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="razao_social">Razao Social:</Label>
              <Input
                type="text"
                name="razao_social"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.razao_social)}
              />
              {fieldErrors.razao_social && <div className="alert alert-danger">{fieldErrors.razao_social}</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.email)}
              />
              {fieldErrors.email && <div className="alert alert-danger">{fieldErrors.email}</div>}
            </FormGroup>
          </Col>
          <Col md={1}>

            <FormGroup>
              <Label for="ddd">Ddd:</Label>
              <Input
                type="text"
                name="ddd"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.ddd)}
              />
              {fieldErrors.ddd && <div className="alert alert-danger">{fieldErrors.faturamento}</div>}
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for="telefone">Telefone:</Label>
              <Input
                type="text"
                name="telefone"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.telefone)}
              />
              {fieldErrors.telefone && <div className="alert alert-danger">{fieldErrors.faturamento}</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="site">Site:</Label>
              <Input
                type="text"
                name="site"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.site)}
              />
              {fieldErrors.site && <div className="alert alert-danger">{fieldErrors.faturamento}</div>}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="faturamento">Faturamento:</Label>
              <Input
                type="text"
                name="faturamento"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.faturamento)}
              />
              {fieldErrors.faturamento && <div className="alert alert-danger">{fieldErrors.faturamento}</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="cep">Cep:</Label>
              <Input
                type="text"
                name="cep"
                onChange={this.handleCepChange}
                value={this.defaultIfEmpty(this.state.cep)}
              />
              {fieldErrors.cep && <div className="alert alert-danger">{fieldErrors.cep}</div>}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="uf">Uf:</Label>
              <Input
                type="text"
                name="uf"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.uf)}
              />
              {fieldErrors.uf && <div className="alert alert-danger">{fieldErrors.uf}</div>}
            </FormGroup>
          </Col>
          <Col md={3}>

            <FormGroup>
              <Label for="municipio">Municipio:</Label>
              <Input
                type="text"
                name="municipio"
                onChange={this.onChange}
                value={this.defaultIfEmpty(this.state.municipio)}
              />
              {fieldErrors.municipio && <div className="alert alert-danger">{fieldErrors.municipio}</div>}
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="logradouro">Logradouro:</Label>
          <Input
            type="text"
            name="logradouro"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.logradouro)}
            style={{ width: '400px', height: '40px' }}

          />
          {fieldErrors.logradouro && <div className="alert alert-danger">{fieldErrors.logradouro}</div>}

        </FormGroup>
        <FormGroup>
          <Label for="complemento">Complemento:</Label>
          <Input
            type="text"
            name="complemento"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.complemento)}
            style={{ width: '400px', height: '40px' }}
          />
          {fieldErrors.complemento && <div className="alert alert-danger">{fieldErrors.complemento}</div>}

        </FormGroup>
        <FormGroup>
          <Label for="site">Site:</Label>
          <Input
            type="text"
            name="site"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.site)}
            style={{ width: '400px', height: '40px' }}
          />
        </FormGroup>
        <Button>Registrar</Button>
      </Form>
      </div>
    );
  }
}

export default RegistrarCliente;
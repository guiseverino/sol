import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { CLIENTE_API_URL } from "../constants";

class NewClienteForm extends React.Component {
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
      const { id, cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, faturamento, site, ddd, telefone } = this.props.cliente;
      this.setState({ id, cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, faturamento, site, ddd, telefone });
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

  editCliente = e => {
    e.preventDefault();

    const fieldErrors = this.validateForm();

    if (Object.keys(fieldErrors).length === 0) {
      axios
        .put(CLIENTE_API_URL + this.state.id +'/', this.state)
        .then(() => {
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
      <Form onSubmit={this.props.cliente ? this.editCliente : this.createCliente}>
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
        <FormGroup>
          <Label for="logradouro">Logradouro:</Label>
          <Input
            type="text"
            name="logradouro"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.logradouro)}
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
          />
          {fieldErrors.complemento && <div className="alert alert-danger">{fieldErrors.complemento}</div>}

        </FormGroup>
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
        <FormGroup>
          <Label for="site">Site:</Label>
          <Input
            type="text"
            name="site"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.site)}
          />
          {fieldErrors.site && <div className="alert alert-danger">{fieldErrors.site}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="ddd">Ddd:</Label>
          <Input
            type="text"
            name="ddd"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.ddd)}
          />
          {fieldErrors.ddd && <div className="alert alert-danger">{fieldErrors.ddd}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="telefone">Telefone:</Label>
          <Input
            type="text"
            name="telefone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.telefone)}
          />
          {fieldErrors.telefone && <div className="alert alert-danger">{fieldErrors.telefone}</div>}
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewClienteForm;
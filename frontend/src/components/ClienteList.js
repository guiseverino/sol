import React, { Component } from "react";
import { Table } from "reactstrap";
import NewClienteModal from "./NewClienteModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import "./index.css"; 
class ClienteList extends Component {
  render() {
    const clientes = this.props.clientes;
    return (
      <div className="table-container">
        <Table bordered dark hover>
          <thead className="table-header">
            <tr>
              <th>Idcliente</th>
              <th>Cnpj</th>
              <th>Razao Social</th>
              <th>Email</th>
              <th>Cep</th>
              <th>Logradouro</th>
              <th>Complemento</th>
              <th>Municipio</th>
              <th>Uf</th>
              <th>Faturamento</th>
              <th>Site</th>
              <th>ddd</th>
              <th>Telefone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!clientes || clientes.length <= 0 ? (
              <tr>
                <td colSpan="14" className="table-cell">
                  <b>Ops, no one here yet</b>
                </td>
              </tr>
            ) : (
              clientes.map(cliente => (
                <tr key={cliente.id} className="table-row">
                  <td className="table-cell">{cliente.id}</td>
                  <td className="table-cell">{cliente.cnpj}</td>
                  <td className="table-cell">{cliente.razao_social}</td>
                  <td className="table-cell">{cliente.email}</td>
                  <td className="table-cell">{cliente.cep}</td>
                  <td className="table-cell">{cliente.logradouro}</td>
                  <td className="table-cell">{cliente.complemento}</td>
                  <td className="table-cell">{cliente.municipio}</td>
                  <td className="table-cell">{cliente.uf}</td>
                  <td className="table-cell">{cliente.faturamento}</td>
                  <td className="table-cell">{cliente.site}</td>
                  <td className="table-cell">{cliente.ddd}</td>
                  <td className="table-cell">{cliente.telefone}</td>
                  <td className="table-cell">
                    <div className="table-actions">
                      <NewClienteModal
                        create={false}
                        cliente={cliente}
                        resetState={this.props.resetState}
                      />
                      <span className="espaco-botoes"></span>
                      <ConfirmRemovalModal
                        id={cliente.id}
                        resetState={this.props.resetState}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ClienteList;

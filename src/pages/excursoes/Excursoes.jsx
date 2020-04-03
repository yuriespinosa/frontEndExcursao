import React from 'react';
import { Button, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import CurrencyFormat from 'react-currency-format';

class Excursoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      excursoes: [],
      veiculos: [],
    };
    this.deleteExcursao = this.deleteExcursao.bind(this);
    this.exibirExcursao = this.exibirExcursao.bind(this);
    this.updateExcursao = this.updateExcursao.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:3000/excursaos', { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => this.setState({ excursoes: resp }))
  }

  deleteExcursao(id) {
    fetch(`http://localhost:3000/excursaos/${id}`, {
      method: 'DELETE',
    })
      .then((resp) => {
        if (resp.status !== 204) {
          throw new Error();
        }
      })
      .then(() => this.fetchData())
      .catch(() => alert('ERROR'));
  }

  exibirExcursao(id) {
    fetch(`http://localhost:3000/excursaos/${id}`, {
      method: 'GET',
    })
      .then((resp) => {
        if (resp.status !== 204) {
          throw new Error();
        }
      })
      .then(() => this.fetchData())
      .catch((resp) => console.log("erro"));
  }

  updateExcursao(nome, partida, chegada, veiculo_id, qtdveiculos, destino) {
    fetch(`http://localhost:3000/excursaos/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ nome, partida, chegada, veiculo_id, qtdveiculos, destino }),
      headers: {
        "content-type": "application/json",
      }
    })
      .then((resp) => {
        if (resp.status !== 204) {
          throw new Error();
        }
      })
      .then(() => this.setState({ success: true }))
      .catch((resp) => this.setState({ error: true }));
  }


  fetchVeiculos() {
    fetch('http://localhost:3000/veiculos', { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => this.setState({ veiculos: resp }))
  }

  render() {
    return (
      <div>
        <Table>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Partida</th>
            <th>Data de Chegada</th>
            <th>Veículo</th>
            <th>Número de Veículos</th>
            <th>Destino</th>
            <th>Valor Final</th>
          </tr>
          {this.state.excursoes.map((excursao) => {
            return (
              <tr key={excursao.id}>
                <td>{excursao.id}</td>
                <td>{excursao.nome}</td>
                <td>{formatDate(excursao.partida)}</td>
                <td>{formatDate(excursao.chegada)}</td>
                <td>{excursao.veiculo}</td>
                <td>{excursao.qtdveiculos}</td>
                <td>{excursao.destino}</td>
                <td><CurrencyFormat value={excursao.valorfinal} displayType={'text'} thousandSeparator={true} prefix={'R$'} renderText={value => <div>{value}</div>} /></td>
                <td>{<Link to={`/excursoes/${excursao.id}/editar`} onClick={() => { this.updateExcursao(excursao.id) }}>Update</Link>}</td>
                <td>{<Link to={`/excursoes/${excursao.id}`} onClick={() => { this.exibirExcursao(excursao.id) }}>Visualização Individual</Link>}</td>
                <td><a onClick={() => { this.deleteExcursao(excursao.id) }}>Excluir</a></td>
              </tr>
            );
          })}
        </Table>
        <Link to="/excursoes/criar">
          <Button>Criar Excursao</Button>
        </Link>
      </div>
    );
  }
};

export default withRouter(Excursoes);

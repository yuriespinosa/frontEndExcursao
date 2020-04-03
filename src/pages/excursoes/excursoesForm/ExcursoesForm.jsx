import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';


class ExcursoesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      partida: '',
      chegada: '',
      veiculo_id: '',
      veiculos: [],
      qtdveiculos: '',
      destino: '',
      success: false,
      error: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchVeiculos();
    if (this.props.match.params.id) {
      this.fetchExcursoes();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClick() {
    const { nome, partida, chegada, veiculo_id, qtdveiculos, destino } = this.state;
    this.props.match.params.id ? this.updateExcursao(nome, partida, chegada, veiculo_id, qtdveiculos, destino) : this.createExcursao(nome, partida, chegada, veiculo_id, qtdveiculos, destino);
  }

  fetchVeiculos() {
    fetch('http://localhost:3000/veiculos', { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => this.setState({ veiculos: resp }))
  }

  fetchExcursoes() {
    fetch('http://localhost:3000/excursaos', { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => this.setState({ excursoes: resp }))
  }

  createExcursao(nome, partida, chegada, veiculo_id, qtdveiculos, destino) {
    fetch('http:///localhost:3000/excursaos', {
      method: 'POST',
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

  render() {
    const { success, error } = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input onChange={this.onChange} type="text" name="nome" id="nome" placeholder="Digite o nome da excursão" />
          </FormGroup>

          <FormGroup>
            <Label for="partida">Data de Partida</Label>
            <Input onChange={this.onChange} type="date" name="partida" id="partida" placeholder="Data de Partida" />
          </FormGroup>

          <FormGroup>
            <Label for="chegada">Data de Chegada</Label>
            <Input onChange={this.onChange} type="date" name="chegada" id="chegada" placeholder="Data de chegada" />
          </FormGroup>

          <FormGroup>
            <Label for="veiculo_id">Veículo</Label>
            <Input onChange={this.onChange} type="select" name="veiculo_id" id="veiculo_id">
              <option value=""></option>
              {this.state.veiculos.map((veiculo) => {
                return <option key={veiculo.id} value={veiculo.id}>{veiculo.nome}</option>
              })}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="qtdveiculos">Quantidade de Veículos</Label>
            <Input onChange={this.onChange} type="number" name="qtdveiculos" id="qtdveiculos" placeholder="Digite o número de veículos" />
          </FormGroup>

          <FormGroup>
            <Label for="destino">Destino Final da Excursão</Label>
            <Input onChange={this.onChange} type="text" name="destino" id="destino" placeholder="Digite o destino final da excursão" />
          </FormGroup>

          <Button onClick={this.onClick}>Criar Excursão</Button>
        </Form>
        {success && <Redirect to="/excursoes" />}
      </div>
    );
  }
};

export default withRouter(ExcursoesForm);
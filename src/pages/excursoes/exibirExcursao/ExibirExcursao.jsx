import React, { Component } from 'react';
import { Table, Col, Row, Container, Alert } from 'reactstrap';
import { Redirect, withRouter } from "react-router-dom";
import formatDate from "../../../helpers/formatDate";
import CurrencyFormat from "react-currency-format";



class ExibirExcursao extends Component {

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
            excursoes: [],
            success: false,
            error: false,

        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const { valorfinal } = this.state;
        this.fetchVeiculos();
        this.getValorFinal(valorfinal);
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
        fetch(`http://localhost:3000/excursaos/${this.props.match.params.id}`, {
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((resp) => this.setState({ nome: resp.nome, partida: resp.partida, chegada: resp.chegada, veiculo_id: resp.veiculo_id, qtdveiculos: resp.qtdveiculos, destino: resp.destino }))
            .catch(() => this.setState({ error: true }));
    }

    getValorFinal(valorfinal) {
        fetch(`http://localhost:3000/excursaos/${this.props.match.params.id}`, {
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((resp) => this.setState({ valorfinal: resp.valorfinal }))
            .catch(() => this.setState({ error: true }));
    }

    render() {

        const { success, error } = this.state;

        return (
            <div>
                <Container>
                    <Row>
                        <Col md="12">
                            {error && <Alert color="danger">ERROR</Alert>}
                        </Col>
                    </Row>
                    <Table>
                        <td>
                            <tr>Nome da Excursão: {this.state.nome} </tr>
                            <tr>Data de Partida: {formatDate(this.state.partida)} </tr>
                            <tr>Data de Chegada: {formatDate(this.state.chegada)} </tr>
                            <tr>ID do Veículo: {this.state.veiculo_id} </tr>
                            <tr>Quantidade de Veículos: {this.state.qtdveiculos} </tr>
                            <tr>Destino Final: {this.state.destino} </tr>
                            <tr>Valor Máximo: <CurrencyFormat value={this.state.valorfinal} displayType={'text'} thousandSeparator={true} prefix={'R$'} renderText={value => <div>{value}</div>} /></tr>
                        </td>
                    </Table>
                    {success && <Redirect to="/excursoes" />}
                </Container>
            </div>
        );
    }
}

export default withRouter(ExibirExcursao);
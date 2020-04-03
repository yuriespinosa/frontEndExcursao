import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Alert, Container, Form, FormGroup, Input, Label, Button, Col, Row } from 'reactstrap';

class VeiculoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            limite_passageiro: '',
            valor: '',
            success: false,
            error: false,
        };

        if (this.props.match.params.id) {
            this.fetchVeiculo();
        }

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    fetchVeiculo() {
        fetch(`http://localhost:3000/veiculos/${this.props.match.params.id}`, {
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((resp) => this.setState({ nome: resp.nome, limite_passageiro: resp.limite_passageiro, valor: resp.valor }))
            .catch(() => this.setState({ error: true }));
    }

    createVeiculo(nome, limite_passageiro, valor) {
        fetch('http://localhost:3000/veiculos', {
            method: 'POST',
            body: JSON.stringify({ nome, limite_passageiro, valor }),
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


    updateVeiculo(nome, limite_passageiro, valor) {
        fetch(`http://localhost:3000/veiculos/${this.props.match.params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ nome, limite_passageiro, valor }),
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

    onClick(e) {
        e.preventDefault();
        const { nome, limite_passageiro, valor } = this.state;
        console.log(this.state)
        this.props.match.params.id ? this.updateVeiculo(nome, limite_passageiro, valor) : this.createVeiculo(nome, limite_passageiro, valor);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { success, error } = this.state;
        return (
            <Container>
                <Row>
                    <Col md="12">
                        {error && <Alert color="danger">ERRO</Alert>}
                    </Col>
                </Row>

                <Form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input defaultValue={this.state.nome} onChange={this.onChange} type="text" name="nome" id="nome" placeholder="Digite o nome do veículo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="limite_passageiros">Limite de Passageiros</Label>
                        <Input defaultValue={this.state.limite_passageiro} onChange={this.onChange} type="text" name="limite_passageiro" id="limite_passageiro" placeholder="Digite o limite de passageiros" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="valor">Valor dos Assentos</Label>
                        <Input defaultValue={this.state.valor} onChange={this.onChange} type="text" name="valor" id="valor" placeholder="Digite o valor dos assentos" />
                    </FormGroup>
                    <Button onClick={this.onClick}>Criar</Button>

                </Form>
                {success && <Redirect to="/veiculos" />}
            </Container>
        );
    }
}

export default withRouter(VeiculoForm);
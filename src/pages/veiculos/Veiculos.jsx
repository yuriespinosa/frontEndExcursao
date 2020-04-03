import React from 'react';
import { Link } from "react-router-dom";
import { Table, Container, Row, Col, Button } from 'reactstrap';
import VeiculoRow from "../../components/veiculoRow/VeiculoRow";


class Veiculos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            veiculos: [],
        };
    };

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        fetch('http://localhost:3000/veiculos', { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => this.setState({ veiculos: resp }))
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <h1>Veículos</h1>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Limite Passageiros</th>
                                    <th>Valor do Assento</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.veiculos.map((veiculo) => {
                                    return <VeiculoRow key={veiculo.id} id={veiculo.id} nome={veiculo.nome} limite_passageiro={veiculo.limite_passageiro} valor={veiculo.valor} />;
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/veiculos/criar">
                            <Button>Criar Veículo</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }

};

export default Veiculos;

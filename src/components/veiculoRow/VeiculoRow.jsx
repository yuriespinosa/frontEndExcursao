import React from 'react';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";

const VeiculoRow = ({ id, nome, limite_passageiro, valor }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{nome}</td>
            <td>{limite_passageiro}</td>
            <td>{valor}</td>
            <td>{<Link to={`/veiculos/${id}`}>Editar</Link>}</td>
        </tr>
    );
};

VeiculoRow.propTypes = {
    id: propTypes.number,
    nome: propTypes.string,
    limite_passageiro: propTypes.number,
    valor: propTypes.number,
};

export default VeiculoRow;
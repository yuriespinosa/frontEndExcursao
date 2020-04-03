import React from 'react';
import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Veiculos from './pages/veiculos/Veiculos';
import Excursoes from './pages/excursoes/Excursoes';
import Home from './pages/home/Home';
import VeiculoForm from './pages/veiculos/veiculoForm/VeiculoForm';
import ExcursaoForm from './pages/excursoes/excursoesForm/ExcursoesForm';
import ExibirExcursao from './pages/excursoes/exibirExcursao/ExibirExcursao';

function App() {
  return (
    <Router>
      <Header />

      <Switch>

        <Route path="/excursoes/criar">
          <ExcursaoForm />
        </Route>

        <Route path="/excursoes/:id/editar">
          <ExcursaoForm />
        </Route>

        <Route path="/excursoes/:id">
          <ExibirExcursao />
        </Route>

        <Route path="/excursoes">
          <Excursoes />
        </Route>

        <Route path="/veiculos/criar">
          <VeiculoForm />
        </Route>

        <Route path="/veiculos/:id">
          <VeiculoForm />
        </Route>

        <Route path="/veiculos">
          <Veiculos />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;

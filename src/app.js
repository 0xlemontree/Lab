import React, { Component } from "react";
import { Container } from "react-bootstrap";

import Plate from "./plate";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Plate />
      </Container>
    );
  }
}

export default App;

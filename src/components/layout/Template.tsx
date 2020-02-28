import React, { Component } from 'react';
import Navbar from './Navbar';

interface Props {
  title?: string;  
}

class Template extends Component<Props> {
  render(): JSX.Element {
    return (
      <>
        <Navbar />
      </>
    );
  }
}

export default Template;

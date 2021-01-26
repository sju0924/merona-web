import React, {Component} from 'react';

import Page from './components/Page';


class Main extends Component {
  render() {
      return (
          <div>
              <Page/>
              {this.props.children}
          </div>
      );

  }
}



export default Main;
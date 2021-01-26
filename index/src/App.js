import React, {Component} from 'react';

import Header from './components/Header';
import Page from './components/Page';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );

    }
}
ㄴ



export default App;
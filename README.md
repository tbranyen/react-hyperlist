# React HyperList

This is a simple component that can be dropped into any React application and
provide a virtual scrolling area that is highly performant and lightweight.

## Installation

```sh
npm install react-hyperlist --save
```

Of course it can also just be added to any project since it consists of a
single JavaScript file.

## Usage

Using this component is relatively easy compared to other solutions in the
React space.

[**Click here to learn more about HyperList and its options!**](https://github.com/tbranyen/hyperlist)

``` js
import React, { Component } from 'react';
import HyperList from 'react-hyperlist';

class Container extends React.Component {
  render() {
    const { generate } = this;
    const { height } = this.state;
    const config = Object.assign({}, this.props, { height, generate });

    return (
      <HyperList {...config} />
    );
  }

  componentDidMount() {
    window.onresize = e => this.setState({ height: window.innerHeight });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  generate(i) {
    return (
      <div>i</div>
    );
  }
}
```

To render this component you could then specify the configuration as props:

``` js
ReactDOM.render((
  <Container
    height={window.innerHeight}
    itemHeight={50}
    total={100000}
    reverse={false}
  />
)), main);
```

**Required props**:

- `height` The value that is used on the container, if you use a string, it
  will read the offsetHeight from the container after setting the css. This way
  you can specify any unit and have it calculate correctly.
- `itemHeight` A single value that is the height for every single element in
  the list.
- `total` The number of items in the list.
- `generate` A function that is called with the index to render. You return an
  element to render in that position.

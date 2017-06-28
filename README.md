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

``` js
import React, { Component } from 'react';
import HyperList from 'react-hyperlist';

class Container extends React.Component {
  render() {
    return (
      <HyperList {...this.state} />
    );
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({ generate: this.generate }, props);
  }

  componentDidMount() {
    window.onresize = e => {
      this.state.height = window.innerHeight;
      this.setState(this.state);
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({ generate: this.generate }, nextProps));
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  generate(i) {
    return (
      <div>{i}</div>
    );
  }
}
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

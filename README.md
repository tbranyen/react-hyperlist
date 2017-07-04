# React HyperList

This is a simple component that can be dropped into any React application and
provide a virtual scrolling area that is highly performant and lightweight.

## Installation

```sh
npm install react-hyperlist --save
```

It can also just be added to any project since it consists of a single
JavaScript file.

## Usage

Using this component is relatively easy compared to other solutions. It is a
single Component that you give the bare minimum information to and it will call
a generate function per item to be rendered.

[**Click here to learn more about HyperList and its options!**](https://github.com/tbranyen/hyperlist)

``` js
import React, { Component } from 'react';
import HyperList from 'react-hyperlist';

class Container extends React.Component {
  render() {
    return (
      <HyperList
        height={window.innerHeight}
        itemHeight={50}
        total={100000}
        generate={i => (
          <div>i</div>
        )}
      />
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

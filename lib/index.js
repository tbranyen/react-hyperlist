import React, { Component } from 'react';
import HyperList from 'hyperlist';

export default class extends Component {
  render() {
    const { element, scroller, fragment } = this.state;

    // Ensure the scroller is relative in our app.
    scroller.style = Object.assign({}, scroller.style, {
      position: 'relative'
    });

    return (
      <div ref={node => (this.wrapperNode = node)} {...element}>
        <div {...scroller} />
        {fragment}
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = { element: {}, scroller: {}, fragment: [], };
  }

  componentDidMount() {
    const {
      height = window.innerHeight,
      itemHeight = 50,
      total = 0,
      reverse = false,
      generate = null,
    } = this.props;

    const config = {
      height,
      itemHeight,
      total,
      generate,

      isReact: true,
      useFragment: false,
      cloneElement: React.cloneElement,

      overrideScrollPosition: () => {
        return this.wrapperNode.scrollTop;
      },

      applyPatch: (element, fragment, scroller) => {
        this.setState({ element, fragment, scroller });
      },
    };

    this.list = HyperList.create(this, config);

    // Bind to the resize event, and since you should only ever have one
    // handler bound to this, we pave over whatever you had set before.
    window.onresize = e => {
      config.height = window.innerHeight;
      this.list.refresh(this, config);
    };
  }

  componentWillUnmount() {
    window.onresize = null;
    this.list.destroy();
  }
}

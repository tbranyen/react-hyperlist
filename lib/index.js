import React, { Component, cloneElement } from 'react';
import HyperList from 'hyperlist';

export default class extends Component {
  render() {
    const { component: Component = 'div' } = this.props;
    const { element, scroller, fragment } = this.state;

    return (
      <Component ref={node => (this.wrapperNode = node)} style={element.style}>
        <Component {...scroller} />
        {fragment}
      </Component>
    );
  }

  constructor(props) {
    super(props);

    const config = {
      width: '100%',
      height: '100%',
      itemHeight: 50,
      total: 0,
      reverse: false,
      isReact: true,
      useFragment: false,
      cloneElement,
    };

    this.state = { element: {}, scroller: {}, fragment: [], config, };
  }

  componentDidMount() {
    const { children, horizontal = false } = this.props;
    const isHoriz = horizontal;

    const {
      width = this.state.config.width,
      height = this.state.config.height,
      itemHeight,
      total,
      reverse,
      generate = typeof children === 'function' ? children : null,
      overrideScrollPosition = () => this.wrapperNode[scrollProp],
    } = this.props;

    const scrollProp = isHoriz ? 'scrollLeft' : 'scrollTop';

    const config = Object.assign({}, this.state.config, {
      width,
      height,
      itemHeight,
      total,
      generate,
      overrideScrollPosition,
      reverse,
      horizontal,

      applyPatch: (element, fragment, scroller) => {
        const scrollProp = isHoriz ? 'scrollLeft' : 'scrollTop';

        if (!this.state.element.style) {
          requestAnimationFrame(() => {
            this.wrapperNode[scrollProp] = element[scrollProp];
          });
        }

        this.setState({ element, fragment, scroller });
      },
    });

    this.list = HyperList.create(this, config);
    this.setState({ config });
  }

  componentWillReceiveProps(nextProps) {
    const config = Object.assign({}, this.state.config, nextProps);
    if (nextProps.total !== this.state.config.total) {
      this.list.refresh(this, config);
      this.setState({ config });
    }
  }

  componentWillUnmount() {
    if (this.list) {
      this.list.destroy();
    }
  }
}

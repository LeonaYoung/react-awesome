import * as React from 'react';
import getInjectors from './reducerInjectors';
import * as PropTypes from 'prop-types';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
/**
 * 动态注入reducer
 * 优点：效率高，相当于仅仅注入一个激活状态的reducer；
 * 缺点：在跨页面跳转时可能导致无法直接更新store;
 */
// tslint:disable-next-line: max-line-length
export default ({ key = '', reducer}) => (WrappedComponent) => {
  class ReducerInjector extends React.PureComponent {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName =
      `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    injectors = getInjectors(this.context.store);

    componentWillMount() {
      const { injectReducer } = this.injectors;
      console.log(key);
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

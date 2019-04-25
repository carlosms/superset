import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { expandRootIds, uastV2 } from 'uast-viewer';
import UASTViewerPane from './UASTViewerPane';

// Same values as the ones applied by withUASTEditor in CodeViewer.js
// https://github.com/bblfsh/uast-viewer/blob/v0.2.0/src/withUASTEditor.js#L208
const ROOT_IDS = [1];
const LEVELS_EXPAND = 2;

class UASTViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialFlatUast: this.transform(props.uast),
      showLocations: false,
    };

    this.handleShowLocationsChange = this.handleShowLocationsChange.bind(this);
  }

  handleShowLocationsChange() {
    this.setState({ showLocations: !this.state.showLocations });
  }

  // Applies the uast-viewer object shape transformer, and expands the first
  // 2 levels
  transform(uast) {
    const flatUAST = uastV2.transformer(uast);
    return expandRootIds(
      flatUAST,
      ROOT_IDS,
      LEVELS_EXPAND,
      uastV2.getChildrenIds,
    );
  }

  render() {
    const { initialFlatUast, loading } = this.state;
    const { showLocations } = this.state;
    const uastViewerProps = { initialFlatUast };

    return (
      <div className="pg-uast-viewer">
        <UASTViewerPane
          loading={loading}
          uastViewerProps={uastViewerProps}
          showLocations={showLocations}
          handleShowLocationsChange={this.handleShowLocationsChange}
        />
      </div>
    );
  }
}

UASTViewer.propTypes = {
  uast: PropTypes.array,
  protobufs: PropTypes.string,
};

export default UASTViewer;

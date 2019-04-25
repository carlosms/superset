import React from 'react';
import PropTypes from 'prop-types';
import FlatUASTViewer from 'uast-viewer';
import 'uast-viewer/dist/default-theme.css';
import '../stylesheets/UASTViewerPane.less';

const ROOT_ID = 1;

function getSearchResults(flatUast) {
  if (!flatUast) {
    return null;
  }

  const rootNode = flatUast[ROOT_ID];
  if (!rootNode) {
    return null;
  }

  if (Array.isArray(rootNode.n)) {
    return rootNode.n.map(c => c.id);
  }

  return null;
}

function NotFound() {
  return <div>Nothing found</div>;
}

function UASTViewerPane({
  loading,
  uastViewerProps,
  showLocations,
  handleShowLocationsChange,
}) {
  let content = null;

  const uast = uastViewerProps.flatUast || uastViewerProps.initialFlatUast;
  if (loading) {
    content = <div>loading...</div>;
  } else if (uast) {
    const searchResults = getSearchResults(uast);
    const rootIds = searchResults || [ROOT_ID];

    if (searchResults && !searchResults.length) {
      content = <NotFound />;
    } else {
      content = (
        <FlatUASTViewer
          {...uastViewerProps}
          rootIds={rootIds}
          showLocations={showLocations}
        />
      );
    }
  }

  return (
    <div className="uast-viewer-pane">
      <div className="show-locations-wrapper">
        <label htmlFor="showLocations">
          <input
            id="showLocations"
            type="checkbox"
            checked={showLocations}
            onChange={handleShowLocationsChange}
          />
          <span>Show locations</span>
        </label>
      </div>
      {content}
    </div>
  );
}

UASTViewerPane.propTypes = {
  loading: PropTypes.bool,
  uastViewerProps: PropTypes.object,
  showLocations: PropTypes.bool,
  handleShowLocationsChange: PropTypes.func.isRequired,
};

export default UASTViewerPane;

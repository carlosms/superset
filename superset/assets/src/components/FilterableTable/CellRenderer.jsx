import React from 'react';
import UASTButton from './UASTButton';

export default function cellRenderer({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex,
}) {
  const st = String(cellData);
  if (st.includes('"@pos"')) {
    return (<UASTButton uast={st} />);
  }

  return st;
}


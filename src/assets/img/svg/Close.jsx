import React from 'react';

const Close = ({setModal}) => {
  return (
    <svg onClick={() => setModal(false)} version="1.1" id="Capa_1" x="0px" y="0px"
      viewBox="0 0 28 28" style={{enableBackground: 'new 0 0 28 28'}}>
    <g>
      <path style={{fill: '#999'}} d="M0,24l4,4l10-10l10,10l4-4L18,14L28,4l-4-4L14,10L4,0L0,4l10,10L0,24z"/>
    </g>
    </svg>
  );
};

export default Close;
const Spinner = () => {
  return (
    <div style={{textAlign: 'center', width: '100%'}}>
      <svg style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="20%" height="20%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="rotate(0 50 50)">
        <rect x="37" y="11" rx="13" ry="20" width="26" height="40" fill="#fe718d">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="3.3333333333333335s" begin="-2.6666666666666665s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(72 50 50)">
        <rect x="37" y="11" rx="13" ry="20" width="26" height="40" fill="#fe718d">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="3.3333333333333335s" begin="-2s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(144 50 50)">
        <rect x="37" y="11" rx="13" ry="20" width="26" height="40" fill="#fe718d">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="3.3333333333333335s" begin="-1.3333333333333333s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(216 50 50)">
        <rect x="37" y="11" rx="13" ry="20" width="26" height="40" fill="#fe718d">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="3.3333333333333335s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(288 50 50)">
        <rect x="37" y="11" rx="13" ry="20" width="26" height="40" fill="#fe718d">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="3.3333333333333335s" begin="0s" repeatCount="indefinite"></animate>
        </rect>
      </g>
      </svg>
    </div>
  );
};

export default Spinner;
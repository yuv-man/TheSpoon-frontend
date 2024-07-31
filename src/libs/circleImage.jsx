// CircleImage.js
import React from 'react';
import { flags } from './flags';

function CircleImage({ teamName }) {
  const flagSrc = flags[teamName];

  if (!flagSrc) {
    return <div>Flag not found</div>;
  }

  return (
    <div style={{ width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden" }}>
      <img src={flagSrc} alt={`${teamName} Flag`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

export default CircleImage;

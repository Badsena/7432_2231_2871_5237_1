import React from 'react';

function Greeting({ name }) {
  return (
    <div>
      <h1 data-testid="greeting">Hello, {name || 'Guest'}!</h1>
    </div>
  );
}

export default Greeting;
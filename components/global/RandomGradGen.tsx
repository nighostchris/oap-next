import React from 'react';

const RandomGradGen : React.SFC = () => {
  const populate = (a: string) => {
    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    for (let i = 0; i < 6; i++) {
      const x = Math.round(Math.random() * 14);
      const y = hexValues[x];
      a += y;
    }
    return a;
  };

  const generate = () => {
    const newColor1 = populate('#');
    const newColor2 = populate('#');
    const angle = Math.round(Math.random() * 360);
    const gradient = `linear-gradient(${angle}deg, ${newColor1}, ${newColor2})`;
    return gradient;
  };

  const style = {
    width: '100%',
    height: '200px',
    background: generate(),
  };

  return (
    <div style={style} />
  );
};

export default RandomGradGen;

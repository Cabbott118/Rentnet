import React from 'react';

import Button from '@material-ui/core/Button';

export default function MyButton(props) {
  const { buttonText, variant, color, style, onClick, className } = props;
  return (
    <Button
      variant={variant}
      color={color}
      style={style}
      onClick={onClick}
      className={className}
    >
      {buttonText}
    </Button>
  );
}

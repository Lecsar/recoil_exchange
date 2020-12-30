import {CSSProperties} from 'react';

interface IProps {
  style?: CSSProperties;
  text: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export const Button = ({style, text, isDisabled, onClick}: IProps) => {
  return (
    <button style={style} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
};

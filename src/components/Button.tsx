interface IProps {
  text: string;
  onClick: () => void;
}

export const Button = ({text, onClick}: IProps) => {
  return <button onClick={onClick}>{text}</button>;
};

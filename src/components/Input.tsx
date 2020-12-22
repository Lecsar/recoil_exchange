import {ChangeEvent, CSSProperties, useCallback, useState} from 'react';

interface IProps {
  style?: CSSProperties;
  initialValue?: string;
  onChange?: (value: string) => void;
}

export const Input = ({style, initialValue = '', onChange}: IProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  return <input style={style} value={value} onChange={handleChange} />;
};

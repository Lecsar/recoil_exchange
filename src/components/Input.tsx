import {ChangeEvent, CSSProperties, useCallback, useState} from 'react';

interface IProps {
  style?: CSSProperties;
  initialValue?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
}

export const Input = ({style, label, placeholder, initialValue = '', onChange}: IProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  return (
    <div>
      {label && <label style={{marginRight: 5}}>{label}</label>}
      <input style={style} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

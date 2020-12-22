import {ChangeEvent, CSSProperties, useCallback} from 'react';

interface IProps<Option> {
  style?: CSSProperties;
  selectedOption?: Option;
  options: Option[];
  onChange: (option: Option) => void;
  getOptionId?: (option: Option) => string | number;
  getOptionName?: (option: Option) => string;
}

export const Select = <Option extends unknown>({
  style,
  selectedOption,
  options,
  onChange,
  getOptionId = (option) => option as string | number,
  getOptionName = (option) => option as string,
}: IProps<Option>) => {
  const selectedOptionIndex = selectedOption
    ? options.findIndex((option) => getOptionId(selectedOption) === getOptionId(option))
    : -1;

  const handleChange = useCallback(
    ({target}: ChangeEvent<HTMLSelectElement>) => {
      const selectedOptionIndex = Number(target.value);
      onChange(options[selectedOptionIndex]);
    },
    [onChange, options]
  );

  return (
    <select style={style} value={String(selectedOptionIndex)} onChange={handleChange}>
      {options.map((option, index) => {
        const id = getOptionId(option);
        const name = getOptionName(option);

        return (
          <option key={id} value={String(index)}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

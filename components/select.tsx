import styled from 'styled-components';

interface SelectProps {
  options: string[];
  onChange: any;
}
const Select: React.FC<SelectProps> = ({ options, onChange }) => (
  <SelectElement onChange={onChange}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </SelectElement>
);
export default Select;

const SelectElement = styled.select`
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  width: 8rem;
  height: 2rem;
  border-radius: 0.35rem;
  text-transform: capitalize;
`;

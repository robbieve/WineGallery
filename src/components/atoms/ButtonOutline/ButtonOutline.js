import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';

const ButtonOutline = styled.button`
  display: inline-block;
  color: ${colors.black};
  background-color: ${colors.white};
  text-align: center;
  user-select: none;
  background-color: ${colors.black};
  border: 1px solid ${colors.black};
  padding: 11.5px 15px;
  font-size: 10px;
  line-height: 1.5;
  cursor: pointer;
  text-transform: uppercase;
  font-family: ${fonts.fontBauMedium};
  &:hover,
  &:focus {
    background-color: ${colors.black};
    color: ${colors.white};
  }
`;

export default ButtonOutline;

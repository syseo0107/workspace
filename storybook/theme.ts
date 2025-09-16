import tokens from './tokens.json';

export const theme = {
  colors: tokens.colors,
  spacing: tokens.spacing,
  typography: tokens.typography,
  borderRadius: tokens.borderRadius,
};

// 사용 예시
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary['500']};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

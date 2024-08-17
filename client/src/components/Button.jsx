import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Button = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 40};
  border: 1px solid ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
  background: ${theme.secondary};
border: 1px solid ${({ theme }) => theme.secondary};
  `
      : `
  background: ${theme.primary};
`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.8;
  cursor: not-allowed;

  `}
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}
${({ flex }) =>
    flex &&
    `
    flex: 1;
`}

${({ small }) =>
    small &&
    `
padding: 10px 28px;
`}
  ${({ outlined, theme }) =>
    outlined &&
    `
background: transparent;
color: ${theme.primary};
  box-shadow: none;
`}
  ${({ full }) =>
    full &&
    `
  width: 100%;`}
`;



/**
 * A reusable button component with customizable properties.
 *
 * @param {string} text - The text to be displayed on the button.
 * @param {boolean} isLoading - Whether the button is in a loading state.
 * @param {boolean} isDisabled - Whether the button is disabled.
 * @param {ReactNode} rightIcon - The icon to be displayed on the right side of the button.
 * @param {ReactNode} leftIcon - The icon to be displayed on the left side of the button.
 * @param {string} type - The type of the button (e.g. 'secondary').
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {boolean} flex - Whether the button should take up the full width of its parent.
 * @param {boolean} small - Whether the button should have a smaller padding.
 * @param {boolean} outlined - Whether the button should have an outlined style.
 * @param {boolean} full - Whether the button should take up the full width of its parent.
 * @return {JSX.Element} The button component.
 */
const button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default button;

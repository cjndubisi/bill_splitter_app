import styled from 'styled-components/native';
import React, { FunctionComponent } from 'react';
import { TextProps, Platform } from 'react-native';
import { TextProp, ButtonProps } from './types';
export const Input = styled.TextInput`
  height: 40px;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
`;

export const Button = styled.TouchableOpacity<
  { backgroundColor?: string } & Partial<ButtonProps>
>`
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${(props) => props.backgroundColor || 'lightblue'};
  border-radius: 5px;
  margin-top: 10px;
`;

const FText = styled.Text<TextProp>``;
const FilterText: FunctionComponent<TextProp & TextProps> = ({
  bold,
  ...rest
}: TextProp) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FText {...rest} />
);

export const Text = styled(FilterText)`
  color: black;
  margin-bottom: 4px;
  ${(props) => (props.bold ? 'font-weight:bold;' : '')};
`;

const StyledErrorView = styled.View`
  justify-content: center;
  height: 40px;
  border-radius: 5;
  background-color: #fa8072bb;
  align-self: center;
  margin-top: 20;
  width: 80%;
`;

export const ErrorView = ({ title }) => (
  <StyledErrorView>
    <Text style={{ textAlign: 'center', color: 'black' }}>{title}</Text>
  </StyledErrorView>
);

export const Container = styled.SafeAreaView`
  /* min-height: 100%; */
  max-width: 467px;
  display: flex;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  background-color: #e0ffffbb;
  height: ${() => (Platform.OS === 'web' ? '100vh' : '100%')};
  flex: 1 1 100%;
`;

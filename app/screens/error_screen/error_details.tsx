/* eslint-disable react-hooks/exhaustive-deps */
import React, {ErrorInfo} from 'react';
import {Text, ViewStyle} from 'react-native';
import {Screen} from '../../components/core/screen';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset(): void;
}

export function ErrorDetails({error, errorInfo}: ErrorDetailsProps) {
  const errorText = error ? error.message : '';

  React.useEffect(() => {
    console.error(error.message, errorInfo);
  }, []);

  return (
    <Screen style={$contentContainer}>
      <Text>{errorText}</Text>
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: 'center',
  flex: 1,
};

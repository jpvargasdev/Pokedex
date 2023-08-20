import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps as KeyboardAvoidingViewPropsReact,
  Platform,
  StyleProp,
  View,
  ViewStyle,
  StatusBar,
  StatusBarProps as StatusBarPropsReact,
  SafeAreaView,
} from 'react-native';

import React from 'react';

import {colors} from '../../theme';

export interface ScreenProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  keyboardOffset?: number;
  StatusBarProps?: StatusBarPropsReact;
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewPropsReact;
}

const isIos = Platform.OS === 'ios';

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $innerStyle: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export function Screen({
  backgroundColor = colors.palette.background,
  KeyboardAvoidingViewProps,
  keyboardOffset = 0,
  StatusBarProps,
  style,
  contentContainerStyle,
  children,
  statusBarStyle,
}: ScreenProps) {
  return (
    <SafeAreaView style={[$containerStyle, {backgroundColor}]}>
      <StatusBar barStyle={statusBarStyle} {...StatusBarProps} />

      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}>
        <View style={[$outerStyle, style]}>
          <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



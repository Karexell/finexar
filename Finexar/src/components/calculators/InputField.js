import React, { memo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';

const InputField = memo(({ 
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'numeric',
  error,
  required = false,
  disabled = false,
  style,
  inputStyle,
  labelStyle,
  ...props 
}) => {
  const { t, isRTL } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const containerStyle = [
    styles.container,
    isFocused && styles.focusedContainer,
    error && styles.errorContainer,
    disabled && styles.disabledContainer,
    isRTL() && styles.rtlContainer,
    style,
  ];

  const inputStyleCombined = [
    styles.input,
    isRTL() && styles.rtlInput,
    disabled && styles.disabledInput,
    inputStyle,
  ];

  const labelStyleCombined = [
    styles.label,
    isRTL() && styles.rtlText,
    required && styles.requiredLabel,
    error && styles.errorLabel,
    labelStyle,
  ];

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={labelStyleCombined}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={inputStyleCombined}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        keyboardType={keyboardType}
        editable={!disabled}
        returnKeyType="next"
        {...props}
      />
      {error && (
        <Text style={[styles.errorText, isRTL() && styles.rtlText]}>
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rtlContainer: {
    // RTL specific styles if needed
  },
  focusedContainer: {
    // Focus styles if needed
  },
  errorContainer: {
    // Error styles if needed
  },
  disabledContainer: {
    opacity: 0.6,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  rtlText: {
    textAlign: 'right',
  },
  requiredLabel: {
    // Required label styles if needed
  },
  errorLabel: {
    color: colors.error,
  },
  required: {
    color: colors.error,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      outline: 'none',
      '&:focus': {
        borderColor: colors.primary,
      },
    }),
  },
  rtlInput: {
    textAlign: 'right',
  },
  disabledInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: colors.textDisabled,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
});

InputField.displayName = 'InputField';

export default InputField;

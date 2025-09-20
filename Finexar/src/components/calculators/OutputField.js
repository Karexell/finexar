import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';

const OutputField = memo(({ 
  label,
  value,
  unit,
  copyable = false,
  style,
  labelStyle,
  valueStyle,
  onCopy,
  ...props 
}) => {
  const { t, isRTL } = useTranslation();

  const handleCopy = () => {
    if (copyable && onCopy) {
      onCopy(value);
    }
  };

  const containerStyle = [
    styles.container,
    isRTL() && styles.rtlContainer,
    style,
  ];

  const labelStyleCombined = [
    styles.label,
    isRTL() && styles.rtlText,
    labelStyle,
  ];

  const valueStyleCombined = [
    styles.value,
    isRTL() && styles.rtlText,
    valueStyle,
  ];

  return (
    <View style={containerStyle} {...props}>
      {label && (
        <Text style={labelStyleCombined}>
          {label}
        </Text>
      )}
      <View style={styles.valueContainer}>
        <Text style={valueStyleCombined}>
          {value || '0'}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        {copyable && (
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopy}
            activeOpacity={0.7}
          >
            <Text style={styles.copyButtonText}>📋</Text>
          </TouchableOpacity>
        )}
      </View>
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
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  rtlText: {
    textAlign: 'right',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  value: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  unit: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  copyButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 12,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    }),
  },
  copyButtonText: {
    fontSize: 16,
  },
});

OutputField.displayName = 'OutputField';

export default OutputField;

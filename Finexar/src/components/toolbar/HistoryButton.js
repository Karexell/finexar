import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Platform, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { useHistory } from '../../hooks/useHistory';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { GlassButton, GlassModal } from '../glassmorphism';

const HistoryButton = memo(({ style, size = 'small' }) => {
  const { t, isRTL } = useTranslation();
  const { history, loading, clearHistory, removeCalculation } = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          minHeight: 28,
        };
      case 'large':
        return {
          paddingHorizontal: 20,
          paddingVertical: 12,
          minHeight: 48,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 36,
        };
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return typography.caption;
      case 'large':
        return typography.bodyLarge;
      default:
        return typography.body;
    }
  };

  const buttonStyle = [
    styles.button,
    getSizeStyle(),
    isRTL() && styles.rtlButton,
    style,
  ];

  const textStyle = [
    styles.text,
    getTextSizeStyle(),
    isRTL() && styles.rtlText,
  ];

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <GlassButton
          title={`📊 ${t('history')}`}
          onPress={() => setIsModalVisible(true)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={buttonStyle}
          textStyle={textStyle}
          variant="ghost"
          size={size}
        />
      </Animated.View>

      <GlassModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        size="large"
      >
        <View style={[styles.modalContent, isRTL() && styles.rtlModalContent]}>
          <Text style={[styles.modalTitle, isRTL() && styles.rtlText]}>
            {t('calculationHistory')}
          </Text>
          
          <View style={styles.historyContent}>
            {loading ? (
              <Text style={[styles.loadingMessage, isRTL() && styles.rtlText]}>
                {t('loading')}...
              </Text>
            ) : history.length === 0 ? (
              <Text style={[styles.emptyMessage, isRTL() && styles.rtlText]}>
                {t('noHistory')}
              </Text>
            ) : (
              <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
                {history.map((item) => (
                  <View key={item.id} style={[styles.historyItem, isRTL() && styles.rtlHistoryItem]}>
                    <View style={styles.historyItemHeader}>
                      <Text style={[styles.historyItemTitle, isRTL() && styles.rtlText]}>
                        {item.calculatorName || 'Unknown Calculator'}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeCalculation(item.id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.historyItemDate, isRTL() && styles.rtlText]}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                    {item.inputs && item.inputs.length > 0 && (
                      <View style={styles.historyItemInputs}>
                        {item.inputs.slice(0, 2).map((input, index) => (
                          <Text key={index} style={[styles.historyItemInput, isRTL() && styles.rtlText]}>
                            {input.label}: {input.value}
                          </Text>
                        ))}
                        {item.inputs.length > 2 && (
                          <Text style={[styles.historyItemMore, isRTL() && styles.rtlText]}>
                            +{item.inputs.length - 2} more...
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          <View style={[styles.modalActions, isRTL() && styles.rtlModalActions]}>
            {history.length > 0 && (
              <GlassButton
                title={t('clearHistory')}
                onPress={async () => {
                  await clearHistory();
                }}
                variant="error"
                style={styles.actionButton}
              />
            )}
            <GlassButton
              title={t('close')}
              onPress={() => setIsModalVisible(false)}
              variant="ghost"
              style={styles.actionButton}
            />
          </View>
        </View>
      </GlassModal>
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rtlButton: {
    flexDirection: 'row-reverse',
  },
  text: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  rtlText: {
    textAlign: 'right',
  },
  modalContent: {
    alignItems: 'center',
    minHeight: 300,
  },
  rtlModalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  historyContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
  },
  emptyMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
  },
  historyList: {
    width: '100%',
    maxHeight: 300,
  },
  historyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rtlHistoryItem: {
    // RTL specific styles if needed
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyItemTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyItemDate: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  historyItemInputs: {
    gap: 4,
  },
  historyItemInput: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  historyItemMore: {
    ...typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  rtlModalActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  actionButton: {
    minWidth: 100,
  },
});

HistoryButton.displayName = 'HistoryButton';

export default HistoryButton;

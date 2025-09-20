import React, { memo, useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  Platform,
  Animated 
} from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';

const SearchBar = memo(({ 
  onSearch, 
  placeholder,
  style,
  showResults = false,
  results = [],
  onResultSelect,
  ...props 
}) => {
  const { t, isRTL } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleTextChange = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleResultSelect = (result) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setSearchText('');
  };

  const searchPlaceholder = placeholder || t('search');

  const containerStyle = [
    styles.container,
    isFocused && styles.focusedContainer,
    isRTL() && styles.rtlContainer,
    style,
  ];

  const inputStyle = [
    styles.input,
    isRTL() && styles.rtlInput,
  ];

  return (
    <View style={styles.wrapper}>
      <View style={containerStyle}>
        <Text style={[styles.searchIcon, isRTL() && styles.rtlSearchIcon]}>
          🔍
        </Text>
        <TextInput
          style={inputStyle}
          value={searchText}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.textTertiary}
          returnKeyType="search"
          {...props}
        />
        {searchText.length > 0 && (
          <Text 
            style={[styles.clearIcon, isRTL() && styles.rtlClearIcon]}
            onPress={() => setSearchText('')}
          >
            ✕
          </Text>
        )}
      </View>

      {showResults && results.length > 0 && (
        <Animated.View 
          style={[
            styles.resultsContainer,
            { opacity: fadeAnim }
          ]}
        >
          {results.map((result, index) => (
            <View
              key={index}
              style={[
                styles.resultItem,
                isRTL() && styles.rtlResultItem
              ]}
              onTouchEnd={() => handleResultSelect(result)}
            >
              <Text style={[styles.resultText, isRTL() && styles.rtlText]}>
                {result.title}
              </Text>
              {result.subtitle && (
                <Text style={[styles.resultSubtext, isRTL() && styles.rtlText]}>
                  {result.subtitle}
                </Text>
              )}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }),
  },
  rtlContainer: {
    flexDirection: 'row-reverse',
  },
  focusedContainer: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: colors.textSecondary,
  },
  rtlSearchIcon: {
    marginRight: 0,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      outline: 'none',
    }),
  },
  rtlInput: {
    textAlign: 'right',
  },
  clearIcon: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.textSecondary,
    padding: 4,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  rtlClearIcon: {
    marginLeft: 0,
    marginRight: 12,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    maxHeight: 200,
    overflow: 'hidden',
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }),
  },
  resultItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }),
  },
  rtlResultItem: {
    // RTL specific styles if needed
  },
  resultText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  resultSubtext: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rtlText: {
    textAlign: 'right',
  },
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

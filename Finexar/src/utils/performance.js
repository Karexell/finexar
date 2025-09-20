// Performance monitoring utilities
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
  }

  // Start timing a performance metric
  startTiming(name) {
    this.metrics[name] = {
      startTime: performance.now(),
      endTime: null,
      duration: null,
    };
  }

  // End timing a performance metric
  endTiming(name) {
    if (this.metrics[name]) {
      this.metrics[name].endTime = performance.now();
      this.metrics[name].duration = this.metrics[name].endTime - this.metrics[name].startTime;
      
      // Notify observers
      this.notifyObservers(name, this.metrics[name]);
      
      return this.metrics[name].duration;
    }
    return null;
  }

  // Get performance metric
  getMetric(name) {
    return this.metrics[name];
  }

  // Get all metrics
  getAllMetrics() {
    return this.metrics;
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics = {};
  }

  // Add observer for performance events
  addObserver(callback) {
    this.observers.push(callback);
  }

  // Remove observer
  removeObserver(callback) {
    const index = this.observers.indexOf(callback);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers
  notifyObservers(name, metric) {
    this.observers.forEach(callback => {
      try {
        callback(name, metric);
      } catch (error) {
        console.warn('Performance observer error:', error);
      }
    });
  }

  // Measure function execution time
  measureFunction(name, fn) {
    return async (...args) => {
      this.startTiming(name);
      try {
        const result = await fn(...args);
        this.endTiming(name);
        return result;
      } catch (error) {
        this.endTiming(name);
        throw error;
      }
    };
  }

  // Get performance report
  getReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {},
      summary: {
        totalMetrics: Object.keys(this.metrics).length,
        averageDuration: 0,
        slowestMetric: null,
        fastestMetric: null,
      },
    };

    let totalDuration = 0;
    let slowestDuration = 0;
    let fastestDuration = Infinity;

    Object.entries(this.metrics).forEach(([name, metric]) => {
      if (metric.duration !== null) {
        report.metrics[name] = metric;
        totalDuration += metric.duration;

        if (metric.duration > slowestDuration) {
          slowestDuration = metric.duration;
          report.summary.slowestMetric = name;
        }

        if (metric.duration < fastestDuration) {
          fastestDuration = metric.duration;
          report.summary.fastestMetric = name;
        }
      }
    });

    if (Object.keys(this.metrics).length > 0) {
      report.summary.averageDuration = totalDuration / Object.keys(this.metrics).length;
    }

    return report;
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  INITIAL_LOAD: 3000, // 3 seconds
  LANGUAGE_SWITCH: 200, // 200ms
  CALCULATION: 100, // 100ms
  NAVIGATION: 300, // 300ms
  RENDER: 16, // 16ms (60fps)
};

// Performance utilities
export const performanceUtils = {
  // Check if performance meets threshold
  meetsThreshold(name, threshold) {
    const metric = performanceMonitor.getMetric(name);
    return metric && metric.duration <= threshold;
  },

  // Log performance warning if threshold exceeded
  checkThreshold(name, threshold, warningMessage) {
    const metric = performanceMonitor.getMetric(name);
    if (metric && metric.duration > threshold) {
      console.warn(`Performance Warning: ${warningMessage}`, {
        metric: name,
        duration: metric.duration,
        threshold,
      });
    }
  },

  // Measure component render time
  measureRender(componentName, renderFn) {
    return performanceMonitor.measureFunction(`render_${componentName}`, renderFn);
  },

  // Measure calculation time
  measureCalculation(calculatorName, calculationFn) {
    return performanceMonitor.measureFunction(`calculation_${calculatorName}`, calculationFn);
  },

  // Measure language switch time
  measureLanguageSwitch(switchFn) {
    return performanceMonitor.measureFunction('language_switch', switchFn);
  },

  // Get performance report
  getReport() {
    return performanceMonitor.getReport();
  },

  // Clear all metrics
  clearMetrics() {
    performanceMonitor.clearMetrics();
  },
};

// Web Vitals monitoring
export const webVitals = {
  // Measure First Contentful Paint
  measureFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            performanceMonitor.startTiming('fcp');
            performanceMonitor.endTiming('fcp');
            performanceUtils.checkThreshold(
              'fcp',
              PERFORMANCE_THRESHOLDS.INITIAL_LOAD,
              'First Contentful Paint is slow'
            );
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  },

  // Measure Largest Contentful Paint
  measureLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        performanceMonitor.startTiming('lcp');
        performanceMonitor.endTiming('lcp');
        performanceUtils.checkThreshold(
          'lcp',
          PERFORMANCE_THRESHOLDS.INITIAL_LOAD,
          'Largest Contentful Paint is slow'
        );
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  },

  // Measure Cumulative Layout Shift
  measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        performanceMonitor.startTiming('cls');
        performanceMonitor.endTiming('cls');
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Initialize all web vitals
  init() {
    this.measureFCP();
    this.measureLCP();
    this.measureCLS();
  },
};

// Initialize web vitals on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    webVitals.init();
  });
}

export default performanceMonitor;

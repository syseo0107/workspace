
const tokens = require('./tokens.json');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        success: tokens.colors.semantic.success,
        error: tokens.colors.semantic.error,
      },
      spacing: tokens.spacing,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      borderRadius: tokens.borderRadius,
    },
  },
};

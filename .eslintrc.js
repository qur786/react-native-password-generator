module.exports = {
  root: true,
  extends: "@react-native",
  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      rules: {
        quotes: ["warn", "double"],
      },
    },
  ],
};

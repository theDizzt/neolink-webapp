module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrder: [
    '^react',
    '^next',
    // ====
    '<THIRD_PARTY_MODULES>',
    // ====
    '^@layout/(.*)$',
    '^@data/(.*)$',
    // ====
    '^@/(.*)$',
    '^[./]',
    '^[.]/[-a-zA-Z0-9_]+[.](css|scss|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    'prettier-plugin-tailwindcss',
  ],
};

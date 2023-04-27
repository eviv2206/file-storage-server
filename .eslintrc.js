module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array"
      }
    ],
    "@typescript-eslint/consistent-indexed-object-style": [
      "error",
      "record"
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": [
      "error",
      "interface"
    ],
    "@typescript-eslint/method-signature-style": [
      "error",
      "method"
    ],
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
        "minimumDescriptionLength": 5
      }
    ],
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowTypedFunctionExpressions": true
      }
    ],
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "brace-style": "off",
    "@typescript-eslint/brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": [
      "error",
      "always-multiline"
    ],
    "comma-spacing": "off",
    "@typescript-eslint/comma-spacing": "error",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": [
      "error",
      {
        "allowPrivateClassPropertyAccess": true,
        "allowProtectedClassPropertyAccess": true,
        "allowIndexSignaturePropertyAccess": true
      }
    ],
    "func-call-spacing": "off",
    "@typescript-eslint/func-call-spacing": "error",
    "indent": "off",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "ignoredNodes": [
          "TSTypeParameterInstantiation",
          "CallExpression",
          "PropertyDefinition"
        ]
      }
    ],
    "init-declarations": "off",
    "@typescript-eslint/init-declarations": "off",
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": "error",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        "exceptAfterSingleLine": true
      }
    ],
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        "allow": [
          "constructors"
        ]
      }
    ],
    "no-extra-parens": "off",
    "@typescript-eslint/no-extra-parens": [
      "error",
      "all",
      {
        "nestedBinaryExpressions": false
      }
    ],
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": "error",
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": "error",
    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "error",
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": [
      "error",
      {
        "ignore": [
          -1,
          0,
          1,
          2
        ],
        "ignoreEnums": true,
        "ignoreNumericLiteralTypes": true,
        "ignoreReadonlyClassProperties": true
      }
    ],
    "no-restricted-imports": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": [
      "error",
      "always"
    ],
    "quotes": "off",
    "@typescript-eslint/quotes": [
      "error",
      "single"
    ],
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "semi": "off",
    "@typescript-eslint/semi": "error",
    "space-before-function-paren": "off",
    "space-before-blocks": "error",
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-infix-ops": "off",
    "@typescript-eslint/space-infix-ops": "error"
  },
};

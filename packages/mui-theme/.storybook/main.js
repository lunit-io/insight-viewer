module.exports = {
  "features": {
    // https://github.com/mui-org/material-ui/issues/24282#issuecomment-967747802
    "emotionAlias": false,
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": 'webpack5',
  },
}
module.exports = {
  staticDirs: [
    "../public",
  ],
  features: {
    emotionAlias: false, // https://github.com/mui-org/material-ui/issues/24282#issuecomment-967747802
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}
# How to Use

```sh
npm install @lunit/mdx-code-block
```

```jsx
import { MDXCodeBlock } from '@lunit/mdx-code-block';

const components = {
  pre: props => <div {...props} />,
  code: MDXCodeBlock,
};

export function App() {
  return (
    <MDXProvider components={components}>
      <Content/>
    </MDXProvider>
  );
}
```

```jsx
import { CodeBlock } from '@lunit/mdx-code-block';

function Component(sourceCode: string) {
  return (
    <CodeBlock language="js">{sourceCode}</CodeBlock>
  )
}
```
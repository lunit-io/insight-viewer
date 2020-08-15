# How to Use

```sh
npm install @handbook/code-block
```

```jsx
import { MDXCodeBlock } from '@handbook/code-block';

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
import { CodeBlock } from '@handbook/code-block';

function Component(sourceCode: string) {
  return (
    <CodeBlock language="js">{sourceCode}</CodeBlock>
  )
}
```
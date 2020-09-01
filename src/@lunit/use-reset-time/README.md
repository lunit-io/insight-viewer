# `@lunit/use-reset-time`

`<CornerstoneViewer>`에서 사용되는 `resetTime={}` 을 관리하는데 사용된다.

간단하게 사용하기 위해서 만들 Util이고, 필요한 경우 아래와 같이 사용해도 된다.

```tsx
function Component() {
  const [resetTime, setResetTime] = useState<Date>(() => Date.now());

  return <div>...</div>;
}
```

<http://frontend-components-handbook.netlify.com/#/use-reset-time>

# Install

```sh
npm install @lunit/use-reset-time
```

# `@lunit/use-opt-control`

`<CornerstoneViewer>`에서 사용되는 `control={}`, `flip={}`, `invert={}` 상태를 관리하는데 사용된다.

간단하게 사용하기 위해서 만들 Util이고, 필요한 경우 아래와 같이 사용해도 된다.

```tsx
import { Control } from '@lunit/use-opt-control';

function Component() {
  const [control, setControl] = useState<Control>('pen');
  const [flip, setFlip] = useState<boolean>(false);
  const [invert, setInvert] = useState<boolean>(false);

  return <div>...</div>;
}
```

<http://frontend-components-handbook.netlify.com/#/use-opt-control>

# Install

```sh
npm install @lunit/use-opt-control
```
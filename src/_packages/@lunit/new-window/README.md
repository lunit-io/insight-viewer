# Install

```sh
npm install @lunit/new-window
```

# API
```
<NewWindow<T> url={string}
              value={T}
              features={{width: number, height: number} | string}
              onOpen?={(window: Window) => void}
              onBlock?={() => void}
              onClose?={() => void} />

useWindowValue<T>(): T | undefined
```

# Use

```tsx
import React from 'react';
import { NewWindow } from '@lunit/new-window';

function Component(id: number) {
  const [openWindow, setOpenWindow] = useState<boolean>(false);

  const value = useMemo(() => {
    return { foo: 'bar' };
  }, []);
  
  return (
    <div>
      <div>
        Header
      </div>
      <div>
        {
          openWindow
          ? (
            <NewWindow url={`/case/${id}`}
                       value={value}
                       features={{ width: 800, height: 600 }}
                       onBlock={() => {
                         alert('window.open() was blocked!!!');
                         setOpenWindow(false);
                       }}
                       onClose={() => {
                         setOpenWindow(false);
                       }}/>
          )
          : (
            <div>
              <div>
                <button onClick={() => setOpenWindow(true)}>
                  Open Window
                </button>
              </div>
              <div>
                {JSON.stringify(value)}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
```

```tsx
import React from 'react';
import { useWindowValue } from '@lunit/new-window';

function Component() {
  const value = useWindowValue();

  return (
    <div>
      {JSON.stringify(value)}
        
      <button onClick={window.close}>
        Close Window
      </button>
    </div>
  )
}
```

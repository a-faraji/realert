# Realert
[![Realert Build](https://github.com/a-faraji/realert/actions/workflows/build.yml/badge.svg)](https://github.com/a-faraji/realert/actions/workflows/build.yml)

A simple functional alert for React projects.

## Installation
```shell
npm i @a-faraji/realert
```
```shell
yarn add @a-faraji/realert
```

## Usage

Wrap your app inside `RealertProvider` component.

```jsx
import React from 'react';
import { RealertProvider } from '@a-faraji/realert';

export default function App() {
  return (
    <RealertProvider>
      {/* ... rest of your code */}
    </RealertProvider>
  );
};
```

Call `useRealert` hook when you need to show an alert.

```jsx
import { useRealert } from '@a-faraji/realert';

export default function AddPostExample(/* props */) {
  const alert = useRealert();
  
  const onClick = () => {
    // do some stuff
    alert.show('The process was successful!')
  }
  
  return (
    <div>
      {/* ... */}
      <button onClick={onClick}>Add Post</button>
    </div>
  );
}
```


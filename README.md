# Realert
[![Realert Build](https://github.com/a-faraji/realert/actions/workflows/build.yml/badge.svg)](https://github.com/a-faraji/realert/actions/workflows/build.yml)

A simple functional alert for React projects.

**Note: This library is in testing phase and may change in the future.**

## Table of contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Alert Templates](#alert-templates)
   - [Material UI Template](#material-ui)
   - [Chakra UI Template](#chakra-ui)
   - [Custom Template](#custom-template)
4. [API](#api)

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

## Alert Templates

Realert can be used with custom alert templates. The following templates are going to be implemented:

### Material UI

[*Go to Repo →*](https://github.com/a-faraji/realert-template-mui)

[Material UI](https://mui.com/) should be installed and configured. 
Please be sure that `RealertProvider` is inside the MUI's `ThemeProvider`. 

Install the template:

```shell
npm i @a-faraji/react-template-mui
```

And pass the template to `RealertProvider` like this:

```tsx
import RealertTemplateMui from '@a-faraji/realert-template-mui';
// ...
<RealertProvider template={RealertTemplateMui}>
  {/* ... rest of your code */}
</RealertProvider>
```

### Chakra UI
*Coming Soon!*

### Custom Template
OR you can create your own alert template. Just implement a Functional Component with `RealertTemplateProps` 
(and additional props). Take a look at [DefaultTemplate](src/templates/DefaultTemplate.tsx) or [MUI Template](https://github.com/a-faraji/realert-template-mui) as an example.

## API

### RealertProvider

| Prop     | Type                         | Description | Required |
|----------|------------------------------|-------------|----------|
| template | A realert template component |             | *No*     |

### useRealert
@Returns

| Prop | Type                                                                    | Description                                             |
|------|-------------------------------------------------------------------------|---------------------------------------------------------|
| show | (message: ReactNode, props?: RealertProps<TemplateProps>) => RealertId; | The function to show the alert. It returns `RealertId`. |
| hide | (id: RealertId) => void;                                                | The function to hide the alert with provided ID.        |                                                  |

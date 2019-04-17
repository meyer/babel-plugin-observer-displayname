# babel-plugin-react-createcontext-displayname

A simple babel plugin that adds `displayName` values to `observer` calls.

Useful if you use `mobx-react-lite`. Probably not useful if you don’t.

In:

```typescript
const MyComponent = observer(props => {
  // ...
});
```

Out:

```typescript
const MyComponent = observer(props => {
  // ...
});
if (process.env.NODE_ENV === 'development') {
  MyComponent.displayName = 'observer(MyComponent)';
}
```

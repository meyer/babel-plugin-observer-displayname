import { makeDisplayName } from './helpers';

export = (
  babel: typeof import('@babel/core')
): import('@babel/core').PluginObj<{}> => {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-observer-displayname',
    visitor: {
      CallExpression(path) {
        if (
          !t.isIdentifier(path.node.callee) ||
          path.node.callee.name !== 'observer' ||
          path.node.arguments.length !== 1 ||
          !t.isArrowFunctionExpression(path.node.arguments[0])
        ) {
          return;
        }

        const parentNode = path.parentPath.node;

        if (
          !t.isVariableDeclarator(parentNode) ||
          !t.isIdentifier(parentNode.id)
        ) {
          return;
        }

        const componentName = parentNode.id.name;
        const nearestStatement = path.find(t.isStatement);
        nearestStatement.insertAfter(
          makeDisplayName(componentName, `observer(${componentName})`)
        );
      },
    },
  };
};

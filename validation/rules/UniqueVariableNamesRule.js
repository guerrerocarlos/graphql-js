import { GraphQLError } from "../../error/GraphQLError.mjs";

/**
 * Unique variable names
 *
 * A GraphQL operation is only valid if all its variables are uniquely named.
 */
export function UniqueVariableNamesRule(context) {
  let knownVariableNames = Object.create(null);
  return {
    OperationDefinition() {
      knownVariableNames = Object.create(null);
    },

    VariableDefinition(node) {
      const variableName = node.variable.name.value;

      if (knownVariableNames[variableName]) {
        context.reportError(new GraphQLError(`There can be only one variable named "$${variableName}".`, [knownVariableNames[variableName], node.variable.name]));
      } else {
        knownVariableNames[variableName] = node.variable.name;
      }
    }

  };
}

import { InfoNode } from '../type';

const convertName = <T extends InfoNode>(node: T) => {
  if (typeof node['genealogical name'] !== 'undefined') {
    if (node.name === node['genealogical name']) {
      return node.name;
    } else {
      return `${node.name} (${node['genealogical name']})`;
    }
  }
  return node.name;
};

export default convertName;

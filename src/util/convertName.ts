import { InfoNode } from '../type';

/**
 * 지정한 형식대로 이름을 반환함
 * @param node
 */
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

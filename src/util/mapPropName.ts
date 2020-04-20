import { infoProps } from '../setting';

/**
 * prop을 실제로 쓸 이름으로 mapping함
 * @param prop
 * @param propNames
 */
const mapPropName = (
  prop: string,
  propNames: { [key: string]: string } = infoProps
): string | undefined => {
  return propNames[prop];
};

export default mapPropName;

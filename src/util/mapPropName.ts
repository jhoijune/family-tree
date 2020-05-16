import { propsMappedName } from '../setting';
import { Properties } from '../type';

/**
 * prop을 실제로 쓸 이름으로 mapping함
 * 모든 이름이 매핑되서 unknown이 나오면 안됨
 * @param prop
 * @param propNames
 */
const mapPropName = (prop: Properties): string => {
  return propsMappedName[prop];
};

export default mapPropName;

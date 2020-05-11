import { featureProps } from '../setting';
import { InfoNode, FamilyNode, Properties } from '../type';

/**
 * 정보를 기술하는데는 필요없는 노드의 특징들과 그 외 필요없는 다른 prop 제거
 * @param obj
 * @param deleteProps
 */
const removeProp = (
  obj: FamilyNode,
  additionalDeleteProps?: Properties[]
): InfoNode => {
  const copied = { ...obj };
  for (const props of featureProps) {
    delete copied[props];
  }
  if (typeof additionalDeleteProps !== 'undefined') {
    for (const props of additionalDeleteProps) {
      if (props in copied) {
        delete copied[props];
      }
    }
  }
  return copied as InfoNode;
};

export default removeProp;

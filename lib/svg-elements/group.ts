import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class Group extends SvgNodeObject {
  public node: any;

  public constructor() {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.baseStyle = 'group';
  }
}

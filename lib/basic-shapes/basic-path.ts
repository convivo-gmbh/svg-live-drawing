import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicPath extends SvgNodeObject {
  public node: any;

  public constructor( d: string ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'path' );
    this.baseStyle = 'basicPath';
    this.repaint( d );
  }

  public repaint( d: string ): void {
    this.node.setAttribute( 'd', d );
  }
}

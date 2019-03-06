import { Vector2 } from '@daign/math';

import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicCircle extends SvgNodeObject {
  public node: any;

  public constructor( c: Vector2, r: number ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'circle' );
    this.baseStyle = 'basicCircle';
    this.repaint( c, r );
  }

  public repaint( c: Vector2, r: number ): void {
    this.node.setAttribute( 'cx', String( c.x ) );
    this.node.setAttribute( 'cy', String( c.y ) );
    this.node.setAttribute( 'r', String( r ) );
  }
}

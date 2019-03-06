import { Vector2 } from '@daign/math';

import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicLine extends SvgNodeObject {
  public node: any;

  public constructor( p1: Vector2, p2: Vector2 ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'line' );
    this.baseStyle = 'basicLine';
    this.repaint( p1, p2 );
  }

  public repaint( p1: Vector2, p2: Vector2 ): void {
    this.node.setAttribute( 'x1', String( p1.x ) );
    this.node.setAttribute( 'y1', String( p1.y ) );
    this.node.setAttribute( 'x2', String( p2.x ) );
    this.node.setAttribute( 'y2', String( p2.y ) );
  }
}

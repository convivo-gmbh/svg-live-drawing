import { Vector2 } from '@daign/math';

import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicPolygon extends SvgNodeObject {
  public node: any;

  public constructor( points: Vector2[] ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'polygon' );
    this.baseStyle = 'basicPolygon';
    this.repaint( points );
  }

  public repaint( points: Vector2[] ): void {
    const pointsString = points.map(
      ( point: Vector2 ): string => `${point.x},${point.y}`
    ).join( ' ' );
    this.node.setAttribute( 'points', pointsString );
  }
}

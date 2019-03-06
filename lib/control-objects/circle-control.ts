import { Box2, Vector2 } from '@daign/math';

import { BasicCircle } from '../basic-shapes';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';

import { ControlObject } from './control-object';

/**
 * Tool for drawing circles by defining the center and a point on the circle.
 */
export class CircleControl extends ControlObject {
  private circleShape: BasicCircle | undefined;
  private circleShapesNode: any;

  public get boundingBox(): Box2 {
    const box = new Box2();
    const points = this.points;
    if ( points.length > 1 ) {
      const radius = points[ 0 ].distanceTo( points[ 1 ] );
      box.expandByPoint( points[ 0 ].clone().addScalar( radius ) );
      box.expandByPoint( points[ 0 ].clone().addScalar( -radius ) );
    } else {
      box.expandByPoint( points[ 0 ] );
    }
    return box;
  }

  public get drawingFinished(): boolean {
    return ( this.points.length >= 2 );
  }

  public constructor( selectionManager: SelectionManager ) {
    super( selectionManager );
    this.baseStyle = 'circleControl';

    this.circleShapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode.appendChild( this.circleShapesNode );
  }

  public addPoint( position: Vector2 ): void {
    if ( this.points.length < 2 ) {
      super.addPoint( position );
    }
  }

  public updateGeometry(): void {
    super.updateGeometry();

    while ( this.circleShapesNode.firstChild ) {
      this.circleShapesNode.removeChild( this.circleShapesNode.firstChild );
    }
    this.circleShape = undefined;

    const points = this.points;
    if ( points.length === 2 ) {
      const center = points[ 0 ];
      const radius = points[ 1 ].distanceTo( points[ 0 ] );
      this.circleShape = new BasicCircle( center, radius );
      this.circleShapesNode.appendChild( this.circleShape.node );
    }
  }

  public repaint(): void {
    super.repaint();

    if ( this.circleShape ) {
      const points = this.points;
      const center = points[ 0 ];
      const radius = points[ 1 ].distanceTo( points[ 0 ] );
      this.circleShape.repaint( center, radius );
    }
  }
}

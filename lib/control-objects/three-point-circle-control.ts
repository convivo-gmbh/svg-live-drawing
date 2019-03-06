import { Box2, Triangle2, Vector2 } from '@daign/math';

import { BasicCircle } from '../basic-shapes';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';

import { ControlObject } from './control-object';

/**
 * Tool for drawing circles by defining three points on the circle.
 */
export class ThreePointCircleControl extends ControlObject {
  private circleShape: BasicCircle | undefined;
  private circleShapesNode: any;

  public get boundingBox(): Box2 {
    const box = new Box2();
    const points = this.points;

    if ( points.length > 2 ) {
      const triangle = new Triangle2( points[ 0 ], points[ 1 ], points[ 2 ] );
      const center = triangle.getCircumcenter();
      if ( center !== null ) {
        const radius = center.distanceTo( points[ 0 ] );
        box.expandByPoint( center.clone().addScalar( radius ) );
        box.expandByPoint( center.clone().addScalar( -radius ) );
      } else {
        box.expandByPoint( points[ 0 ] );
        box.expandByPoint( points[ 1 ] );
        box.expandByPoint( points[ 2 ] );
      }
    } else if ( points.length > 1 ) {
      box.expandByPoint( points[ 0 ] );
      box.expandByPoint( points[ 1 ] );
    } else {
      box.expandByPoint( points[ 0 ] );
    }
    return box;
  }

  public get drawingFinished(): boolean {
    return ( this.points.length >= 3 );
  }

  public constructor( selectionManager: SelectionManager ) {
    super( selectionManager );
    this.baseStyle = 'threePointCircleControl';

    this.circleShapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode.appendChild( this.circleShapesNode );
  }

  public addPoint( position: Vector2 ): void {
    if ( this.points.length < 3 ) {
      super.addPoint( position );
    }
  }

  public updateGeometry(): void {
    super.updateGeometry();

    while ( this.circleShapesNode.firstChild ) {
      this.circleShapesNode.removeChild( this.circleShapesNode.firstChild );
    }
    this.circleShape = undefined;

    if ( this.points.length === 3 ) {
      const points = this.points;
      const triangle = new Triangle2( points[ 0 ], points[ 1 ], points[ 2 ] );
      const center = triangle.getCircumcenter();
      if ( center !== null ) {
        const radius = center.distanceTo( points[ 0 ] );
        this.circleShape = new BasicCircle( center, radius );
        this.circleShapesNode.appendChild( this.circleShape.node );
      }
    }
  }

  public repaint(): void {
    super.repaint();

    if ( this.circleShape ) {
      const points = this.points;
      const triangle = new Triangle2( points[ 0 ], points[ 1 ], points[ 2 ] );
      const center = triangle.getCircumcenter();
      if ( center !== null ) {
        const radius = center.distanceTo( points[ 0 ] );
        this.circleShape.repaint( center, radius );
      }
    }
  }
}

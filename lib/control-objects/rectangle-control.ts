import { Line2, Vector2 } from '@daign/math';

import { BasicRectangle } from '../basic-shapes';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';

import { ControlObject } from './control-object';

/**
 * Tool for drawing rectangles by defining two corner points.
 */
export class RectangleControl extends ControlObject {
  private rectangleShape: BasicRectangle | undefined;
  private rectangleShapesNode: any;

  public get lines(): Line2[] {
    const points = this.points;
    if ( points.length === 2 ) {
      const rectPoints = [
        new Vector2( points[ 0 ].x, points[ 0 ].y ),
        new Vector2( points[ 1 ].x, points[ 0 ].y ),
        new Vector2( points[ 1 ].x, points[ 1 ].y ),
        new Vector2( points[ 0 ].x, points[ 1 ].y )
      ];
      return [
        new Line2( rectPoints[ 0 ], rectPoints[ 1 ] ),
        new Line2( rectPoints[ 1 ], rectPoints[ 2 ] ),
        new Line2( rectPoints[ 2 ], rectPoints[ 3 ] ),
        new Line2( rectPoints[ 3 ], rectPoints[ 0 ] )
      ];
    } else {
      return [];
      // When an obstacle is not finished drawing, then it only has 1 point and therefore no lines
    }
  }

  public get drawingFinished(): boolean {
    return ( this.points.length >= 2 );
  }

  public constructor( selectionManager: SelectionManager ) {
    super( selectionManager );
    this.baseStyle = 'rectangleControl';
    this.rectangleShapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode.appendChild( this.rectangleShapesNode );
  }

  public addPoint( position: Vector2 ): void {
    if ( this.points.length < 2 ) {
      super.addPoint( position );
    }
  }

  public updateGeometry(): void {
    super.updateGeometry();

    while ( this.rectangleShapesNode.firstChild ) {
      this.rectangleShapesNode.removeChild( this.rectangleShapesNode.firstChild );
    }
    this.rectangleShape = undefined;

    const points = this.points;
    if ( points.length === 2 ) {
      const x = Math.min( points[ 0 ].x, points[ 1 ].x );
      const y = Math.min( points[ 0 ].y, points[ 1 ].y );
      const dimensions = points[ 1 ].clone().sub( points[ 0 ] ).abs();
      this.rectangleShape = new BasicRectangle( x, y, dimensions.x, dimensions.y );
      this.rectangleShapesNode.appendChild( this.rectangleShape.node );
    }
  }

  public repaint(): void {
    super.repaint();

    if ( this.rectangleShape ) {
      const points = this.points;
      const x = Math.min( points[ 0 ].x, points[ 1 ].x );
      const y = Math.min( points[ 0 ].y, points[ 1 ].y );
      const dimensions = points[ 1 ].clone().sub( points[ 0 ] ).abs();
      this.rectangleShape.repaint( x, y, dimensions.x, dimensions.y );
    }
  }
}

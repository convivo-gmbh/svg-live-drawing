import { Line2, Vector2 } from '@daign/math';

import { BasicPolyline } from '../basic-shapes';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';

import { ControlObject } from './control-object';

/**
 * Class for drawing a chain of straight line segments.
 */
export class PolylineControl extends ControlObject {
  private polylineShape: BasicPolyline | undefined;
  private polylineShapesNode: any;

  public get lines(): Line2[] {
    return this.points.map( ( point: Vector2, index: number, array: Vector2[] ) => {
      if ( index < array.length - 1 ) {
        return new Line2( point, array[ index + 1 ] );
      } else {
        return null; // There is one line less than there are points in a polyline
      }
    } ).filter( ( line: Line2 | null ): line is Line2 => line !== null ); // Filter out null values
  }

  public constructor( selectionManager: SelectionManager ) {
    super( selectionManager );
    this.baseStyle = 'polylineControl';
    this.polylineShapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode.appendChild( this.polylineShapesNode );
  }

  public addPoint( position: Vector2 ): void {
    super.addPoint( position );
  }

  public updateGeometry(): void {
    super.updateGeometry();

    while ( this.polylineShapesNode.firstChild ) {
      this.polylineShapesNode.removeChild( this.polylineShapesNode.firstChild );
    }
    this.polylineShape = undefined;

    this.polylineShape = new BasicPolyline( this.points );
    this.polylineShapesNode.appendChild( this.polylineShape.node );
  }

  public repaint(): void {
    super.repaint();

    if ( this.polylineShape ) {
      this.polylineShape.repaint( this.points );
    }
  }
}

import { Line2, Vector2 } from '@daign/math';

import { BasicPolygon } from '../basic-shapes/basic-polygon';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';

import { ControlObject } from './control-object';

/**
 * Class for drawing polygons.
 */
export class PolygonControl extends ControlObject {
  private polygonShape: BasicPolygon | undefined;
  private polygonShapesNode: any;

  public get lines(): Line2[] {
    return this.points.map( ( point: Vector2, index: number, array: Vector2[] ) => {
      if ( index < array.length - 1 ) {
        return new Line2( point, array[ index + 1 ] );
      } else {
        return new Line2( point, array[ 0 ] );
      }
    } );
  }

  public constructor( selectionManager: SelectionManager ) {
    super( selectionManager );
    this.baseStyle = 'polygonControl';
    this.polygonShapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode.appendChild( this.polygonShapesNode );
  }

  public addPoint( position: Vector2 ): void {
    super.addPoint( position );
  }

  public updateGeometry(): void {
    super.updateGeometry();

    while ( this.polygonShapesNode.firstChild ) {
      this.polygonShapesNode.removeChild( this.polygonShapesNode.firstChild );
    }
    this.polygonShape = undefined;

    this.polygonShape = new BasicPolygon( this.points );
    this.polygonShapesNode.appendChild( this.polygonShape.node );
  }

  public repaint(): void {
    super.repaint();

    if ( this.polygonShape ) {
      this.polygonShape.repaint( this.points );
    }
  }
}

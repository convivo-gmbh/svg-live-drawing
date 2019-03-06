import { Vector2 } from '@daign/math';
import { ControlModifier } from './control-modifier';

/**
 * Modifier that restricts drawing to grid corners.
 */
export class GridModifier extends ControlModifier {
  private enabled: boolean = true;
  private gridSize: number;

  public constructor( gridSize: number ) {
    super();
    this.gridSize = gridSize;
  }

  public align( points: Vector2[], i: number ): void {
    if ( this.enabled && i < points.length ) {
      const point = points[ i ];
      point.setSilent(
        Math.round( point.x / this.gridSize ) * this.gridSize,
        Math.round( point.y / this.gridSize ) * this.gridSize
      );
    }

    super.align( points, i );
  }

  public enable( value: boolean ): void {
    this.enabled = value;
  }
}

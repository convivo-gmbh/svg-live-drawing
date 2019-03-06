import { Vector2 } from '@daign/math';
import { ControlModifier } from './control-modifier';

/**
 * Modifier that restricts drawing to orthogonal directions from the last point.
 */
export class OrthogonalModifier extends ControlModifier {
  private enabled: boolean = true;

  public constructor() {
    super();
  }

  public align( points: Vector2[], i: number ): void {
    if ( this.enabled && i < points.length && i > 0 && points.length > 1 ) {
      const last = points[ i ];
      const previous = points[ i - 1 ];

      const diffHorizontal = Math.abs( last.x - previous.x );
      const diffVertical = Math.abs( last.y - previous.y );

      if ( diffHorizontal > diffVertical ) {
        last.setSilent( last.x, previous.y );
      } else {
        last.setSilent( previous.x, last.y );
      }
    }

    super.align( points, i );
  }

  public enable( value: boolean ): void {
    this.enabled = value;
  }
}

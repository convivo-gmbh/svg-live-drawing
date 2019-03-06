import { Vector2 } from '@daign/math';

/**
 * Base class for modifiers that restrict drawing actions.
 */
export abstract class ControlModifier {
  private nextModifier: ControlModifier | null = null;

  public constructor() {}

  /**
   * Modify last point
   * @param points Arrays of points
   */
  public alignLast( points: Vector2[] ): void {
    if ( points.length > 0 ) {
      this.align( points, points.length - 1 );
    }
  }

  /**
   * Modify point i
   * @param points Array of points
   * @param i Index of entry to modify
   */
  public align( points: Vector2[], i: number ): void {
    if ( this.nextModifier !== null ) {
      this.nextModifier.align( points, i );
    }
  }

  public chain( modifier: ControlModifier ): void {
    this.nextModifier = modifier;
  }

  public abstract enable( value: boolean ): void;
}

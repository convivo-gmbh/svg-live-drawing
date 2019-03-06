import { Handle } from '@daign/handle';
import { Vector2 } from '@daign/math';

import { FloatBar } from '../float-bar';
import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

/**
 * Class for draggable control points of drawing shapes.
 */
export class ControlPoint extends SvgNodeObject {
  public node: any;
  public repaintCallback: any;
  public position: Vector2;

  public constructor( repaintCallback: any, position: Vector2, floatBar: FloatBar | null ) {
    super();
    this.repaintCallback = repaintCallback;

    this.node = document.createElementNS( SvgConstants.SVGNS, 'circle' );
    this.node.setAttribute( 'r', 12 );
    this.baseStyle = 'controlPoint';

    this.position = position.clone();

    let snapshot: any;
    const onMove = (): void => {
      this.repaintCallback();
    };
    this.position.subscribeToChanges( onMove );
    this.repaint();

    const handle = new Handle( this.node );
    handle.beginning = (): boolean => {
      snapshot = this.position.clone();

      if ( floatBar ) {
        floatBar.setText( `${this.position.x}, ${this.position.y}` );
        floatBar.display( true );
      }

      return true;
    };

    handle.continuing = (): void => {
      this.position.copy( snapshot.clone().add(
        handle.delta
      ) );
      if ( floatBar ) {
        floatBar.setText( `${this.position.x}, ${this.position.y}` );
      }
    };
    handle.ending = (): void => {
      if ( floatBar ) {
        floatBar.display( false );
      }
    };
  }

  public repaint(): void {
    const x = this.position.x;
    const y = this.position.y;
    this.node.setAttribute( 'cx', String( x ) );
    this.node.setAttribute( 'cy', String( y ) );
  }
}

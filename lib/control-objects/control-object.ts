import { Handle } from '@daign/handle';
import { Box2, Line2, Vector2 } from '@daign/math';

import { ControlModifier } from '../control-modifiers';
import { FloatBar } from '../float-bar';
import { SelectionManager } from '../selection-manager';
import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

import { ControlPoint } from './control-point';

/**
 * Base class for all drawing tools.
 */
export abstract class ControlObject extends SvgNodeObject {
  public node: any;
  public floatBar: FloatBar | null = null;

  protected shapesNode: any;
  protected overlayNode: any;

  private controls: ControlPoint[] = [];
  private controlsNode: any;
  private restrictor: ControlModifier | null = null;

  public get points(): Vector2[] {
    return this.controls.map( ( control: ControlPoint ): Vector2 => control.position );
  }

  public get lines(): Line2[] {
    return [];
  }

  public get boundingBox(): Box2 {
    const box = new Box2();
    this.points.forEach( ( point: Vector2 ): void => {
      box.expandByPoint( point );
    } );
    return box;
  }

  public get drawingFinished(): boolean {
    return false;
  }

  public constructor( selectionManager: SelectionManager ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'g' );

    this.controlsNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.shapesNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.overlayNode = document.createElementNS( SvgConstants.SVGNS, 'g' );
    this.node.appendChild( this.shapesNode );
    this.node.appendChild( this.controlsNode );
    this.node.appendChild( this.overlayNode );

    const handle = new Handle( this.shapesNode );
    handle.beginning = (): boolean => {
      selectionManager.set( this );
      return false;
    };
  }

  public addPoint( position: Vector2 ): void {
    const next = this.controls.length;
    const point = new ControlPoint( (): void => {
      if ( this.restrictor ) {
        this.restrictor.align( this.points, next );
      }
      this.repaint();
    }, position, this.floatBar );
    this.controls.push( point );

    if ( this.restrictor ) {
      this.restrictor.alignLast( this.points );
    }

    this.controlsNode.appendChild( point.node );
    this.updateGeometry();
    this.repaint();
  }

  public updateGeometry(): void {
    this.notifyObservers();
  }

  public repaint(): void {
    this.notifyObservers();

    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0; i < this.controls.length; i += 1 ) {
      this.controls[ i ].repaint();
    }
  }

  public addRestrictor( restrictor: ControlModifier ): void {
    this.restrictor = restrictor;
  }

  public parseFromXML( node: any ): void {
    // Child 0 are shaped and child 2 is overlay
    const controlPoints = node.childNodes[1].childNodes;
    controlPoints.forEach( ( cp: any ) => {
      this.addPoint(
        new Vector2(
          parseFloat( cp.getAttribute( 'cx' ) ),
          parseFloat( cp.getAttribute( 'cy' ) )
        )
      );
    } );
  }
}

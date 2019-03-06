import { FloatBar } from '../float-bar';
import { SelectionManager } from '../selection-manager';

import { CircleControl } from './circle-control';
import { ControlObject } from './control-object';
import { PolygonControl } from './polygon-control';
import { PolylineControl } from './polyline-control';
import { RectangleControl } from './rectangle-control';
import { ThreePointCircleControl } from './three-point-circle-control';

/**
 * Class for creating control objects.
 */
export class ControlFactory {
  public afterCreateHook: ( ( control: ControlObject, controlName: string ) => void ) | null = null;

  private lookUpTable: any = {
    circleControl: CircleControl,
    polygonControl: PolygonControl,
    polylineControl: PolylineControl,
    rectangleControl: RectangleControl,
    threePointCircleControl: ThreePointCircleControl
  };

  private selectionManager: SelectionManager;
  private floatBar: FloatBar;

  public constructor( selectionManager: SelectionManager, floatBar: FloatBar ) {
    this.selectionManager = selectionManager;
    this.floatBar = floatBar;
  }

  public createControl( controlName: string ): ControlObject {
    const control = new this.lookUpTable[ controlName ]( this.selectionManager );
    control.floatBar = this.floatBar;
    if ( this.afterCreateHook ) {
      this.afterCreateHook( control, controlName );
    }
    return control;
  }

  public parseFromXML( xmlNode: SVGGElement ): ControlObject | null {
    const classListToArray = ( classList: DOMTokenList ): string[] => {
      const p = [];
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < classList.length; i += 1 ) {
        p.push( classList[ i ] );
      }
      return p;
    };

    // TODO is order always the same?
    const [ baseStyle, ...customStyle ]: string[] = classListToArray( xmlNode.classList );
    let control = null;

    if ( this.lookUpTable.hasOwnProperty( baseStyle ) ) {
      control = this.createControl( baseStyle );
      control.parseFromXML( xmlNode );
      control.style = customStyle.filter( ( s: string ): boolean => s !== 'selected' ).join( ' ' );
    }

    return control;
  }

  public addControl( styleName: string, classRef: typeof ControlObject ): void {
    this.lookUpTable[ styleName ] = classRef;
  }
}

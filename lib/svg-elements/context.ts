import { Handle } from '@daign/handle';

import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

/**
 * Class that holds the node of the SVG document.
 */
export class Context extends SvgNodeObject {
  public node: any;

  public constructor( container: any ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'svg' );
    this.baseStyle = 'context';
    this.node.setAttribute( 'xmlns:xlink', SvgConstants.XLink );
    container.appendChild( this.node );

    this.setSize( 1200, 800 );
  }

  public addElement( element: SvgNodeObject ): void {
    this.node.appendChild( element.node );
  }

  public setSize( width: number, height: number ): void {
    this.node.style.width  = `${width}px`;
    this.node.style.height = `${height}px`;
    this.node.setAttribute( 'viewBox', `0,0,${width},${height}` );
  }

  public setOnMouseDownAction( onMouseDown: any ): void {
    const handle = new Handle( this.node );
    handle.beginning = ( event: any ): boolean => {
      onMouseDown( event );
      return false;
    };
  }
}

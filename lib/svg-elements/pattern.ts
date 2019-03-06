import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class Pattern extends SvgNodeObject {
  public node: any;

  public constructor( id: string, width: number, height: number ) {
    super();

    const pattern = document.createElementNS( SvgConstants.SVGNS, 'pattern' );
    this.node = pattern;
    pattern.setAttribute( 'x', String( 0 ) );
    pattern.setAttribute( 'y', String( 0 ) );
    pattern.setAttribute( 'width', String( width ) );
    pattern.setAttribute( 'height', String( height ) );
    pattern.setAttribute( 'id', id );
    pattern.setAttribute( 'patternUnits', 'userSpaceOnUse' );

    this.baseStyle = 'pattern';
  }
}

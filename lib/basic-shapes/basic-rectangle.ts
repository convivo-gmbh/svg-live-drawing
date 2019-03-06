import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicRectangle extends SvgNodeObject {
  public node: any;

  public constructor(
    x: number, y: number, width: number, height: number, rx?: number, ry?: number
  ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'rect' );
    this.baseStyle = 'basicRectangle';
    this.repaint( x, y, width, height, rx || 0, ry || 0 );
  }

  public repaint(
    x: number, y: number, width: number, height: number, rx?: number, ry?: number
  ): void {
    this.node.setAttribute( 'x', String( x ) );
    this.node.setAttribute( 'y', String( y ) );
    this.node.setAttribute( 'width', String( width ) );
    this.node.setAttribute( 'height', String( height ) );
    this.node.setAttribute( 'rx', String( rx || 0 ) );
    this.node.setAttribute( 'ry', String( ry || 0 ) );
  }
}

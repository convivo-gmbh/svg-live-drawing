import { SvgConstants } from '../svg-constants';
import { SvgNodeObject } from '../svg-node-object';

export class BasicText extends SvgNodeObject {
  public node: any;

  public constructor( x: number, y: number, text: string ) {
    super();
    this.node = document.createElementNS( SvgConstants.SVGNS, 'text' );
    this.baseStyle = 'basicText';
    this.repaint( x, y, text );
  }

  public repaint( x: number, y: number, text: string ): void {
    this.node.setAttribute( 'x', String( x ) );
    this.node.setAttribute( 'y', String( y ) );
    this.node.textContent = text;
  }

  public setText( t: string ): void {
    this.node.textContent = t;
  }
}

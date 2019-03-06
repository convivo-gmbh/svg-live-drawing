import { BasicRectangle, BasicText } from './basic-shapes';
import { Group } from './svg-elements';

/**
 * Floating text box in the editor area.
 */
export class FloatBar extends Group {
  private text: BasicText;

  public constructor() {
    super();
    this.style = 'floatBar hidden';
    const background = new BasicRectangle( 20, 740, 240, 40, 20, 20 );
    this.addElement( background );
    this.text = new BasicText( 35, 765, '0,0' );
    this.addElement( this.text );
  }

  public display( b: boolean ): void {
    this.style = b ? 'floatBar active' : 'floatBar hidden';
  }

  public setText( t: string ): void {
    this.text.setText( t );
  }
}

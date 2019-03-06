import { BasicPath, BasicRectangle } from '../basic-shapes';

import { Group } from './group';
import { Pattern } from './pattern';

export class Grid extends Group {
  public constructor() {
    super();
    this.baseStyle = 'grid';

    const rectangle = new BasicRectangle( 0, 0, 1200, 800 );
    this.addElement( rectangle );

    const pattern = new Pattern( 'GridPattern', 50, 50 );
    pattern.style = 'gridPattern';
    this.addElement( pattern );

    const gridLine = new BasicPath( 'M 50,0 L 0,0 0,50' );
    pattern.addElement( gridLine );
  }
}

import { BasicRectangle } from './basic-shapes';
import { ControlObject } from './control-objects';
import { Group } from './svg-elements';

/**
 * Class for managing the currently selected element.
 */
export class SelectionManager extends Group {
  public selectedElement: ControlObject | null = null;

  // Remove callback for selected element listener
  private selectedElementListener: any | null = null;

  public get notNull(): boolean {
    return this.selectedElement !== null;
  }

  public constructor() {
    super();
    this.baseStyle = 'boundingBox';
  }

  public set( control: ControlObject | null ): void {
    if ( this.selectedElement ) {
      this.selectedElement.selected = false;
    }
    /* If there was a change listener for the previous selected element than remove this listener
     * first */
    if ( this.selectedElementListener ) {
      this.selectedElementListener();
    }

    this.selectedElement = control;
    if ( this.selectedElement ) {
      this.selectedElement.selected = true;

      // Update bounding box when it changes
      this.selectedElementListener = this.selectedElement.subscribeToChanges(
        this.drawBoundingBox
      );
    }

    this.drawBoundingBox();
    this.notifyObservers();
  }

  /**
   * Delete the currently selected element from the document.
   */
  public deleteElement(): void {
    if ( this.selectedElement !== null ) {
      this.selectedElement.removeFromParent();
      this.set( null );
    }
  }

  private drawBoundingBox = (): void => {
    this.clear();
    if ( this.selectedElement !== null ) {
      const bb = this.selectedElement.boundingBox;
      if ( bb !== null && !bb.isEmpty ) {
        const margin = 14.5;
        const position = bb.min.clone().addScalar( -1 * margin );
        const dimensions = bb.max.clone().sub( bb.min ).addScalar( 2 * margin );
        const bbShape = new BasicRectangle( position.x, position.y, dimensions.x, dimensions.y );
        this.addElement( bbShape );
      }
    }
  }
}

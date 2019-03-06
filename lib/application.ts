import { Vector2 } from '@daign/math';

import { ControlFactory } from './control-objects';
import { FloatBar } from './float-bar';
import { SelectionManager } from './selection-manager';
import { Context, Group } from './svg-elements';
import { ToolManager } from './tool-manager';

/**
 * The application class.
 */
export class Application {
  protected backgroundLayer: Group;
  protected documentLayer: Group;
  protected selectionManager: SelectionManager;

  protected controlFactory: ControlFactory;
  protected toolManager: ToolManager;

  private svgContext: Context;
  private floatBar: FloatBar;

  /**
   * Constructor.
   * @param container The div container to append the SVG to.
   */
  public constructor( container: any ) {
    this.svgContext = new Context( container );

    // Layers: Background/Document/Selection/FloatBar

    this.backgroundLayer = new Group();
    this.svgContext.addElement( this.backgroundLayer );

    this.documentLayer = new Group();
    this.svgContext.addElement( this.documentLayer );

    this.selectionManager = new SelectionManager();
    this.svgContext.addElement( this.selectionManager );

    this.floatBar = new FloatBar();
    this.svgContext.addElement( this.floatBar );

    // Control Factory and Tool Manager

    this.controlFactory = new ControlFactory( this.selectionManager, this.floatBar );
    this.toolManager = new ToolManager( this.selectionManager, this.controlFactory, this.floatBar );

    // Actions

    const globalOnMouseDown = ( event: any ): void => {
      const position = new Vector2();
      position.setFromEventRelative( event );

      this.toolManager.globalAction( position );

      event.stopPropagation();
      event.preventDefault();
    };
    this.svgContext.setOnMouseDownAction( globalOnMouseDown );
  }
}

import { Vector2 } from '@daign/math';

import { ControlFactory } from './control-objects';
import { FloatBar } from './float-bar';
import { SelectionManager } from './selection-manager';
import { Group } from './svg-elements';

/**
 * Class for managing the currently selected drawing tool and layer.
 */
export class ToolManager {
  private activeToolName: string | null = null;
  private workingLayer: Group | null = null;

  private selectionManager: SelectionManager;
  private controlFactory: ControlFactory;
  private floatBar: FloatBar;

  public constructor(
    selectionManager: SelectionManager,
    controlFactory: ControlFactory,
    floatBar: FloatBar
  ) {
    this.selectionManager = selectionManager;
    this.controlFactory = controlFactory;
    this.floatBar = floatBar;
  }

  public setTool( toolName: string ): void {
    this.activeToolName = toolName;
  }

  public setWorkingLayer( layer: Group ): void {
    this.workingLayer = layer;
  }

  public globalAction( position: Vector2 ): void {
    this.floatBar.setText( `${position.x}, ${position.y}` );
    this.floatBar.display( true );

    let activeElement = this.selectionManager.selectedElement;

    if ( this.workingLayer !== null && this.activeToolName !== null ) {
      if ( activeElement === null ) {
        activeElement = this.controlFactory.createControl( this.activeToolName );
        activeElement.addPoint( position );
        this.workingLayer.addElement( activeElement );
        this.selectionManager.set( activeElement );
      } else {
        activeElement.addPoint( position );
      }
      if ( activeElement.drawingFinished ) {
        this.selectionManager.set( null );
      }
    }

    setTimeout( () => {
      this.floatBar.display( false );
    }, 1000 );
  }
}

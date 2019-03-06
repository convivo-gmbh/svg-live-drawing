import { Observable } from '@daign/observable';

/**
 * Abstract base class for all objects that contain SVG elements and have them grouped under the
 * "node" attribute.
 */
export abstract class SvgNodeObject extends Observable {
  public node: any;
  public elements: SvgNodeObject[] = [];

  private namedMapping: any = {};

  private removeCallback: any = null;

  private _baseStyle: string | null = null;
  private _customStyle: string | null = null;
  private _selected: boolean = false;

  public set style( styleName: string ) {
    this._customStyle = styleName;
    this.applyStyle();
  }

  public set selected( b: boolean ) {
    this._selected = b;
    this.applyStyle();
  }

  protected set baseStyle( styleName: string ) {
    this._baseStyle = styleName;
    this.applyStyle();
  }

  public constructor() {
    super();
  }

  /**
   * Add element to this node.
   * @param element The element to add.
   * @param name The name for the mapping.
   */
  public addElement( element: SvgNodeObject, name?: string ): void {
    this.elements.push( element );
    this.node.appendChild( element.node );

    if ( name ) {
      this.namedMapping[ name ] = element;
    }

    const remove = (): void => {
      this.removeElement( element, name );
    };
    element.setRemoveCallback( remove );
  }

  /**
   * Remove element from this node.
   * @param element The element to remove.
   * @param name The name in the mapping.
   */
  public removeElement( element: SvgNodeObject, name?: string ): void {
    this.node.removeChild( element.node );

    const index = this.elements.indexOf( element );
    if ( index > -1 ) {
      this.elements.splice( index, 1 );
    }

    if ( name ) {
      delete this.namedMapping[ name ];
    }
  }

  /**
   * Remove all elements from this node.
   */
  public clear(): void {
    while ( this.node.firstChild ) {
      this.node.removeChild( this.node.firstChild );
    }
    this.elements = [];
    this.namedMapping = {}; // TODO keep observers?
  }

  /**
   * Set the callback which can remove this node from its parent.
   * @param remove The callback.
   */
  public setRemoveCallback( remove: any ): void {
    this.removeCallback = remove;
  }

  /**
   * Remove this node from its parent.
   */
  public removeFromParent(): void {
    if ( this.removeCallback !== null ) {
      this.removeCallback();
      this.removeCallback = null;
    }

    this.clearObservers();
  }

  /**
   * Get element by mapping name.
   * @param name The name of the element.
   * @returns The element.
   */
  public getElementByName( name: string ): SvgNodeObject {
    return this.namedMapping[ name ];
  }

  /**
   * Set the style attribute of the node.
   */
  private applyStyle(): void {
    const styles = [ this._baseStyle, this._customStyle, this._selected ? 'selected' : null ];
    const styleString = styles.filter( ( s: string | null ): boolean => s !== null ).join( ' ' );
    this.node.setAttribute( 'class', styleString );
  }
}

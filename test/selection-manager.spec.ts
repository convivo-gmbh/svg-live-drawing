import { expect } from 'chai';

import { MockDocument } from '@daign/mock-dom';

import { SelectionManager } from '../lib/selection-manager';

declare var global: any;

describe( 'SelectionManager', () => {
  beforeEach( () => {
    global.document = new MockDocument();
  } );

  describe( 'constructor', () => {
    it( 'should set the boundingBox base style', () => {
      // Act
      const selectionManager = new SelectionManager();

      // Assert
      expect( ( selectionManager as any )._baseStyle ).to.equal( 'boundingBox' );
    } );
  } );
} );

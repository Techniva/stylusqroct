// Add missing Fabric Canvas method declarations to avoid casting to `any` everywhere
import { FabricObject } from 'fabric/fabric-impl';

declare module 'fabric' {
  // Extend the Canvas interface with common stacking methods used at runtime
  interface Canvas {
    sendToBack(object: FabricObject | object): this;
    bringToFront(object: FabricObject | object): this;
    sendBackwards(object: FabricObject | object): this;
    bringForward(object: FabricObject | object): this;
  }
}

export {};

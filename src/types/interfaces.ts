export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
  owner: string;
  description?: string;
  sku?: string;
  category?: string;
  barcode?: string;
  supplier?: string;
  unitOfMeasure?: string;
  weight?: string;
  dimensions?: string;
  dateReceived?: string;
  expirationDate?: string;
  lastUpdated?: string;
  status?: string;
  reorderLevel?: number;
  reorderQuantity?: number;
  availability?: string;
  costPrice?: number;
  sellingPrice?: number;
  batchNumber?: string;
  serialNumber?: string;
  warehouse?: string;
  condition?: string;
  pickZone?: string;
  returnStatus?: string;
  handlingInstructions?: string;
}

export interface AddInventoryInput {
  name: string;
  quantity: number;
  location: string;
  owner: string;
}
export interface InventoryFilterInput {
  name: string;
  location: string;
  owner: string;
  categories: string[];
  minQuantity: number;
  maxQuantity: number;
}

 

export type ShoeDto = {
  id: string;
  name: string;
  inventory: number;
};

export type StoreDto = {
  id: string;
  name: string;
  shoes: ShoeDto[];
};

export type TransferPayload = {
  transfer: {
    from: string;
    to: string;
    shoe: string;
    amount: number;
  };
};

export type InventoryPayload = {
  store: string;
  name: string;
  inventory: number;
};

export type UpdateEntryPayload = TransferPayload | InventoryPayload;

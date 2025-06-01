import { defineStore } from "pinia";
import { socket } from "../socket";

interface Item {
  id: number;
  label: string;
}

interface ItemListResponse {
  data: Item[];
}

interface CreateItemResponse {
  data: number;
}

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [] as Item[],
  }),

  actions: {
    bindEvents() {
      // sync the list of items upon connection
      socket.on("connect", () => {
        socket.emit("item:list", (res: ItemListResponse) => {
          this.items = res.data;
        });
      });

      // update the store when an item was created
      socket.on("item:created", (item: Item) => {
        this.items.push(item);
      });
    },

    createItem(label: string) {
      const item: Item = {
        id: Date.now(), // temporary ID for v-for key
        label,
      };
      this.items.push(item);

      socket.emit("item:create", { label }, (res: CreateItemResponse) => {
        item.id = res.data;
      });
    },
  },
});

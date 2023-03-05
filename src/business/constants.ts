import { Item } from "./interfaces";

export enum SORT_ID {
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc",
  EMAIL_ASC = "email_asc",
  EMAIL_DESC = "email_desc",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
}

export const SortingOptions = {
  [SORT_ID.TITLE_ASC]: {
    name: "Título de la A la Z",
    compareFn: (x1: Item, x2: Item) =>
      x1.title.toUpperCase() > x2.title.toUpperCase() ? 1 : -1,
  },
  [SORT_ID.TITLE_DESC]: {
    name: "Título de la Z la A",
    compareFn: (x1: Item, x2: Item) =>
      x1.title.toUpperCase() > x2.title.toUpperCase() ? -1 : 1,
  },
  [SORT_ID.EMAIL_ASC]: {
    name: "Email de la A la Z",
    compareFn: (x1: Item, x2: Item) =>
      x1.email.toUpperCase() > x2.email.toUpperCase() ? 1 : -1,
  },
  [SORT_ID.EMAIL_DESC]: {
    name: "Email de la Z la A",
    compareFn: (x1: Item, x2: Item) =>
      x1.email.toUpperCase() > x2.email.toUpperCase() ? -1 : 1,
  },
  [SORT_ID.PRICE_ASC]: {
    name: "Precio de menor a mayor",
    compareFn: (x1: Item, x2: Item) =>
      Number(x1.price) > Number(x2.price) ? 1 : -1,
  },
  [SORT_ID.PRICE_DESC]: {
    name: "Precio mayor a menor",
    compareFn: (x1: Item, x2: Item) =>
      Number(x1.price) > Number(x2.price) ? -1 : 1,
  },
};

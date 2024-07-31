import {PizzaItemType} from "../entities/Pizza/model/types";

export const Pagination = (items: Array<PizzaItemType>, currentPage= 1, countToPage = 8) => {
  const totalItemsCount = items.length
  const itemsToPage: Array<PizzaItemType> = items.slice((currentPage - 1) * countToPage, (currentPage - 1) * countToPage + countToPage > totalItemsCount ? totalItemsCount : (currentPage - 1) * countToPage + countToPage)
  return itemsToPage
}

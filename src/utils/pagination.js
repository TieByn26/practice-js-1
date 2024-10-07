export class Pagination{
    constructor(itemOfPage, totalItem, currentPage = 1){
        this.itemOfPage = itemOfPage;
        this.totalItem = totalItem;
        this.currentPage = currentPage;
        this.totalPage = Math.ceil(this.totalItem/ this.itemOfPage);
    }
    nextPage() {
        if (this.currentPage < this.totalPage){
            this.currentPage++;
        }
        return this.currentPage;
    }
    prevPage() {
        if (this.currentPage > 1){
            this.currentPage--;
        }
        return this.currentPage;
    }
    getCurrentPageItems(items) {
        const startIndex = (this.currentPage - 1) * this.itemOfPage;
        const endIndex = startIndex + this.itemOfPage;
        return items.slice(startIndex, endIndex);
    }
}
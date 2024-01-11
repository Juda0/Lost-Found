export default class PaginationCalculator {
    static calculateTotalPages(totalItems) {
        return Math.ceil(totalItems / 5);
    }

    static calculateOffset(pageNumber, itemsPerPage) {
        return (pageNumber - 1) * itemsPerPage;
    }
}

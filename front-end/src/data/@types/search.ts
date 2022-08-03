export interface SearchType {
    searchText: string;
    btnText: string;
    Search: (text: string) => void;
    Add: () => void;
}

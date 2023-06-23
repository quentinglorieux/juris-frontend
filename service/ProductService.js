export const ProductService = {
    getProductsData() {
        return [
            {
                label:"Sources",
                icon: "pi pi-fw pi-th-large",
                link:"/sources"
            },
            {
                label:"Mots Clés",
                icon: "pi pi-fw pi-tags",
            },
            
           
        ];
    },
    getProducts() {
        return Promise.resolve(this.getProductsData());
    },
};
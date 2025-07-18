export class Product {
    constructor() {
        this.Id = 0;
        this.ProductName = "";
        this.image=null;
        this.Price = 0;
        this.Quantity = 0;
        this.Description = "";
        this.CategoryId = 0;
    }
    public Id: number;
    public ProductName: string;
    public image;
    public Price: number;
    public Quantity: number;
    public Description: string;
    public CategoryId: number;
}

export interface IProduct {
    select: any;
    Id: number;
    ProductName: string;
    Price: number;
    Quantity: number;
    Description: string;
    CategoryId: number;
}
export class ProductSC {
    selected:boolean= true;
    Id: number=0;
    ProductName: string="";
    Image: null;
    Price: number=0;
    Quantity: number=0;
    Description: string="";
    CategoryId: number=0;
}
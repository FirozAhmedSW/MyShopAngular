export class OrderDTO{
    constructor(){
        this.userId = 0;
        this.address = "";
        this.total = 0;
        this.orderList = [];
    }
    userId: number;
    address : string;
    total: number;
    orderList: OrderDitailDTO[];
}
export class ICheachkBoxProduct {
    selected:boolean= true;
    Id: number=0;
    ProductName: string="";
    Image: null;
    Price: number=0;
    Quantity: number=0;
    Description: string="";
    CategoryId: number=0;
}

export class OrderDitailDTO{
    constructor(){
        this.productName = "";
        this.productId = 0;
        this.price = 0;
        this.quantity = 0;
    }
    productName: string;
    productId: number;
    price: number;
    quantity: number;

}
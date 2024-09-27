import { dtoMethod } from "../common";

export const typeofCostomer = {
    id : 0,
    name: "",
    mail: "",
    phone: "",
    orders: 0,
    balance: "",
    point: 0,
    status: "",
    created: "",
    address: "",
    latest: ""
}
export class Customer extends dtoMethod{
    constructor({id, name, mail, phone, orders, balance, point, status, created, address, latest}){
        super();
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.orders = orders;
        this.balance = balance;
        this.point = point;
        this.status = status;
        this.created = created;
        this.address = address;
        this.latest = latest;   
    }
}

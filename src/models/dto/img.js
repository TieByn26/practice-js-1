export class image {
    /**
    *
    * @param {object} param0
    * @param {number} param0.id
    * @param {string} param0.imageURL
    * @param {number} param0.productId
    */
   constructor({ id, imageURL, productId}){
    this.id = id;
    this.imageURL = imageURL;
    this.productId = productId;
   }
}

'use strict';
let transformInputData=(barcodes)=>{
    let barcodesList=[]
    for(let i=0;i<barcodes.length;i++){
        if(barcodes[i].indexOf('-')!=-1){
            barcodesList.push({
                id:barcodes[i].split('-')[0],
                num:barcodes[i].split('-')[1]
            })
        }else{
            barcodesList.push({
                id:barcodes[i],
                num:1
            })
        }
    }
}

let loadAllBarcodes=()=>{
    let allItems=loadAllItems(),allBarcodes=[]
    for(let i=0;i<allItems.length;i++){
        allItems.push(allItems[i].id)
    }
    return allBarcodes
}

let loadOneCommodityItem=(barcode)=>{
    let commodityItem,allItems=loadAllItems()
    for(let i=0;i<allItems.length;i++){
        if(barcode==allItems[i].barcode){
            commodityItem=allItems[i]
        }
    }
    return commodityItem
}

let doesHavePromotion=(barcode)=>{
    let doesHavePromotion,promotionItems=loadPromotions()
    for(let i=0;i<promotionItems.length;i++){
        if(barcode==allItems[i].barcode){
            commodityItem=allItems[i]
        }
    }
    return commodityItem
}

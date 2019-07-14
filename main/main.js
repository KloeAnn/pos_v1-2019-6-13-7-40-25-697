'use strict';
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
let  decodeBarcode=tags=>{
    let tags1= tags.map(i=>i.includes("-")?{barcode:i.split("-")[0],count:+i.split("-")[1]}:{barcode:i,count:+1})

    let barcodes=Array.from(new Set (tags1.map(i=>i.barcode))).map(i=>{return{barcode:i,count:0}})
    //console.log(barcodes)

    return barcodes.map(function (i) {
        for(let j=0;j<tags1.length;j++){
            tags1[j].barcode===i.barcode?
                i.count+= tags1[j].count:
                i.count
        }
        return i
    })
}

let combineItems=(decodeBarcode)=>{
   let itemsWithoutCount=loadAllItems()
   return itemsWithoutCount.filter(i=>{
       let res=decodeBarcode.filter(j=>i.barcode===j.barcode)
       if(res.length===1) {
           i.count = res[0].count
           return i
       }
   })
}

let decodeTags=(tags)=>{
    return combineItems(decodeBarcode(tags))
}



function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

let promoteReceiptItems=(promotions,items)=>{
            for(let i=0;i<items.length;i++){
                for(let j=0;j<promotions[0].barcodes.length;j++){
                    if(items[i].barcode===promotions[0].barcodes[j]){
                        items[i].subTotal=(Math.floor(items[i].count/3)*2+items[i].count%3)*items[i].price
                    }
                }
            }
            for(let i=0;i<items.length;i++){
                if(!items[i].subTotal){
                    items[i].subTotal=items[i].count*items[i].price
                }
            }
            return items
}


let calculateReceiptItem=(items)=>{
    return promoteReceiptItems(loadPromotions(),items)
}

//console.log(calculateReceiptItem(decodeTags(tags)))

let calculateReceiptTotal=(items)=>{
    let receipt={}
    receipt.items=items
    receipt.total=receipt.items.map(i=>i.subTotal).reduce((pre,cur)=>pre+cur,0)


    return receipt
}
//console.log(calculateReceiptTotal(calculateReceiptItem(decodeTags(tags))))
function calculateReceiptSaving(receipt){
        let shouldTotal=receipt.items.map(i=>i.price*i.count).reduce((pre,cur)=>pre+cur,0)
        receipt.saving=shouldTotal-receipt.total
        return receipt
}
//console.log(calculateReceiptSaving(calculateReceiptTotal(calculateReceiptItem(decodeTags(tags)))))
let  calculateReceipt=(items)=>{
    return calculateReceiptSaving(calculateReceiptTotal(items))
}

let renderReceipt=(receipt)=> {
    if(receipt instanceof Object){
    let items = receipt.items.map(i => "名称：" + i.name + "，数量：" + i.count  + i.unit + "，价格："+i.price+"（元）"+ "，小计：" + i.subTotal + "(元)\n").join("")
     let str= "***<没钱赚商店>收据***\n"+"----------------------\n"+
         items+
"----------------------\n"+
`总计：${receipt.total}元
节省：${receipt.saving}元
**********************`
        return str
}}
console.log(renderReceipt(calculateReceipt(calculateReceiptItem(decodeTags(tags)))))
/*let printReceipt=(tags)=>{
    return renderReceipt(calculateReceipt(decodeTags(tags)))
}

//console.log(calculateReceipt(calculateReceiptItem(decodeTags(tags))))
//console.log(printReceipt(tags))*/

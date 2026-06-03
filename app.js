//add new item in row
let btnele=document.querySelector(".btnadd");
let prodele=document.querySelector(".productbody");
btnele.addEventListener("click",()=>{
   let newrow=document.createElement("tr");
   newrow.classList.add("productbody")
   newrow.innerHTML=`<td><input type="text" name="" id="" class=""></td>
                    <td><input type="text" name="" id="" class="qty"></td>
                    <td><input type="text" name="" id="" class="price"></td>
                    <td class="amt">Rs. 0</td>`
   prodele.appendChild(newrow);
});

//now add amount and subtotal
document.addEventListener("input",(e)=>{
   let row=e.target.closest("tr");
   if(row){
      let qtyele=row.querySelector(".qty").value||0;
      let priceele=row.querySelector(".price").value||0;
      let amount=qtyele*priceele;
      row.querySelector(".amt").innerText=amount;
   }
   let subtotal=0;
   document.querySelectorAll(".amt").forEach((item)=>{
      subtotal+=Number(item.innerText)||0;
   })
   document.querySelector("#Subtotal").innerText="Rs"+subtotal;

   document.querySelector("#gstrate").addEventListener("input",()=>{
      let gstRate=Number(document.querySelector("#gstrate").value) ||0;
      let gst=(subtotal*gstRate)/100;
      document.querySelector("#gst").innerText="Rs"+gst.toFixed(2);
      let total=subtotal+gst;
      document.querySelector("#total").innerText="Rs."+total.toFixed(2);
   })
   document.querySelector("#printbtn").addEventListener("click",()=>{
      // window.print();
   })
});
document.querySelector("#printsave").addEventListener("click",()=>{
   let subtotal=document.querySelector("#Subtotal").innerText;
   let gst=document.querySelector("#gst").innerText;
   let total=document.querySelector("#total").innerText;
   let invoice={
      date:new Date().toLocaleString(),
      subtotal:subtotal,
      gst:gst,
      total:total
   };
   let invoices=JSON.parse(localStorage.getItem("invoices")) || [];
   invoices.push(invoice);
   localStorage.setItem("invoices",JSON.stringify(invoices));
   alert("Invoice saved successfully");
})
document.querySelector("#downloadpdf").addEventListener("click",()=>{
 
   const {jsPDF}=window.jspdf;
   let doc=new jsPDF();
   let subtotal=document.querySelector("#Subtotal").innerText;
   let gst=document.querySelector("#gst").innerText;
   let total=document.querySelector("#total").innerText;
   doc.text("invoice",20,20);
   doc.text(subtotal,20,40);
   doc.text(gst,20,60);
   doc.text(total,20,80);
   doc.save("invoice.pdf");
});
document.querySelector("#printbtn").addEventListener("click",()=>{
   document.querySelector("#previewinvoiceno").innerText=document.querySelector("#invoiceno").value;
   document.querySelector("#previewsubtotal").innerText=document.querySelector("#Subtotal").innerText;
   document.querySelector("#previewgst").innerText=document.querySelector("#gst").innerText;
   document.querySelector("#previewtotal").innerText=document.querySelector("#total").innerText;
   window.print();
})  
document.querySelector("#invoiceno").value="INV-"+Date.now();


//validation
function validateForm(){
   const companyname=document.getElementById("companyname").value.trim();
   const customername=document.getElementById("customername").value.trim();
   const email=document.getElementById("email").value.trim();
   const phone=document.getElementById("phone").value.trim();

   if(!companyname || !customername || !email || !phone){
      alert("Please fill in all required fields.");
      return false;
   }
   return true;
}

if(validateForm()){
   savevoice();
}
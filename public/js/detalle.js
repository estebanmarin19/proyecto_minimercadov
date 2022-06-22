$(document).ready(function(){

    $('#btndet').on('click',function(){
    
        let btn= $('#btndet').index(this);

        let ce=$('#dc1').eq(btn);
        let em=$('#dc2').eq(btn);
        let nom=$('#dc3').eq(btn);
        let nom1=$('#dc4').eq(btn);
       


    
        let c=ce.val();
        let e=em.val();
        let n=nom.val();
        let nn=nom1.val();
       
//alert(c+e+n+nn)

        v=parseInt(e)*parseInt(n);
        



        
        $.ajax({
    
            type:"POST",
            url:'/creardetalle',
            data:{
                codprod:c,cpro:n,valor:v,cd:nn
            }
        });
    
    
    
    
    });
    
    
    });
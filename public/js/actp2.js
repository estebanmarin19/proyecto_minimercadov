$(document).ready(function(){
    

    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let a=$('.d1').eq(btn);
        let b=$('.d4').eq(btn);
        let c=$('.d5').eq(btn);


    
        let aa=a.val();
        let bb=b.val();
        let cc=c.val();


   // alert(aa+bb+cc)
       // alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actp2',
            data:{
                a1:aa,a2:bb,a3:cc
            }
        });
    
    
    
    
    });
    
    
    });
$(document).ready(function(){
    

    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let a=$('.d1').eq(btn);
        let b=$('.d2').eq(btn);
        let c=$('.d3').eq(btn);
        let d=$('.d4').eq(btn);
        

    
        let a1=a.val();
        let a2=b.val();
        let a3=c.val();
        let a4=d.val();
        

   // alert(a1+a2+a3+a4+a5)
       // alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actualizardevproveedores',
            data:{
                aa:a1,bb:a2,cc:a3,dd:a4
            }
        });
    
    
    
    
    });
    
    
});
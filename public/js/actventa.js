$(document).ready(function(){
    

    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let a=$('.d1').eq(btn);
        let b=$('.d4').eq(btn);


    
        let aa=a.val();
        let bb=b.val();


    //alert(aa+bb)
       // alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actventa',
            data:{
                a1:aa,a2:bb
            }
        });
    
    
    
    
    });
    
    
    });
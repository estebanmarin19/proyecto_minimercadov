$(document).ready(function(){

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let doc=$('.d2').eq(btn);
    
        
    
    
        let d=doc.val();
    
       // alert(d)
    
       // alert("Datos borrados")
    
        $.ajax({
    
            type:"POST",
            url:'/eliminarusu',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
    });
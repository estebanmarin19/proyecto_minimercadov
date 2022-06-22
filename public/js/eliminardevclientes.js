$(document).ready(function(){

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let doc=$('.d1').eq(btn);
    
        
    
    
        let d=doc.val();
    
       // alert(d)
    
       // alert("Devolucion Eliminada")
    
        $.ajax({
    
            type:"POST",
            url:'/eliminardevclientes',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
    });
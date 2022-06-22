$(document).ready(function(){

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let cod=$('.d1').eq(btn);
    
        
    
    
        let d=cod.val();
    
       // alert(d)
    
       // alert("Devolucion Eliminada")
    
        $.ajax({
    
            type:"POST",
            url:'/eliminardevproveedores',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
    });
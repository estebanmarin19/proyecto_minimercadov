$(document).ready(function(){

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let doc=$('.dt1').eq(btn);
    
        
    
    
        let d=doc.val();
    
     //   alert(d)
    
      //  alert("Datos borrados")
    
        $.ajax({
    
            type:"POST",
            url:'/eliminarnom',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
    });
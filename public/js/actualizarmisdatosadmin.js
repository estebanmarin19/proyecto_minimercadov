$(document).ready(function(){
    

    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let a=$('.d1').eq(btn);
        let b=$('.d2').eq(btn);
        let c=$('.d3').eq(btn);
        let d=$('.d4').eq(btn);
        let e=$('.d5').eq(btn);
        let f=$('.d6').eq(btn);
        let g=$('.d7').eq(btn);
        let h=$('.d8').eq(btn);
        
        
        

    
        let a1=a.val();
        let a2=b.val();
        let a3=c.val();
        let a4=d.val();
        let a5=e.val();
        let a6=f.val();
        let a7=g.val();
        let a8=h.val();
    
        
        
        

   // alert(a1+a2+a3+a4+a5+a6+a7+a8)
      //  alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actualizarmisdatosadmin',
            data:{
                aa:a1,bb:a2,cc:a3,dd:a4,ee:a5,ff:a6,gg:a7,hh:a8
            }
        });
    
    
    
    
    });
    
    
});
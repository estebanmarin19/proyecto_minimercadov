$(document).ready(function() {
    var codproducto, opcion;
    opcion = 4;
        
    productos = $('productos').DataTable({  
        "ajax":{            
            "url": "bd/crud.php", 
            "method": 'POST', //usamos el metodo POST
            "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
            "dataSrc":""
        },
        "columns":[
            {"data": "codproducto"},
            {"data": "nombreproduct"},
            {"data": "preciocompra"},
            {"data": "precioventa"},
           
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"}
        ]
    });     
    
    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#productos').submit(function(e){                         
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        codproducto = $.trim($('#codproducto').val());    
        nombreproduct = $.trim($('#nombreproduct').val());
        preciocompra = $.trim($('#preciocompra').val());    
        precioventa = $.trim($('#precioventa').val());    

                               
            $.ajax({
              url: "bd/crud.php",
              type: "POST",
              datatype:"json",    
              data:  {codproducto:codproducto, nombreproduct:nombreproduct, preciocompra:preciocompra,precioventa:precioventa},    
              success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function(){
        opcion = 1; //alta           
        user_id=null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css( "background-color", "#17a2b8");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        codproducto = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        nombreproduct = fila.find('td:eq(1)').text();
        preciocompra = fila.find('td:eq(2)').text();
        precioventa = fila.find('td:eq(3)').text();
  

        $("#codproducto").val(codproducto);
        $("#nombreproduct").val(nombreproduct);
        $("#preciocompra").val(preciocompra);
        $("#gprecioventa").val(precioventa);

        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Usuario");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);           
        user_id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro "+user_id+"?");                
        if (respuesta) {            
            $.ajax({
              url: "bd/crud.php",
              type: "POST",
              datatype:"json",    
              data:  {opcion:opcion, user_id:user_id},    
              success: function() {
                  tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
               }
            });	
        }
     });
         
    });    
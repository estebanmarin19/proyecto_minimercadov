const connection=require('../conexion/conexion');
const cnn=connection();
const {render}=require('ejs');
const bcryptjs=require('bcryptjs')
const controller={};
const PDF=require('pdfkit-construct');
const { CLIENT_REMEMBER_OPTIONS } = require('mysql/lib/protocol/constants/client');






//INDEX----------------------------------------------------------------
controller.index=(req,res,next)=>{
    res.render('index')
    
    
}
controller.inicio=(req,res,next)=>{
    res.render('index')
    
}

controller.nosotros=(req,res,next)=>{
    res.render('Nosotros')
    
}
controller.productostienda=(req,res,next)=>{
    res.render('ProductosTienda')
    
}
controller.menuadmin=(req,res,next)=>{
    res.render('Bienvenidoadmin')
    
}
controller.menuemple=(req,res,next)=>{
    res.render('Bienvenidoemple')
    
}
controller.vistadedevoluciones=(req,res,next)=>{
    res.render('vistadevoluciones')
    
}
controller.vistaproductos=(req,res,next)=>{
    if(req.session.login==true){
    
    res.render('productos')
    
   }
   else{
    console.log("Sesion Cerrada")
    res.redirect('/');

   }
    
}

controller.vistadefactura=(req,res,next)=>{
    res.render('factura')
    
}




//************************************************************ */






//LOGIN-----------------------------------------------------------------
controller.iniciar=(req,res,next)=>{
    res.render('login')
    
}

controller.login=async(req,res,next)=>{ 
    
    
    /*    
    const usu =  req.body.usuario;  
    const cla = await req.body.clave;
    const doc=1034656411
    const r="Administrador"
    console.log(usu+cla);

    const password=await bcryptjs.hash(cla,8);
    
    cnn.query('INSERT INTO usuarios SET?',{nomusu:usu,docempleado:doc,clave:password,rol:r},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('index')   
    }
    });*/
    const usu =  req.body.usuario;  
    const cla = await req.body.clave;
    console.log(usu+cla);
    cnn.query('SELECT * FROM usuarios WHERE nomusu=?',[usu],async(err,results)=>{  
        if(err){
            next(new Error("Error de consulta",err)); 
    
        }
        else if(results!=0 && await(bcryptjs.compare(cla,results[0].clave))){
            doc=results[0].docempleado;
            console.log(doc)
            estado=results[0].rol;
                console.log(estado)
            cnn.query('SELECT * FROM usuarios WHERE rol=?',[estado],async(err,results)=>{
                
                cnn.query('SELECT * FROM usuarios WHERE docempleado=?',[doc],async(err,results)=>{
                    doc=results[0].docempleado;
                    

                      req.session.login=true; 
                      req.session.doc=results[0].docempleado;
                      
                      switch(estado){
                        case "Empleado":                     
                            res.redirect('Bienvenidoemple')
                        break; 
                           
                        case "Administrador": 
                             res.redirect('Bienvenidoadmin')
                        break;
               
                     
                    }
                }) 
            })

        }
       else {
            console.log("Datos incorrectos"); 
            res.redirect('login');
        }
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





//ADMIN--------------------------------------------------------------------------


controller.consultadeempleados=(req,res,next)=>{
    console.log(req.session.login)
    if(req.session.login==true){
    cnn.query('SELECT * FROM empleados',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarempleados',{datos:resbd});
        }
    })
     

   }
   else{
    console.log("Sesion Cerrada")
    res.redirect('/');

   }

}


controller.consultadeusuarios=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM usuarios',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarusuarios',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultaclientes=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM clientes',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarclientes',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.clientes=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM clientes',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('consultadeclientes',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadenomina=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM nomina',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarnomina',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}

controller.consultadeproveedores=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM provedor',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarproveedores',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadeproductos=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM productos',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertarproductos',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadetalleproductos=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM detalle_producto',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertardetalleprod',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadeventascli=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM ventas',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('ventasclientes',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedatosempleados=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM empleados  WHERE docempleado=?',[req.session.doc],(err,resbd)=>{
        cnn.query('SELECT * FROM usuarios  WHERE docempleado=?',[req.session.doc],(err,resbd2)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('informacionpersoempleados',{datos:resbd,datos2:resbd2});
            }
        })
      
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedatosadmin=(req,res,next)=>{
       if(req.session.login==true){
    cnn.query('SELECT * FROM empleados  WHERE docempleado=?',[req.session.doc],(err,resbd)=>{
        cnn.query('SELECT * FROM usuarios  WHERE docempleado=?',[req.session.doc],(err,resbd2)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('misdatosadmin',{datos:resbd,datos2:resbd2});
            }
        })
      
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedevcliente=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM devoluciones',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertardevcliente',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedevcliente=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM devoluciones',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertardevcliente',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedetalledev=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM detalle_dev_cliente',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertardetalledev',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.consultadedevproveedor=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM devoluciones_provedor',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('insertardevproveedor',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}









controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });

}





controller.insertarusuarios=async(req,res,next)=>{
    
    const d1=req.body.u1;
    const d2=req.body.u2;
    const d3=req.body.u3;
    const d4=req.body.u4;

    
    const password=await bcryptjs.hash(d3,8);
    
    cnn.query('INSERT INTO usuarios SET?',{nomusu:d1,docempleado:d2,clave:password,rol:d4},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertarusuarios')   
    }
    });
}



controller.insertarempleado=async(req,res,next)=>{
    
    const d1=req.body.e1;
    const d2=req.body.e2;
    const d3=req.body.e3;
    const d4=req.body.e4;
    const d5=req.body.e5;
    const d6=req.body.e6;
    const d7=req.body.e7;
    const d8=req.body.e8;

    cnn.query('INSERT INTO empleados SET?',{docempleado:d1,nombre:d2,apellido:d3,direccion:d4,correo:d5,celular:d6,sexo:d7,estado:d8},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertarempleados')   
    }
    });
}

controller.insertarcliente=async(req,res,next)=>{
  
    const d1=req.body.a1;
    const d2=req.body.a2;
    const d3=req.body.a3;
    

    cnn.query('INSERT INTO clientes SET?',{doccli:d1,nombre:d2,apellido:d3},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Ventas')   
    }
    });
}
controller.insertarnomina=async(req,res,next)=>{
    
    const d1=req.body.b1;
    const d2=req.body.b2;
    const d3=req.body.b3;
    const d4=req.body.b4;
    const d5=req.body.b5;
    const d6=req.body.b6;
    const d7=req.body.b7;
    const d8=req.body.b8;
    console.log(d1)

    var a=0;
    let b=(d3*d4)+parseInt(d5*d6)
    console.log(b)

    cnn.query('INSERT INTO nomina SET?',{codnomina:a,docempleado:d1,tipocontrato:d2,diastrabajados:d3,sueldodia:d4,hextras:d5,valorhextras:d6,fechainicial:d7,fechafinal:d8,salariototal:b},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertarnomina')   
    }
    });
}

controller.insertarproveedor=async(req,res,next)=>{
   
   
    
    const d1=req.body.e1;
    const d2=req.body.e2;
    const d3=req.body.e3;
    const d4=req.body.e4;
    const d5=req.body.e5;
    
    console.log(d1)

    cnn.query('INSERT INTO provedor SET?',{codprovedor:d1,nombreprov:d2,ciudad:d3,direccion:d4,celular:d5},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertarproveedores')   
    }
    });
}

controller.insertarproductos=async(req,res,next)=>{
    
   
    
    const d1=req.body.z1;
    const d2=req.body.z2;
    const d3=req.body.z3;
    const d4=req.body.z4;

    const d5=req.body.z5;
    const d6=req.body.z6;
    
    
    console.log(d1)

    cnn.query('INSERT INTO productos SET?',{codproducto:d1,nombreproduct:d2,preciocompra:d3,precioventa:d4},(err,resbd)=>{
        cnn.query('INSERT INTO detalle_producto SET?',{codprovedor:d5,codproducto:d1,cantdisponible:d6},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertarproductos')   
    }
    })
    });
}


controller.insertardevclientes=async(req,res,next)=>{
    
   
    
    const d1=req.body.w1;
    const d2=req.body.w2;
    const d3=req.body.w3;
    const d4=req.body.w4;
    
    
    console.log(d1)

    cnn.query('INSERT INTO devoluciones SET?',{codev:d1,doccli:d2,fechadev:d3,motivodev:d4},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertardevcliente')   
    }
    });
}
controller.insertardetalledevolucion=async(req,res,next)=>{
  
   
    
    const d1=req.body.w1;
    const d2=req.body.w2;
    const d3=req.body.w3;
    
    
    
    console.log(d1)

    cnn.query('INSERT INTO detalle_dev_cliente SET?',{codev:d1,codproducto:d2,cantidaddev:d3},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertardetalledev')   
    }
    });
}
controller.insertardevprov=async(req,res,next)=>{
   
    
    const d1=req.body.e1;
    const d2=req.body.e2;
    const d3=req.body.e3;
    const d4=req.body.e4;
    
    
    console.log(d1)

    cnn.query('INSERT INTO devoluciones_provedor SET?',{codigodevpro:d1,codprovedor:d2,fechadev:d3,motivodev:d4},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('insertardevproveedor')   
    }
    });
}

controller.actualizarusu=async(req,res,next)=>{
    
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;

    const password=await bcryptjs.hash(d3,8);

    cnn.query('UPDATE usuarios SET  nomusu="'+d1+'",clave="'+password+'",rol="'+d4+'" WHERE docempleado="'+d2+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            
        }

    })

}


controller.actualizaremple=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
    const d5=req.body.ee;
    const d6=req.body.ff;
    const d7=req.body.gg;
    const d8=req.body.hh;

    

    cnn.query('UPDATE empleados SET  nombre="'+d2+'",apellido="'+d3+'",direccion="'+d4+'",correo="'+d5+'",celular="'+d6+'",sexo="'+d7+'",estado="'+d8+'" WHERE docempleado="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
           
        }

    })
}
controller.actualizarnom=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
    const d5=req.body.ee;
    const d6=req.body.ff;
    const d7=req.body.gg;
    const d8=req.body.hh;
    const d9=req.body.a1;

    cnn.query('UPDATE nomina SET tipocontrato="'+d2+'",diastrabajados="'+d3+'",sueldodia="'+d4+'",hextras="'+d5+'",valorhextras="'+d6+'",fechainicial="'+d7+'",fechafinal="'+d8+'" WHERE codnomina="'+d9+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
          
        }

    })
}
controller.actualizarprod=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;

  

    cnn.query('UPDATE productos SET  nombreproduct="'+d2+'",preciocompra="'+d3+'",precioventa="'+d4+'" WHERE codproducto="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            
        }

    })
}
controller.actualizarprov=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
    const d5=req.body.ee;

    cnn.query('UPDATE provedor SET  nombreprov="'+d2+'",ciudad="'+d3+'",direccion="'+d4+'",celular="'+d5+'" WHERE codprovedor="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
        
        }
    })
}
controller.eliminarusu=async(req,res,next)=>{
   
    const d=req.body.dd

    cnn.query('DELETE  FROM usuarios WHERE docempleado="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('usuarios');
        }

    })

}
controller.eliminaremple=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM empleados WHERE docempleado="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('usuarios');
        }

    })
}
controller.eliminarnom=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM nomina WHERE codnomina="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('insertarnomina');
        }

    })
}
controller.eliminarprod=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM productos WHERE codproducto="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('usuarios');
        }

    })
}
controller.eliminarprov=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM provedor WHERE codprovedor="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('usuarios');
        }

    })
}


controller.actualizardevolucionescliente=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
   

    

    cnn.query('UPDATE devoluciones SET  doccli="'+d2+'",fechadev="'+d3+'",motivodev="'+d4+'" WHERE codev="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
           
        }

    })
}
controller.eliminardevolucionescliente=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM devoluciones WHERE codev="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('insertardevcliente');
        }

    })
}

controller.actualizardetalledevoluciones=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    
   

    

    cnn.query('UPDATE detalle_dev_cliente SET  codproducto="'+d2+'",cantidaddev="'+d3+'" WHERE codev="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
           
        }

    })
}
controller.eliminardetalledevoluciones=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM detalle_dev_cliente WHERE codev="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('insertardetalledev');
        }

    })
}
controller.actualizardevolucionesprov=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
   

    

    cnn.query('UPDATE devoluciones_provedor SET  codprovedor="'+d2+'",fechadev="'+d3+'",motivodev="'+d4+'" WHERE codigodevpro="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
           
        }

    })
}
controller.eliminardevolucionesprov=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM devoluciones_provedor WHERE codigodevpro="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('insertardevproveedor');
        }

    })
}

controller.actualizarclientes=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    cnn.query('UPDATE clientes SET  nombre="'+d2+'",apellido="'+d3+'" WHERE doccli="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            
           
        }

    })
}
controller.eliminarclientes=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM clientes WHERE doccli="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('consultadeclientes');
        }

    })
}

controller.actualizardatosadmin=async(req,res,next)=>{
    const d1=req.body.aa;
    const d2=req.body.bb;
    const d3=req.body.cc;
    const d4=req.body.dd;
    const d5=req.body.ee;
    const d6=req.body.ff;
    const d7=req.body.gg;
    const d8=req.body.hh;

    const password=await bcryptjs.hash(d8,8);
    

    

    cnn.query('UPDATE empleados SET  nombre="'+d2+'",apellido="'+d3+'",direccion="'+d4+'",correo="'+d5+'",celular="'+d6+'" WHERE docempleado="'+d1+'"',async(err,respbb)=>{
        cnn.query('UPDATE usuarios SET  nomusu="'+d7+'",clave="'+password+'" WHERE docempleado="'+d1+'"',async(err,respbb)=>{
            if(err){
                next(new Error(err));
    
            }
            else{
                console.log("Actualizado")
               
            }
    
        })


    })
}





//VENTAS**********************************
controller.consultadeventas=(req,res,next)=>{
    if(req.session.login==true){
        cnn.query('DELETE  FROM ventas WHERE codventa="'+10000+'"',(err,resbd)=>{
            cnn.query('SELECT * FROM ventas',(err,resbd)=>{
    
                if(err){
                    next(new Error(err))
                    console.log("Error en la consulta")
                }
                else{
                    console.log(resbd)
                    res.render('insertarventas',{datos:resbd});
                }
            })
           
        }) 
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.ventas=(req,res,next)=>{
    res.render('Ventas')
    
}
controller.ventas2=(req,res,next)=>{
    res.render('Ventas2')
    
}
controller.ventas4=(req,res,next)=>{
    res.render('Ventas4')
    
}
controller.ventas5=(req,res,next)=>{
    res.render('Ventas5')
    
}
controller.insertarventax=async(req,res,next)=>{

    const cedcli=req.body.d1;
    
    let b=10000;
    cnn.query('INSERT INTO ventas SET?',{codventa:b,doccli:cedcli,docempleado:req.session.doc,valorventa:0},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('Ventas2')   
        }
      
    
        })
}

controller.procesoproduct=(req,res,next)=>{

    const cc1=req.body.d1;

    cnn.query('SELECT * FROM detalle_producto WHERE codproducto="'+cc1+'"',(err,resbd2)=>{
        cnn.query('SELECT * FROM productos WHERE codproducto="'+cc1+'"',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
    
                console.log(resbd)
                console.log(resbd2)
                res.render('Ventas3',{datos:resbd,datos2:resbd2});
            }
            
    
           
        })
 

       
    })
}
controller.detalleventa=async(req,res,next)=>{

    let a=0;
   
    const dt2=req.body.codprod;
    let b=10000;
    const dt3=req.body.cpro;
    const dt4=req.body.valor;
    const dt5=req.body.cd;

   
    
    
    cnn.query('INSERT INTO detalle_venta SET?',{coddetalle:a,codventa:b,codproducto:dt2,cantidadproduc:dt3,valordventa:dt4},(err,resbd)=>{
        cnn.query('UPDATE ventas SET  valorventa=valorventa+"'+dt4+'" WHERE codventa="'+b+'"',async(err,respbb)=>{
            cnn.query('UPDATE detalle_producto SET  cantdisponible=cantdisponible-"'+dt3+'" WHERE codproducto="'+dt2+'"',async(err,respbb)=>{
                if(err){
                    next(new Error(err));
        
                }
                else{
                    console.log("Actualizado")
                    
                    
                }
        
            })
    
        })
        
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Ventas5')   
    }
    });
}

controller.total=async(req,res,next)=>{
    const cod=req.body.d1;



   
   
    cnn.query('UPDATE ventas SET  codventa="'+cod+'" WHERE codventa="'+10000+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            res.redirect('insertarventas')
            
        }

    })
}
controller.actualizarventa=async(req,res,next)=>{
    const d1=req.body.a1;
    const d2=req.body.a2;


    cnn.query('UPDATE ventas SET  valorventa="'+d2+'" WHERE codventa="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('insertarventas');
        
        }
    })
}
controller.eliminarventa=async(req,res,next)=>{
    
    const d1=req.body.dd

    cnn.query('DELETE  FROM ventas WHERE codventa="'+d1+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('insertarventas');
        }

    })

}

//ventascli***************


controller.ventasc1=(req,res,next)=>{
    res.render('Ventasc')
    
}
controller.ventasc2=(req,res,next)=>{
    res.render('Ventasc2')
    
}
controller.ventasc4=(req,res,next)=>{
    res.render('Ventasc4')
    
}
controller.ventasc5=(req,res,next)=>{
    res.render('Ventasc5')
    
}
controller.insertarventaxc=async(req,res,next)=>{

   
    const cedcli=req.body.d1;
    
    let b=10000;
    cnn.query('INSERT INTO ventas SET?',{codventa:b,doccli:cedcli,docempleado:req.session.doc,valorventa:0},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('Ventasc2')   
        }
      
    
        })
}

controller.procesoproductc=(req,res,next)=>{

    const cc1=req.body.d1;

    cnn.query('SELECT * FROM detalle_producto WHERE codproducto="'+cc1+'"',(err,resbd2)=>{
        cnn.query('SELECT * FROM productos WHERE codproducto="'+cc1+'"',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
    
                console.log(resbd)
                console.log(resbd2)
                res.render('Ventasc3',{datos:resbd,datos2:resbd2});
            }
            
    
           
        })
 

       
    })
}


controller.totalc=async(req,res,next)=>{
    const cod=req.body.d1;



   
   
    cnn.query('UPDATE ventas SET  codventa="'+cod+'" WHERE codventa="'+10000+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            res.redirect('ventasclientes')
            
        }

    })
}



///////////////////////////////////



//PEDIDOS*********************

controller.pedidos=(req,res,next)=>{
    if(req.session.login==true){
    res.render('insertarpedidos')
    }else{
        console.log("Sesion Cerrada")
       res.redirect('/');
    }
    
}
controller.consultapedido1=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM pedidos',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('pedidos1',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.insertarpedido1=async(req,res,next)=>{
    const d1=req.body.e1;
    const d2=req.body.e2;
    const d3=req.body.e3;
    const d4=req.body.e4;

   

    cnn.query('INSERT INTO pedidos SET?',{codpedido:d1,fecha:d2,codprovedor:d3,estadopedido:d4},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
            res.redirect('pedidos1')   
            }
    });
}
controller.actualizarp1=async(req,res,next)=>{
    const d1=req.body.a1;
    const d2=req.body.a2;


    cnn.query('UPDATE pedidos SET  estadopedido="'+d2+'" WHERE codpedido="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('pedidos1');
        
        }
    })
}
controller.eliminarp1=async(req,res,next)=>{
    
    const d1=req.body.dd

    cnn.query('DELETE  FROM pedidos WHERE codpedido="'+d1+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('pedidos1');
        }

    })

}



controller.consultapedido2=(req,res,next)=>{
    if(req.session.login==true){
    cnn.query('SELECT * FROM detalle_pedido',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('pedidos2',{datos:resbd});
        }
    })
}
else{
 console.log("Sesion Cerrada")
 res.redirect('/');

}
}
controller.insertarpedido2=async(req,res,next)=>{
    var a=0;
    const d1=req.body.e1;
    const d2=req.body.e2;
    const d3=req.body.e3;
    const d4=req.body.e4;

   

    cnn.query('INSERT INTO detalle_pedido SET?',{coddpedido:a,codpedido:d1,codproducto:d2,preciocompra:d3,cantidadproducped:d4},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
            res.redirect('pedidos2')   
            }
    });
}
controller.actualizarp2=async(req,res,next)=>{
    const d1=req.body.a1;
    const d2=req.body.a2;
    const d3=req.body.a3;


    cnn.query('UPDATE detalle_pedido SET  preciocompra="'+d2+'",cantidadproducped="'+d3+'" WHERE coddpedido="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('pedidos2');
        
        }
    })
}
controller.eliminarp2=async(req,res,next)=>{
   
    const d1=req.body.dd

    cnn.query('DELETE  FROM detalle_pedido WHERE coddpedido="'+d1+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('pedidos2');
        }

    })

}
/////////////////////

controller.detalleprod=async(req,res,next)=>{
    const d1=req.body.n1;
    const d2=req.body.n2;


    cnn.query('UPDATE detalle_producto SET  cantdisponible=cantdisponible+"'+d2+'" WHERE codproducto="'+d1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
    
        }
        else{
            console.log("Actualizado")
            res.redirect('insertardetalleprod')
            
            
        }
    
    })
   
   
    
}

//FACTURAS*********************************
controller.factura=(req,res,next)=>{

    const f1=req.body.d1;
    const f2=req.body.d2;
     const f3=req.body.d3;
     const f4=req.body.d4;

     console.log(f1+f2+f3+f4)

    cnn.query('SELECT * FROM clientes WHERE doccli="'+f2+'"',(err,resbd1)=>{
        cnn.query('SELECT * FROM empleados WHERE docempleado="'+f3+'"',(err,resbd2)=>{
            cnn.query('SELECT * FROM productos WHERE codproducto IN(SELECT codproducto FROM detalle_venta WHERE codventa="'+f1+'")',(err,resbd3)=>{
                cnn.query('SELECT * FROM detalle_venta WHERE codventa="'+f1+'" ORDER BY codproducto ASC',(err,resbd4)=>{
                    cnn.query('SELECT * FROM ventas WHERE codventa="'+f1+'"',(err,resbd5)=>{
            

                        if(err){
                            next(new Error(err))
                            console.log("Error en la consulta")
                        }
                        else{
                
                            console.log(resbd1)
                            console.log(resbd2)
                            console.log(resbd3)
                            console.log(resbd4)
                            console.log(resbd5)
                            res.render('factura',{datos1:resbd1,datos2:resbd2,datos3:resbd3,datos4:resbd4,datos5:resbd5});
                        }
                        
                
                       
                    })
            

             
                    
            
                   
                })
            

       
                
        
               
            })
            

            
            
    
           
        })
    })
}
////////////////////////////////////////////

module.exports=controller;






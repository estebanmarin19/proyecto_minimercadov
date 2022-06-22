const express=require('express');
const rutas=express.Router();
const controller=require('../controlador/controller');


//INDEX*********************************************************
rutas.get('/',controller.index);
rutas.get('/index',controller.inicio);
rutas.get('/Nosotros',controller.nosotros);
rutas.get('/ProductosTienda',controller.productostienda);

////////////////////////////////////////////////


//LOGIN**********************************
rutas.get('/login',controller.iniciar);
rutas.post('/login',controller.login);
rutas.get('/cerrar',controller.cerrar);
//******************************* */


//ADMIM**********************************
rutas.get('/Bienvenidoadmin',controller.menuadmin);
rutas.get('/Bienvenidoemple',controller.menuemple);
rutas.get('/insertarempleados',controller.consultadeempleados);
rutas.get('/insertarusuarios',controller.consultadeusuarios);
rutas.get('/insertarclientes',controller.consultaclientes);
rutas.get('/insertarnomina',controller.consultadenomina);
rutas.get('/insertarventas',controller.consultadeventas);
rutas.get('/insertarproveedores',controller.consultadeproveedores);
rutas.get('/insertarproductos',controller.consultadeproductos);
rutas.get('/productos',controller.vistaproductos);



rutas.get('/factura',controller.vistadefactura);

rutas.get('/insertardetalleprod',controller.consultadetalleproductos);
rutas.get('/insertardevcliente',controller.consultadedevcliente);
rutas.get('/consultadeclientes',controller.clientes);
rutas.get('/insertardetalledev',controller.consultadedetalledev);
rutas.get('/insertardevproveedor',controller.consultadedevproveedor);
rutas.get('/vistadevoluciones',controller.vistadedevoluciones);




rutas.post('/actualizarusu',controller.actualizarusu);
rutas.post('/eliminarusu',controller.eliminarusu);

rutas.post('/actualizaremple',controller.actualizaremple);
rutas.post('/eliminaremple',controller.eliminaremple);

rutas.post('/actualizarnom',controller.actualizarnom);
rutas.post('/eliminarnom',controller.eliminarnom);

rutas.post('/actualizarprod',controller.actualizarprod);
rutas.post('/eliminarprod',controller.eliminarprod);

rutas.post('/actualizarprov',controller.actualizarprov);
rutas.post('/eliminarprov',controller.eliminarprov);

rutas.get('/ventasclientes',controller.consultadeventascli);
rutas.get('/informacionpersoempleados',controller.consultadedatosempleados);
rutas.get('/misdatosadmin',controller.consultadedatosadmin);
rutas.post('/actualizarmisdatosadmin',controller.actualizardatosadmin);


rutas.post('/actualizardevclientes',controller.actualizardevolucionescliente);
rutas.post('/eliminardevclientes',controller.eliminardevolucionescliente);

rutas.post('/actualizardetalledev',controller.actualizardetalledevoluciones);
rutas.post('/eliminardetalledev',controller.eliminardetalledevoluciones);

rutas.post('/actualizardevproveedores',controller.actualizardevolucionesprov);
rutas.post('/eliminardevproveedores',controller.eliminardevolucionesprov);

rutas.post('/actualizarcli',controller.actualizarclientes);
rutas.post('/eliminarcli',controller.eliminarclientes);




rutas.post('/iusuarios',controller.insertarusuarios);
rutas.post('/iempleado',controller.insertarempleado);
rutas.post('/icliente',controller.insertarcliente);
rutas.post('/inomina',controller.insertarnomina);
rutas.post('/iproveedor',controller.insertarproveedor);
rutas.post('/iproductos',controller.insertarproductos);
rutas.post('/idevcli',controller.insertardevclientes);
rutas.post('/idevdetcli',controller.insertardetalledevolucion);
rutas.post('/idevprov',controller.insertardevprov);











//VENTAS**********************************
rutas.get('/Ventas',controller.ventas);
rutas.get('/Ventas2',controller.ventas2);
rutas.post('/procesoventax',controller.insertarventax);
rutas.post('/procesoproduct',controller.procesoproduct);
rutas.post('/creardetalle',controller.detalleventa);
rutas.get('/Ventas4',controller.ventas4);
rutas.get('/Ventas5',controller.ventas5);

rutas.post('/total',controller.total);

rutas.post('/actventa',controller.actualizarventa);
rutas.post('/eliventa',controller.eliminarventa);
/////////////////////////////////////////
rutas.get('/Ventasc',controller.ventasc1);
rutas.get('/Ventasc2',controller.ventasc2);
rutas.post('/procesoventaxc',controller.insertarventaxc);
rutas.post('/procesoproductc',controller.procesoproductc);

rutas.post('/creardetallec',controller.detalleventa);
rutas.get('/Ventasc4',controller.ventasc4);
rutas.get('/Ventasc5',controller.ventasc5);

rutas.post('/totalc',controller.totalc);


//PEDIDOS*********************************

rutas.get('/insertarpedidos',controller.pedidos);

rutas.get('/pedidos1',controller.consultapedido1);
rutas.post('/ipedido1',controller.insertarpedido1);
rutas.post('/actp1',controller.actualizarp1);
rutas.post('/elip1',controller.eliminarp1);

rutas.get('/pedidos2',controller.consultapedido2);
rutas.post('/ipedido2',controller.insertarpedido2);
rutas.post('/actp2',controller.actualizarp2);
rutas.post('/elip2',controller.eliminarp2);

///////////////////////////////////////
rutas.post('/idetallepro',controller.detalleprod);



rutas.post('/factura',controller.factura);



module.exports=rutas;
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    //Se crean 20 ventas
    const ventas = [];
    for (let i = 1; i <= 20; i++) {
      ventas.push({
        id: i,
        numero_ticket: `TCK-${1000 + i}`,
        empresa: 'Empresa',
        total: 0,
        empleado_id: Math.random(2) + 1,
        numero_caja: '001',
        dia: new Date(2025, 9, i/2)
      });
    }
    await queryInterface.bulkInsert('ventas', ventas, {});

    // 2) Array de productos
    const productos = [
      { id: 1, name: 'Café', price: 500 },
      { id: 2, name: 'Té Negro', price: 450 },
      { id: 3, name: 'Yerba Mate', price: 600 },
      { id: 4, name: 'Azúcar', price: 300 },
      { id: 5, name: 'Harina', price: 350 },
      { id: 6, name: 'Aceite de Girasol', price: 1200 },
      { id: 7, name: 'Leche Entera', price: 800 },
      { id: 8, name: 'Leche Descremada', price: 820 },
      { id: 9, name: 'Galletitas Dulces', price: 700 },
      { id: 10, name: 'Galletitas Saladas', price: 680 },
      { id: 11, name: 'Pan de Molde', price: 750 },
      { id: 12, name: 'Arroz', price: 500 },
      { id: 13, name: 'Fideos Spaghetti', price: 520 },
      { id: 14, name: 'Fideos Mostachol', price: 530 },
      { id: 15, name: 'Lentejas', price: 900 },
      { id: 16, name: 'Porotos', price: 850 },
      { id: 17, name: 'Garbanzos', price: 880 },
      { id: 18, name: 'Sal Fina', price: 250 },
      { id: 19, name: 'Sal Gruesa', price: 240 },
      { id: 20, name: 'Pimienta Negra', price: 950 },
      { id: 21, name: 'Oregano', price: 700 },
      { id: 22, name: 'Ají Molido', price: 680 },
      { id: 23, name: 'Comino', price: 720 },
      { id: 24, name: 'Mayonesa', price: 950 },
      { id: 25, name: 'Ketchup', price: 930 },
      { id: 26, name: 'Mostaza', price: 920 },
      { id: 27, name: 'Agua Mineral', price: 400 },
      { id: 28, name: 'Gaseosa Cola', price: 950 },
      { id: 29, name: 'Gaseosa Lima-Limón', price: 930 },
      { id: 30, name: 'Jugo en Polvo', price: 150 },
      { id: 31, name: 'Cerveza Rubia', price: 1200 },
      { id: 32, name: 'Cerveza Negra', price: 1250 },
      { id: 33, name: 'Vino Tinto', price: 2000 },
      { id: 34, name: 'Vino Blanco', price: 2100 },
      { id: 35, name: 'Champagne', price: 3500 },
      { id: 36, name: 'Queso Cremoso', price: 2500 },
      { id: 37, name: 'Queso Rallado', price: 2800 },
      { id: 38, name: 'Manteca', price: 1100 },
      { id: 39, name: 'Dulce de Leche', price: 950 },
      { id: 40, name: 'Mermelada de Frutilla', price: 900 },
      { id: 41, name: 'Mermelada de Durazno', price: 880 },
      { id: 42, name: 'Chocolate en Barra', price: 1500 },
      { id: 43, name: 'Cacao en Polvo', price: 1400 },
      { id: 44, name: 'Helado de Vainilla', price: 3000 },
      { id: 45, name: 'Helado de Chocolate', price: 3100 }
    ];

    // 3) detallesVentas para ventas
    const detalleVentas = [];
    let idDetalle = 1;

    for (let v = 1; v <= 20; v++) {
      const cantProductos = Math.floor(Math.random() * 3) + 2; // 2 a 4 productos
      let totalVenta = 0;

      // Se eligen productos aleatorios
      const usados = new Set();
      for (let i = 0; i < cantProductos; i++) {
        let prod;
        do {
          prod = productos[Math.floor(Math.random() * productos.length)];
        } while (usados.has(prod.id));
        usados.add(prod.id);

        const cantidad = Math.floor(Math.random() * 5) + 1;
        const subtotal = cantidad * prod.price;

        detalleVentas.push({
          id: idDetalle++,
          producto: prod.name,
          cantidad,
          precio: prod.price,
          venta_id: v
        });

        totalVenta += subtotal;
      }

      // Actualiza el total
      ventas[v - 1].total = totalVenta;
    }

    await queryInterface.bulkInsert('detalle_ventas', detalleVentas, {});

    // Actualiza los totales de las ventas
    for (let v of ventas) {
      await queryInterface.bulkUpdate(
        'ventas',
        { total: v.total },
        { id: v.id }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ventas', null, {});
  }
};

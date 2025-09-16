'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      { name: 'Café', codigo: 'PROD-001', price: 500.00, cant: 100 },
      { name: 'Té Negro', codigo: 'PROD-002', price: 450.00, cant: 80 },
      { name: 'Yerba Mate', codigo: 'PROD-003', price: 600.00, cant: 120 },
      { name: 'Azúcar', codigo: 'PROD-004', price: 300.00, cant: 150 },
      { name: 'Harina', codigo: 'PROD-005', price: 350.00, cant: 200 },
      { name: 'Aceite de Girasol', codigo: 'PROD-006', price: 1200.00, cant: 75 },
      { name: 'Leche Entera', codigo: 'PROD-007', price: 800.00, cant: 90 },
      { name: 'Leche Descremada', codigo: 'PROD-008', price: 820.00, cant: 85 },
      { name: 'Galletitas Dulces', codigo: 'PROD-009', price: 700.00, cant: 110 },
      { name: 'Galletitas Saladas', codigo: 'PROD-010', price: 680.00, cant: 95 },
      { name: 'Pan de Molde', codigo: 'PROD-011', price: 750.00, cant: 70 },
      { name: 'Arroz', codigo: 'PROD-012', price: 500.00, cant: 140 },
      { name: 'Fideos Spaghetti', codigo: 'PROD-013', price: 520.00, cant: 130 },
      { name: 'Fideos Mostachol', codigo: 'PROD-014', price: 530.00, cant: 125 },
      { name: 'Lentejas', codigo: 'PROD-015', price: 900.00, cant: 60 },
      { name: 'Porotos', codigo: 'PROD-016', price: 850.00, cant: 65 },
      { name: 'Garbanzos', codigo: 'PROD-017', price: 880.00, cant: 55 },
      { name: 'Sal Fina', codigo: 'PROD-018', price: 250.00, cant: 180 },
      { name: 'Sal Gruesa', codigo: 'PROD-019', price: 240.00, cant: 160 },
      { name: 'Pimienta Negra', codigo: 'PROD-020', price: 950.00, cant: 40 },
      { name: 'Oregano', codigo: 'PROD-021', price: 700.00, cant: 45 },
      { name: 'Ají Molido', codigo: 'PROD-022', price: 680.00, cant: 50 },
      { name: 'Comino', codigo: 'PROD-023', price: 720.00, cant: 35 },
      { name: 'Mayonesa', codigo: 'PROD-024', price: 950.00, cant: 60 },
      { name: 'Ketchup', codigo: 'PROD-025', price: 930.00, cant: 55 },
      { name: 'Mostaza', codigo: 'PROD-026', price: 920.00, cant: 50 },
      { name: 'Agua Mineral', codigo: 'PROD-027', price: 400.00, cant: 200 },
      { name: 'Gaseosa Cola', codigo: 'PROD-028', price: 950.00, cant: 100 },
      { name: 'Gaseosa Lima-Limón', codigo: 'PROD-029', price: 930.00, cant: 95 },
      { name: 'Jugo en Polvo', codigo: 'PROD-030', price: 150.00, cant: 220 },
      { name: 'Cerveza Rubia', codigo: 'PROD-031', price: 1200.00, cant: 80 },
      { name: 'Cerveza Negra', codigo: 'PROD-032', price: 1250.00, cant: 70 },
      { name: 'Vino Tinto', codigo: 'PROD-033', price: 2000.00, cant: 60 },
      { name: 'Vino Blanco', codigo: 'PROD-034', price: 2100.00, cant: 55 },
      { name: 'Champagne', codigo: 'PROD-035', price: 3500.00, cant: 30 },
      { name: 'Queso Cremoso', codigo: 'PROD-036', price: 2500.00, cant: 45 },
      { name: 'Queso Rallado', codigo: 'PROD-037', price: 2800.00, cant: 40 },
      { name: 'Manteca', codigo: 'PROD-038', price: 1100.00, cant: 75 },
      { name: 'Dulce de Leche', codigo: 'PROD-039', price: 950.00, cant: 65 },
      { name: 'Mermelada de Frutilla', codigo: 'PROD-040', price: 900.00, cant: 70 },
      { name: 'Mermelada de Durazno', codigo: 'PROD-041', price: 880.00, cant: 60 },
      { name: 'Chocolate en Barra', codigo: 'PROD-042', price: 1500.00, cant: 50 },
      { name: 'Cacao en Polvo', codigo: 'PROD-043', price: 1400.00, cant: 55 },
      { name: 'Helado de Vainilla', codigo: 'PROD-044', price: 3000.00, cant: 35 },
      { name: 'Helado de Chocolate', codigo: 'PROD-045', price: 3100.00, cant: 30 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};

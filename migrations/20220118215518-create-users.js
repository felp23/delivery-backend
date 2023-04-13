'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */

		await queryInterface.createTable('users', {

			userId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userFirstName: {
				type: Sequelize.TEXT
			},
			userLastName: {
				type: Sequelize.TEXT
			},
			userPassword: {
				type: Sequelize.TEXT
			},
			userEmail: {
				type: Sequelize.TEXT
			},
			userRegisterDatetime: {
				type: Sequelize.DATE
			}
		})
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('users');
	}
};

module.exports = function(app) {
	var MongoDB = app.dataSources.MongoDB;

	MongoDB.automigrate('salseman', function(err) {
		if (err) throw (err);
		var salseman = app.models.salseman;

		salseman.create([{
				username: 'Andrea',
				email: 'andrea@admin.com',
				password: 'abcdef',
                name:'Andrea',
                surname:'Cafora',
                company:'Like a coffe',
                phoneNumber:'23153451'
			}
		], function(err, users) {
			if (err) throw (err);
			var Role = app.models.Role;
			var RoleMapping = app.models.RoleMapping;

			//create the admin role
			Role.create({
				name: 'admin'
			}, function(err, role) {
				if (err) throw (err);
				//make admin
				role.principals.create({
					principalType: RoleMapping.USER,
					principalId: users[0].id
				}, function(err, principal) {
					if (err) throw (err);
				});
			});
		});
	});

};
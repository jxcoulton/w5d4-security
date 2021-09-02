const bcrypt = require("bcrypt");
const users = [];

module.exports = {
	login: (req, res) => {
		console.log("Logging In User");

		// console.log(req.body);

		const { username, password } = req.body;
		console.log(req.body);

		for (let i = 0; i < users.length; i++) {
			const existingPassword = bcrypt.compareSync(
				password,
				users[i].hashedPassword
			);
			if (users[i].username === username && existingPassword) {
				let hashedUserData = { ...users[i] };
				console.log(hashedUserData);

				delete hashedUserData.hashedPassword;
				res.status(200).send(hashedUserData[i]);
				console.log(hashedUserData);
			} else {
				res.status(400).send("User not found.");
			}
		}
	},
	register: (req, res) => {
		console.log("Registering User");

		// console.log(req.body);

		const { username, email, firstName, lastName, password } = req.body;

		if (
			username !== "" &&
			email !== "" &&
			firstName !== "" &&
			lastName !== "" &&
			password !== ""
		) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].username === username) {
					res.status(400).send("Username is already taken");
					return;
				} else if (users[i].email === email) {
					res.status(400).send("Email already registered");
					return;
				}
			}

			const salt = bcrypt.genSaltSync(12);
			const hashedPassword = bcrypt.hashSync(password, salt);

			let userDataObj = {
				username,
				email,
				firstName,
				lastName,
				hashedPassword,
			};

			users.push(userDataObj);

			let secureUserInfo = { ...userDataObj };

			delete secureUserInfo.hashedPassword;
			res.status(200).send(secureUserInfo);
			console.log(users);
			// console.log(secureUserInfo);
		} else {
			res.sendStatus(400);
		}
	},
};

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Cuenta } = require('../models')

const login = async (req, res) => {
  try {
    const { user, password } = req.body

    if (!user || !password) {
      return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' })
    }

    const cuenta = await Cuenta.findOne({ user_e: user })
    if (!cuenta) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
    }

    const passwordMatch = await bcrypt.compareSync(password, cuenta.dataValues.password_e)
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
    }

    const exp = Date.now() + 1000 * 60 * 60 * 8
    const token = jwt.sign({ sub: cuenta.dataValues.id, exp }, process.env.SECRET)

    res.cookie('Authorization', token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({ success: 'Login exitoso', token })
  } catch (err) {
    console.error('Error en login:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('Authorization')
    res.status(200).json({ success: 'Logout exitoso' })
  } catch (err) {
    console.error('Error en logout:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const signup = async (req, res) => {
  try {
    const { user, password } = req.body

    if (!user || !password) {
      return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' })
    }

    const usuarioExistente = await Cuenta.findOne({ where: {user_e: user} })
    if (usuarioExistente) {
      return res.status(409).json({ success: false, message: 'El usuario ya existe' })
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    await Cuenta.create({ user_e: user, password_e: hashedPassword })

    res.sendStatus(201)
  } catch (err) {
    console.error('Error en signup:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchAccounts = async (req, res) => {
  	try {
		const cuentas = await Cuenta.findAll()

		return res.status(200).json({ success: true, cuentas });
	} catch (err) {
		errReturn(res, err, "(fetchCuentas) Error al obtener cuentas:");
	}
}

const deleteAccount = async (req, res) => {
  	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const cuenta = await Cuenta.destroy({
			where: {
				id
			}
		})

		return res.json({ success: true, cuenta });
	} catch (err) {
		errReturn(res, err, "(deleteAccount) Error al eliminar la cuenta:");
	}

}

const modAccount = async (req, res) => {
try {
		const { id } = req.params;
		const { user, password } = req.body;

		if (!numVerification(res, id, "id")) return;

		if (
			typeof user !== "string" ||
			typeof password !== "string"
		) {
			throw noSuccess(res, "Formato de los valores incorrecto.");
		}

		const cuenta = Cuenta.update(
			{
        user_e: user,
        password_e: password
			},
			{
				where: {
					id
				}
			})

		return res.status(200).json({ success: true, cuenta });
	} catch (err) {
		errReturn(res, err, "(modAccount) Error al modificar la cuenta:");
	}
}

function checkAuth (req, res) {
  try {
    if (!req.cookies.Authorization) {
      return res.status(401).json({ success: false, message: 'No autenticado' })
    }
    const token = req.cookies.Authorization
    const decoded = jwt.verify(token, process.env.SECRET)

    res.status(200).json({ success: 'Autenticado', userId: decoded.sub })
  } catch (err) {
    console.error('Error en checkAuth:', err)
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = {
  signup,
  login,
  logout,
  fetchAccounts,
  deleteAccount,
  modAccount,
  checkAuth
};
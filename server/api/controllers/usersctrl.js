import express from 'express'
import bcrypt from 'bcrypt'
import * as jwtUtils from '../utils/jwt.utils'
import * as mod from '../models/usersmod'
import util from 'util'
import jwt from 'jsonwebtoken'
//Passport pour le login/logout -> req.user
import passport from 'passport'
import * as op from '../utils/passport.utils'

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;

// FONCTIONS

export const adduser = async (req, res) => {
	const { email, login, password, firstName, lastName,
		bio, genre, dateOfBirth, orientation } = req.body
//	var location  = req.body.location;
//	var photo = req.body.photo;

	if (!(email || login || password || firstName || lastName
		|| bio || genre || dateOfBirth || orientation))
		return res.status(400).json({ 'error': 'Missing parameters.' });

	if (login.length >= 15 || login.length <= 3)
		return res.status(400).json({ 'error': 'Invalid login. (must be length 3 - 15)' });

	if (!EMAIL_REGEX.test(email))
		return res.status(400).json({ 'error': 'Invalid email.' });

	if (!PASSWORD_REGEX.test(password))
		return res.status(400).json({ 'error': 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });

	const verifuserpseudo = util.promisify(mod.verifuserpseudo)
	let resultuserpseudo = await verifuserpseudo(req)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});
	const verifuser = util.promisify(mod.verifuser)
	const hash = util.promisify(bcrypt.hash)
	let resultuser = await verifuser(req)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});
	if ((resultuser === 1) || (resultuserpseudo === 1))
		return res.status(400).json({ "error" : "USER EXIST"})
	else {
		req.body.password = await hash(password, 5)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)});
		return mod.adduser(req, res)
	}
}

export const confirmmail = async (req, res) => {
	const key = req.params.CONFIRMKEY
	const checkkey = util.promisify(mod.checkkey)
	let goodkey = await checkkey(key)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});
	if (goodkey === -1)
		return res.status(201).json({ "message" : "BAD KEY"})
	else {
		mod.activeuser(goodkey, res)
	}
}

export const getallusers = (req, res) => {
	mod.getallusers((err, success) => {
		return res.status(200).json({success})
	})
}

export const getuser = (req, res) => {
	const id = parseInt(req.params.id)
	mod.getuser(id, (err, success) => {
		return res.status(200).json({success})
	})
}

export const getme = (req, res) =>{
	return res.status(200).send(req.user)
}

export const login = async (req, res) => {
		if(req.body.email && req.body.password){
		  var email = req.body.email;
		}
		else
			return res.status(401).json({message:"Empty form"});

		// usually this would be a database call:
		const getuserbymail = util.promisify(mod.getuserbymail)
		let user = await getuserbymail(email)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)})

		const hashcmp = util.promisify(bcrypt.compare)
		let passwdcmp = await hashcmp(req.body.password, user.password)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)});
		console.log(passwdcmp)
		if (user.activate === false)
		{
			return res.status(403).json({ message: `Your account is not activated yet. ${user.mail}` });
		}
		if(passwdcmp === true) {
		  // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		  var payload = {id: user.id};
		  var token = jwt.sign(payload, op.opts.secretOrKey );
		  res.json({message: "ok", token: token});
		} else {
		  res.status(401).json({message:"passwords did not match."});
		}
	}

	//	Utile que si on utlise les cookies
export const logout = (req, res) => {
	req.logout();
	res.redirect('/');
}

export const deluser = (req, res) => {
	mod.deluser(req.user.id, (err, success) => {
		return res.status(200).json({success})
	})
}

export const edituser = (req, res) => {
	mod.edituser(req, (err, success) => {
		return res.status(200).json({success})
	})
}

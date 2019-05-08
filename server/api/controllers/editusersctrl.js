import bcrypt from 'bcrypt';
import util from 'util';
// Passport pour le username/logout -> req.user
import * as mod from '../models/editusermod';
import * as usersmod from '../models/usersmod';

// Constants
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;
const VERIF_BIO = /^[a-zA-Z0-9_.-\s]*$/;
const VERIF_BD = /^((?:0[1-9])|(?:1[0-2]))\/((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\/(\d{4})$/; // ex : 04/25/1987 month/day/year

// FONCTIONS

export const edituserMail = async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!MAIL_REGEX.test(mail)) {
    res.status(400).json({ error: 'Invalid mail.' });
    return;
  }

  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail !== undefined) {
    res.status(400).json({ error: 'User email already have a account' });
    return;
  }

  mod.edituserMail(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Mail ${success}` });
  });
};

export const edituserUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_LN_REGEX.test(username)) {
    res.status(400).json({ error: 'Invalid Username, only lettes and numbers' });
    return;
  }

  const getuserbyUsername = util.promisify(mod.getuserbyUsername);
  const resultUsername = await getuserbyUsername(username).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUsername !== undefined) {
    res.status(400).json({ error: 'Username Exist' });
    return;
  }
  mod.edituserUsername(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Username ${success}` });
  });
};


export const edituserPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!PASSWORD_REGEX.test(password)) {
    res.status(400).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
    return;
  }
  const hash = util.promisify(bcrypt.hash);
  req.body.password = await hash(password, 5).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  mod.edituserPassword(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit password ${success}` });
  });
};

export const edituserFirstName = async (req, res) => {
  const { firstName } = req.body;

  if (!firstName) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(firstName)) {
    res.status(400).json({ error: 'Invalid Firstname, only lettes' });
    return;
  }
  mod.edituserFirstName(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit firstname ${success}` });
  });
};

export const edituserLastName = async (req, res) => {
  const { lastName } = req.body;

  if (!lastName) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(lastName)) {
    res.status(400).json({ error: 'Invalid Lastnme, only lettes' });
    return;
  }
  mod.edituserLastName(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit lastname ${success}` });
  });
};

export const edituserBio = async (req, res) => {
  const { bio } = req.body;

  if (!bio) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_BIO.test(bio)) {
    res.status(400).json({ error: 'Invalid Bio, only lettes and numbers' });
    return;
  }
  mod.edituserBio(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Bio ${success}` });
  });
};

export const edituserGenre = async (req, res) => {
  const { genre } = req.body;

  if (!genre) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!(genre === 'M' || genre === 'W' || genre === 'O')) {
    res.status(400).json({ error: 'Error genre.' });
    return;
  }

  mod.edituserGenre(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit genre ${success}` });
  });
};

export const edituserOrientation = async (req, res) => {
  const { orientation } = req.body;

  if (!orientation) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!(orientation === 'M' || orientation === 'W' || orientation === 'BI')) {
    res.status(400).json({ error: 'Error orientation.' });
    return;
  }

  mod.edituserOrientation(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit orientation ${success}` });
  });
};


export const edituserDateOfBirth = async (req, res) => {
  const { dateOfBirth } = req.body;

  if (!dateOfBirth) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_BD.test(dateOfBirth)) {
    res.status(400).json({ error: 'Invalid date of birth. ex : 04/25/1987 month/day/year' });
    return;
  }

  mod.edituserDateOfBirth(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit dateOfBirth ${success}` });
  });
};

export const removetag = (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_LN_REGEX.test(tag)) {
    res.status(400).json({ error: 'Invalid tag, only lettes and numbers' });
    return;
  }
  mod.removetag(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Tag removed ${success}` });
  });
};

export const addtag = async (req, res) => {
  const { tag } = req.body;
  const { iduser } = req.user;

  if (!tag) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_LN_REGEX.test(tag)) {
    res.status(400).json({ error: 'Invalid tag, only lettes and numbers' });
    return;
  }
  const gettaglist = util.promisify(usersmod.getusertag);
  const taglist = await gettaglist(iduser).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  // si tag est dega dans taglist on return
  for (let i = 0; i < taglist.length; i += 1) {
    if (tag === taglist[i].tag) {
      res.status(400).json({ error: 'Tag exist' });
      return;
    }
  }

  // on verifi son nombre de tag max 5
  if (taglist.length > 4) {
    res.status(400).json({ error: 'You have already 5 tag' });
    return;
  }

  mod.addtag(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Tag added ${success}` });
  });
};
import { db } from '../../database';

//
// ─── GET ALL MESSAGE OF MATCH ───────────────────────────────────────────────────
//
export const getAllMessageOfMatch = (idMatch, callback) => {
  db.query('SELECT "idMessage", "sendUserId" ,"date", "message" FROM "message" WHERE "matcheId" = $1',
    [idMatch],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── GET ALL NOTIFS ─────────────────────────────────────────────────────────────
//
export const getAllNotif = (id, callback) => {
  db.query('SELECT * FROM "notification" WHERE "userId" = $1 ORDER BY "notification"."idNotification" DESC',
    [id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── ADD MESSAGE TO DATABASE ────────────────────────────────────────────────────
//
export const addMessageToDatabase = (matcheId, sendUserId, message, callback) => {
  db.query('INSERT INTO "message" ("matcheId", "sendUserId", "message") VALUES ($1, $2, $3)',
    [matcheId, sendUserId, message], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, 'ok');
    });
};

//
// ─── SET LES NOTIFS A VUE ───────────────────────────────────────────────────────
//
export const getNotifVue = (idUser, type, callback) => {
  db.query('UPDATE "notification" SET "vue" = true WHERE "userId" = $1 AND "vue" = false AND "type" = $2',
    [idUser, type],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── DEL NOTIFS ─────────────────────────────────────────────────────────────────
//
export const delNotif = (idUser, callback) => {
  db.query('DELETE FROM "notification" WHERE "notification"."userId" = $1 AND "notification"."vue" = true',
    [idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── TEST USER ID ───────────────────────────────────────────────────────────────
//
export const testUserId = (idUser, callback) => {
  db.query('SELECT * FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    if (res[0]) {
      if (res[0].activate === true && res[0].userIsComplete === true) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
    callback(null, false);
  });
};

//
// ─── GET THE SECOND MATCH ID ────────────────────────────────────────────────────
//
export const getSecondMatcheId = (matcheId, sendUserId, callback) => {
  db.query('SELECT * FROM "matche" WHERE "idMatche" = $1', [matcheId], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    if (res[0].userId1 !== sendUserId) {
      callback(null, res[0].userId1);
    } else {
      callback(null, res[0].userId2);
    }
  });
};

//
// ─── GET NOTIF STATUS MAIL ──────────────────────────────────────────────────────
//
export const notifStatusMail = (idUser, type, callback) => {
  db.query('SELECT * FROM "notification" WHERE "userId" = $1 AND "vue" = false AND "type" = $2',
    [idUser, type],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      if (res[0]) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    });
};

//
// ─── CREE UNE NOUVELLE NOTIFICATION ─────────────────────────────────────────────
//
export const addNotif = (userId, userIdSender, type, message, callback) => {
  db.query('INSERT INTO "notification" ("userId", "type", "message", "userIdSender") VALUES ($1, $2, $3, $4)',
    [userId, type, message, userIdSender], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, true);
    });
};

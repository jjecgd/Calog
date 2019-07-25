const express = require('express');
const session = require('express-session');
const Account = require('../models/account');

const router = express.Router();

router.use(
  session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
  })
);

router.get('/getCaloggers', (req, res) => {
  Account.find()
    .sort({ _id: -1 })
    .exec((err, caloggers) => {
      for (let user of caloggers) {
        user.password = undefined;
      }
      if (err) throw err;
      return res.json(caloggers);
    });
});

router.post('/login', (req, res) => {
  // 로그인
  Account.findOne({ id: req.body.id }, (err, account) => {
    if (err) throw err;

    if (!account) {
      return res.json({
        status: 'FAILURE',
        msg: '아이디를 다시 확인해주세요'
      });
    }

    if (!account.validateHash(req.body.password)) {
      return res.json({
        status: 'FAILURE',
        msg: '비밀번호를 다시 확인해주세요'
      });
    }

    const session = req.session;
    session.loginInfo = {
      _id: account._id,
      id: account.id,
      nickname: account.nickname
    };

    return res.json({
      ...session.loginInfo,
      status: 'SUCCESS'
    });
  });
});

router.post('/autoLogin', (req, res) => {
  // 자동
  Account.findOne({ id: req.body.id }, (err, account) => {
    if (err) throw err;

    const session = req.session;
    session.loginInfo = {
      _id: account._id,
      id: account.id,
      nickname: account.nickname
    };

    return res.json({
      ...session.loginInfo,
      status: 'SUCCESS'
    });
  });
});

router.post('/logout', (req, res) => {
  // 로그아웃
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ success: true });
});

router.post('/check', (req, res) => {
  // 폼 유효성 검사
  const idReg = /^[a-z]+[a-z0-9]{4,19}$/g; // 영자로 시작하며 영자/숫자로 끝나는 형태의 5~20자리
  const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordReg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리
  const nicknameReg = /^[가-힣a-zA-Z0-9]{2,8}$/; // 한글, 영자 형태의 2~8자리

  switch (req.body.target) {
    case 'id': // ID
      if (req.body.id === '') {
        // 아이디 입력이 안되었을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '필수 입력 항목입니다.'
        });
      } else if (!idReg.test(req.body.id)) {
        // 정규표현식을 통과 못했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '아이디는 영문자로 시작하는 5~20자 영문자/숫자이어야 합니다.'
        });
      }
      Account.findOne({ id: req.body.id }, (err, exists) => {
        if (err) throw err;

        if (exists) {
          // 아이디가 중복됨
          return res.json({
            target: req.body.target,
            isValid: false,
            msg: '중복된 아이디입니다.'
          });
        } else {
          // 아이디 사용 가능
          return res.json({
            target: req.body.target,
            isValid: true,
            msg: '사용하실 수 있는 아이디입니다.'
          });
        }
      });
      break;
    case 'email':
      if (req.body.email === '') {
        // 아이디 입력이 안되었을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '필수 입력 항목입니다.'
        });
      } else if (!emailReg.test(req.body.email)) {
        // 정규표현식을 통과 못했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '잘못된 이메일 형식입니다.'
        });
      }
      Account.findOne({ email: req.body.email }, (err, exists) => {
        if (err) throw err;

        if (exists) {
          // 아이디가 중복됨
          return res.json({
            target: req.body.target,
            isValid: false,
            msg: '중복된 이메일입니다.'
          });
        } else {
          // 아이디 사용 가능
          return res.json({
            target: req.body.target,
            isValid: true,
            msg: '사용하실 수 있는 email입니다.'
          });
        }
      });
      break;
    case 'password': // 비밀번호
      if (req.body.password === '') {
        // 비밀번호 입력을 안했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '필수 입력 항목입니다.'
        });
      } else if (!passwordReg.test(req.body.password)) {
        // 비밀번호가 정규표현식을 통과하지 못했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg:
            '비밀번호는 영자, 특수문자, 숫자를 모두 포함하여 9~16자리여야 합니다.'
        });
      }
      return res.json({
        // 비밀번호 사용 가능
        target: req.body.target,
        isValid: true,
        msg: '사용하실 수 있는 비밀번호입니다.'
      });
    case 'passwordConfirm': // 비밀번호 확인
      if (req.body.password === '') {
        // 비밀번호를 입력 안했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '비밀번호부터 입력해주세요.'
        });
      } else if (!passwordReg.test(req.body.password)) {
        // 비밀번호가 정규표현식을 통과하지 못했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg:
            '비밀번호는 영자, 특수문자, 숫자를 모두 포함하여 9~16자리여야 합니다.'
        });
      } else if (req.body.password != req.body.passwordConfirm) {
        // 비밀번호와 비밀번호 확인이 일치하지 않을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '비밀번호를 다시 확인해주세요.'
        });
      } else {
        // 비밀번호 확인 완료
        return res.json({
          target: req.body.target,
          isValid: true,
          msg: '확인되었습니다.'
        });
      }
    case 'nickname':
      if (req.body.nickname === '') {
        // 아이디 입력이 안되었을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '필수 입력 항목입니다.'
        });
      } else if (!nicknameReg.test(req.body.nickname)) {
        // 정규표현식을 통과 못했을 때
        return res.json({
          target: req.body.target,
          isValid: false,
          msg: '닉네임은 한글, 영자 형태의 2~8자리여야 합니다.'
        });
      }
      Account.findOne({ nickname: req.body.nickname }, (err, exists) => {
        if (err) throw err;

        if (exists) {
          // 아이디가 중복됨
          return res.json({
            target: req.body.target,
            isValid: false,
            msg: '이미 사용중인 닉네임입니다.'
          });
        } else {
          // 아이디 사용 가능
          return res.json({
            target: req.body.target,
            isValid: true,
            msg: '사용하실 수 있는 닉네임입니다.'
          });
        }
      });
      break;
  }
});

router.post('/join', (req, res) => {
  // 폼 유효성 검사 완료 후 가입처리
  const account = new Account({
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
    created: req.body.created
  });

  account.password = account.generateHash(account.password);
  account.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
});

module.exports = router;

'use strict';
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://shrouded-inlet-96151.herokuapp.com/';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/student-portal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/student-portal-test';
exports.JWT_SECRET = process.env.JWT_SECRET || 'RandomString';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
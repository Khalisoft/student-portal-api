'use strict';
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.TRANSACTIONS_CLIENT_ORIGIN = process.env.TRANSACTIONS_CLIENT_ORIGIN || 'http://localhost:3000';
exports.TRANSACTIONS_CLIENT_ORIGIN_INSECURE = process.env.TRANSACTIONS_CLIENT_ORIGIN_INSECURE || 'http://localhost:3000';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/student-portal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/student-portal-test';
exports.JWT_SECRET = process.env.JWT_SECRET || 'RandomString';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_mV42WjXHzUOsWnairY9H7tfC"

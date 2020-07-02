import path from 'path';

import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import favicon from 'serve-favicon';

import appHooks from './app.hooks';
import authentication from './authentication';
import channels from './channels';
import logger from './logger';

import middleware from './middleware';
import mongoose from './mongoose';
import services from './services';

require('dotenv').config(); // eslint-disable-line import/no-commonjs

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;

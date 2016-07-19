"use strict"

const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')
const Schema = require('mongoose').Schema

const ModelName = 'Reservation'

const str = require( '../config/strings')

const schema = new Schema({
  reservationDate: {
    type: Date,
    required: true
  },
  startHour: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  startMin: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  endHour: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  endMin: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  slotSize: {
    type: Number,
    required: true,
    min: 0
  },
  reservedBy: {
    type: Schema.ObjectId,
    ref: 'User'

  },
  resourceId: {
    type: Schema.ObjectId,
    ref: 'Resource'
  }
})

schema.statics.list = () =>
  new Promise((resolve, reject) => {
    const _query = {};

    console.log( 'model.list');
    Model.find(_query)
      .exec((err, _objects) => {
        err ? reject(err) : resolve(_objects);
      });
  })


schema.statics.show = id =>
  new Promise((resolve, reject) => {
    if (!id) {
      return reject(new TypeError(ModelName + str.idParamNotValid));
    }

    Model.findById(id)
      .exec((err, service) => {
        err ? reject(err) : resolve(service);
      })
  })


schema.statics.create = anObject =>
  new Promise((resolve, reject) => {
    if (!_.isObject(anObject)) {
      return reject(new TypeError(ModelName + str.objectParamNotValid))
    }

    let _object = new Model(anObject)

    _object.save((err, saved) => {
      err ? reject(err) : resolve(saved)
    })
  })


schema.statics.update = (id, object) =>
  new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError(ModelName + str.idParamNotValid));
    }

    if (!_.isObject(object)) {
      return reject(new TypeError(ModelName + str.objectParamNotValid ));
    }

    Model.findByIdAndUpdate(id, object)
      .exec((err, updated) => {
        err ? reject(err) : resolve(updated);
      })
  })


schema.statics.remove = id =>
  new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError(ModelName + str.idParamNotValid))
    }

    Model.findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err) : resolve(deleted)
      })
  })


let Model = mongoose.model( ModelName, schema)

exports = module.exports = Model
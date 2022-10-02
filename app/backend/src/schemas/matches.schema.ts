import * as Joi from 'joi';

export const createMatchSchema = Joi.object().keys({
  homeTeam: Joi.number().min(1).required(),
  awayTeam: Joi.number().min(1).required(),
  homeTeamGoals: Joi.number().min(1).required(),
  awayTeamGoals: Joi.number().min(1).required(),
  inProgress: Joi.boolean().equal(true),
});

export const updateMatchSchema = Joi.object().keys({
  homeTeamGoals: Joi.number().min(1).required(),
  awayTeamGoals: Joi.number().min(1).required(),
});

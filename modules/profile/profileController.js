import express, { Router } from 'express'
import { getProfile, UpdateProfile } from './profileService.js';
import upload from '../../utils/upload.js';

export const profileRoute=Router();

profileRoute.put('/updateProfile',upload.single('image'),UpdateProfile)
profileRoute.get('/getProfile',getProfile)
import { Request, Response } from 'express';
import { UserService } from '../services/User';
import { User } from '../types/User';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: User = req.body;
            const newUser = await this.userService.createUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            console.log('cntrl', user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'ggg' });
        }
    }
}
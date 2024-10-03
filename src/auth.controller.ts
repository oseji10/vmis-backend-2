import { Controller, Post, Req, UseGuards, Get, Request, Session, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')  // This enables the route to work under "/auth"
export class AuthController {
    constructor(private userService: UserService) {}

    // Login route
    @Post('login')
    async login(@Body() body: { email: string; password: string }, @Session() session) {
        const { email, password } = body;
        const user = await this.userService.findOne(email); // Find user by email
    
        if (!user) {
            return { message: 'User not found' };
        }
    
        // Compare the plain text password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid credentials' }; // Incorrect password
        }
    
        // Store the user in the session (excluding the password)
        const { password: _, ...userWithoutPassword } = user;
        session.user = userWithoutPassword;
    
        return { message: 'Login successful. Redirecting to dashboard...', user: userWithoutPassword };
    }

    // Protected route that requires the user to be authenticated
    @Get('profile')
    getProfile(@Request() req) {
        // Return the user's profile (which was set in the session)
        if (!req.session.user) {
            return { message: 'You are not logged in' };
        }
        return { message: 'User profile', user: req.session.user };
    }

    // Logout route to clear the session
    @Post('logout')
    async logout(@Request() req) {
        req.session.destroy();  // Destroy the session
        return { message: 'Logout successful' };
    }

    // Register route
    @Post('register')
    async register(@Body() body: { email: string; phoneNumber: string, status: string, password: string }) {
        const { email, phoneNumber, status, password } = body; // Extract username and password from request body
        const newUser = await this.userService.create(email, phoneNumber, status, password); // Pass variables to the service
        return { message: 'User registered successfully', user: newUser };
    }
}

# Overview

This is a personal portfolio website for Mohamed Iqhlas A, an AI & Robotics Engineer. The application is built as a Flask-based web application that showcases professional skills, projects, and provides a contact form for potential clients or employers to get in touch. The site features a modern, responsive design with dark/light theme toggle functionality and smooth scrolling navigation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Single Page Application (SPA)**: Uses a single HTML template with JavaScript-driven navigation and smooth scrolling between sections
- **Responsive Design**: Built with Bootstrap 5 framework for mobile-first responsive layout
- **Theme System**: Implements a dark/light theme toggle using CSS custom properties (CSS variables)
- **Progressive Enhancement**: Core functionality works without JavaScript, with enhanced UX features added via JavaScript

## Backend Architecture
- **Flask Framework**: Lightweight Python web framework chosen for simplicity and rapid development
- **Template Engine**: Uses Flask's built-in Jinja2 templating for HTML rendering
- **Form Handling**: RESTful approach with POST endpoint for contact form submissions
- **Environment Configuration**: Uses environment variables for sensitive configuration like email credentials

## Email Integration
- **Flask-Mail**: Integrated email service for handling contact form submissions
- **SMTP Configuration**: Configured to work with Gmail SMTP but adaptable to other providers
- **Form Validation**: Server-side validation for required fields and email format

## Static Asset Management
- **Flask Static Files**: Standard Flask approach for serving CSS, JavaScript, and other static assets
- **CDN Dependencies**: External dependencies (Bootstrap, Font Awesome, Google Fonts) loaded from CDNs for better performance
- **Custom Assets**: Local CSS and JavaScript files for custom styling and functionality

# External Dependencies

## Frontend Libraries
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Font Awesome 6.4.0**: Icon library for consistent iconography
- **Google Fonts (Inter)**: Typography enhancement with web fonts

## Backend Dependencies
- **Flask**: Core web framework
- **Flask-Mail**: Email handling functionality

## Email Service
- **Gmail SMTP**: Configured to use Gmail's SMTP server for sending contact form emails
- **Environment Variables**: Email credentials stored securely in environment variables

## Hosting Requirements
- **Python Runtime**: Requires Python environment with Flask support
- **Environment Variables**: Needs configuration for email settings and session secrets
- **Static File Serving**: Requires ability to serve static CSS/JS files
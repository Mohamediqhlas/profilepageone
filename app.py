import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from flask_mail import Mail, Message

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Mail configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', 'mohamediqhlas19@gmail.com')

mail = Mail(app)

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validation
        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'All fields are required.'})
        
        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'message': 'Please enter a valid email address.'})
        
        # Create email message
        msg = Message(
            subject=f'Portfolio Contact from {name}',
            recipients=['mohamediqhlas19@gmail.com'],
            body=f"""
New contact form submission:

Name: {name}
Email: {email}

Message:
{message}
            """.strip()
        )
        
        # Send email
        mail.send(msg)
        
        return jsonify({'success': True, 'message': 'Message sent successfully! I\'ll get back to you soon.'})
        
    except Exception as e:
        app.logger.error(f"Contact form error: {str(e)}")
        return jsonify({'success': False, 'message': 'An error occurred while sending your message. Please try again.'})

@app.route('/download-resume')
def download_resume():
    """Handle resume download"""
    from flask import send_from_directory
    try:
        return send_from_directory('static/images', 'resume.pdf', as_attachment=True, download_name='Mohamed_Iqhlas_Resume.pdf')
    except FileNotFoundError:
        flash('Resume file not found. Please contact me directly for my resume.', 'warning')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

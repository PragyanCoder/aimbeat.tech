import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import logging
from extensions import db  # Import db from extensions.py

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///app.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
db.init_app(app)  # Initialize db here

# Login manager setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Import models AFTER db is initialized
from models import User  

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        try:
            user = User.query.filter_by(email=email).first()

            if user and check_password_hash(user.password_hash, password):
                login_user(user)
                logger.info(f"User {email} logged in successfully")
                return redirect(url_for('index'))

            flash('Invalid email or password')
            logger.warning(f"Failed login attempt for email: {email}")
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            flash('An error occurred during login')

    return render_template('auth/login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        try:
            username = request.form.get('username')
            email = request.form.get('email')
            password = request.form.get('password')

            if User.query.filter_by(email=email).first():
                flash('Email already registered')
                return redirect(url_for('signup'))

            user = User(
                username=username,
                email=email,
                password_hash=generate_password_hash(password)
            )
            db.session.add(user)
            db.session.commit()

            login_user(user)
            logger.info(f"New user registered: {email}")
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            logger.error(f"Signup error: {str(e)}")
            flash('An error occurred during registration')

    return render_template('auth/signup.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# Policy pages
@app.route('/privacy-policy')
def privacy_policy():
    return render_template('policies/privacy.html')

@app.route('/terms-conditions')
def terms_conditions():
    return render_template('policies/terms.html')

@app.route('/refund-policy')
def refund_policy():
    return render_template('policies/refund.html')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

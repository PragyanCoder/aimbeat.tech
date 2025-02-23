import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define the Base class for SQLAlchemy
class Base(DeclarativeBase):
    pass

# Initialize Flask
app = Flask(__name__)
app.secret_key = os.getenv("SESSION_SECRET", "dev-secret-key")

# Database Configuration (Use PostgreSQL for Vercel)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///instance/app.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize database
db = SQLAlchemy(model_class=Base)
db.init_app(app)

# Import models inside app context to avoid circular import
with app.app_context():
    from models import User  # Import here after db is initialized
    db.create_all()

# Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            logger.info(f"User {email} logged in successfully")
            return redirect(url_for("index"))

        flash("Invalid email or password")
        logger.warning(f"Failed login attempt for email: {email}")

    return render_template("auth/login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")

        if User.query.filter_by(email=email).first():
            flash("Email already registered")
            return redirect(url_for("signup"))

        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password),
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)

        logger.info(f"New user registered: {email}")
        return redirect(url_for("index"))

    return render_template("auth/signup.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

# Policy pages
@app.route("/privacy-policy")
def privacy_policy():
    return render_template("policies/privacy.html")

@app.route("/terms-conditions")
def terms_conditions():
    return render_template("policies/terms.html")

@app.route("/refund-policy")
def refund_policy():
    return render_template("policies/refund.html")

# Required for Vercel (Expose "application")
application = app

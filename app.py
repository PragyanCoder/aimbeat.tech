import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask
app = Flask(__name__)
app.secret_key = os.getenv("SESSION_SECRET", "dev-secret-key")

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://PRAGYAN:PRAGYAN@cluster0.w3eiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# Flask-Login Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# User Class for Authentication
class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data["_id"])
        self.username = user_data["username"]
        self.email = user_data["email"]
        self.password_hash = user_data["password_hash"]

@login_manager.user_loader
def load_user(user_id):
    user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    return User(user_data) if user_data else None

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

        user_data = mongo.db.users.find_one({"email": email})
        if user_data and check_password_hash(user_data["password_hash"], password):
            user = User(user_data)
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

        existing_user = mongo.db.users.find_one({"email": email})
        if existing_user:
            flash("Email already registered")
            return redirect(url_for("signup"))

        user_data = {
            "username": username,
            "email": email,
            "password_hash": generate_password_hash(password),
        }
        result = mongo.db.users.insert_one(user_data)

        user = User(user_data)
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
